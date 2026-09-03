"""
Ingest book content from the docs/ directory into Qdrant vector store.

Usage:
    cd chatbot-api
    python -m scripts.ingest_book
"""

import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from dotenv import load_dotenv

load_dotenv()

from app.vectorstore import upsert_chunks, ensure_collection
from app.config import settings

DOCS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "docs")

MODULE_MAP = {
    "module1": "Module 1: The Robotic Nervous System (ROS 2)",
    "module2": "Module 2: The Digital Twin (Gazebo & Unity)",
    "module3": "Module 3: The AI-Robot Brain (NVIDIA Isaac)",
    "module4": "Module 4: Vision-Language-Action (VLA)",
}


def extract_frontmatter(content: str) -> dict:
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if not match:
        return {}
    fm = {}
    for line in match.group(1).splitlines():
        if ":" in line:
            key, val = line.split(":", 1)
            fm[key.strip()] = val.strip().strip('"').strip("'")
    return fm


def strip_frontmatter(content: str) -> str:
    return re.sub(r"^---\s*\n.*?\n---\s*\n", "", content, flags=re.DOTALL)


def strip_mdx_components(text: str) -> str:
    text = re.sub(r"import\s+.*?from\s+['\"].*?['\"];?\n?", "", text)
    text = re.sub(r"<[A-Z]\w+[^>]*>.*?</[A-Z]\w+>", "", text, flags=re.DOTALL)
    text = re.sub(r"<[A-Z]\w+[^/]*/>", "", text)
    text = re.sub(r":::\w+.*?:::", "", text, flags=re.DOTALL)
    return text


def chunk_text(text: str, chunk_size: int, overlap: int) -> list[str]:
    paragraphs = re.split(r"\n\n+", text)

    chunks = []
    current = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        if len(current) + len(para) + 2 > chunk_size and current:
            chunks.append(current.strip())
            words = current.split()
            overlap_words = words[-overlap // 4 :] if len(words) > overlap // 4 else []
            current = " ".join(overlap_words) + "\n\n" + para
        else:
            current = current + "\n\n" + para if current else para

    if current.strip():
        chunks.append(current.strip())

    return chunks


def process_file(filepath: str) -> list[dict]:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    fm = extract_frontmatter(content)
    body = strip_frontmatter(content)
    body = strip_mdx_components(body)

    title = fm.get("title", os.path.basename(filepath))

    rel = os.path.relpath(filepath, DOCS_DIR).replace("\\", "/")
    module = ""
    for key, label in MODULE_MAP.items():
        if rel.startswith(key):
            module = label
            break

    doc_path = "/docs/" + rel.replace(".mdx", "").replace(".md", "")

    chunks = chunk_text(body, settings.chunk_size, settings.chunk_overlap)

    return [
        {
            "text": chunk,
            "metadata": {
                "source": doc_path,
                "title": title,
                "module": module,
                "file": rel,
            },
        }
        for chunk in chunks
        if len(chunk.strip()) > 50
    ]


def main():
    all_chunks = []

    for root, _dirs, files in os.walk(DOCS_DIR):
        for fname in files:
            if not fname.endswith((".md", ".mdx")):
                continue
            if "tutorial-basics" in root or "tutorial-extras" in root:
                continue

            filepath = os.path.join(root, fname)
            chunks = process_file(filepath)
            print(f"  {fname}: {len(chunks)} chunks")
            all_chunks.extend(chunks)

    print(f"\nTotal chunks: {len(all_chunks)}")

    if not all_chunks:
        print("No chunks to ingest.")
        return

    import sys
    # Pass a start index as argument to resume: python -m scripts.ingest_book 720
    start_from = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    recreate = start_from == 0  # only recreate collection on fresh start

    ensure_collection(recreate=recreate)
    count = upsert_chunks(all_chunks, start_from=start_from)
    print(f"Ingested {count} chunks into Qdrant collection '{settings.collection_name}'")


if __name__ == "__main__":
    main()
