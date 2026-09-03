import requests
import time
import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import uuid
from .config import settings

genai.configure(api_key=settings.gemini_api_key)

qdrant = QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key)

# gemini-embedding-001 outputs 3072-dim vectors
VECTOR_DIM = 3072

# Cache so we don't hit Qdrant on every search
_collection_ready = False

EMBED_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
BATCH_EMBED_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:batchEmbedContents"
BATCH_SIZE = 20  # embed 20 texts per API call


def ensure_collection(recreate: bool = False):
    global _collection_ready
    if _collection_ready and not recreate:
        return  # already confirmed — skip the Qdrant network call
    collections = [c.name for c in qdrant.get_collections().collections]
    if recreate and settings.collection_name in collections:
        qdrant.delete_collection(settings.collection_name)
        collections = []
        _collection_ready = False
    if settings.collection_name not in collections:
        qdrant.create_collection(
            collection_name=settings.collection_name,
            vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE),
        )
    _collection_ready = True


def get_embedding(text: str, task_type: str = "RETRIEVAL_QUERY") -> list[float]:
    """Embed a single text (used for search queries)."""
    for attempt in range(5):
        response = requests.post(
            EMBED_URL,
            params={"key": settings.gemini_api_key},
            json={
                "model": "models/gemini-embedding-001",
                "content": {"parts": [{"text": text}]},
                "taskType": task_type,
            },
            timeout=20,
        )
        if response.status_code == 429:
            wait = 5 * (2 ** attempt)
            print(f"  Rate limited, waiting {wait}s...")
            time.sleep(wait)
            continue
        response.raise_for_status()
        return response.json()["embedding"]["values"]
    raise Exception("Max retries exceeded for embedding API")


def batch_embed(texts: list[str], task_type: str = "RETRIEVAL_DOCUMENT") -> list[list[float]]:
    """Embed multiple texts in one API call with retry on 429/503."""
    for attempt in range(7):
        response = requests.post(
            BATCH_EMBED_URL,
            params={"key": settings.gemini_api_key},
            json={
                "requests": [
                    {
                        "model": "models/gemini-embedding-001",
                        "content": {"parts": [{"text": t}]},
                        "taskType": task_type,
                    }
                    for t in texts
                ]
            },
        )
        if response.status_code in (429, 503, 502, 500):
            wait = min(60, 5 * (2 ** attempt))  # cap at 60s
            print(f"  Server error {response.status_code}, waiting {wait}s...")
            time.sleep(wait)
            continue
        response.raise_for_status()
        return [e["values"] for e in response.json()["embeddings"]]
    raise Exception("Max retries exceeded for batch embedding API")


def upsert_chunks(chunks: list[dict], start_from: int = 0):
    """Insert document chunks into Qdrant using batch embedding.
    Saves to Qdrant after each batch so progress is never lost.
    Use start_from to resume from a specific chunk index.
    """
    ensure_collection()
    total = len(chunks)
    saved = 0

    for i in range(start_from, total, BATCH_SIZE):
        batch = chunks[i : i + BATCH_SIZE]
        texts = [c["text"] for c in batch]
        end = min(i + BATCH_SIZE, total)
        print(f"  Embedding chunks {i+1}-{end}/{total}...")

        try:
            embeddings = batch_embed(texts)
        except Exception as e:
            print(f"  ❌ Failed at chunk {i+1}: {e}")
            print(f"  ✅ Saved {saved} chunks so far. Resume with start_from={i}")
            return saved

        points = [
            PointStruct(
                id=str(uuid.uuid4()),
                vector=embedding,
                payload={
                    "text": chunk["text"],
                    **chunk.get("metadata", {}),
                },
            )
            for chunk, embedding in zip(batch, embeddings)
        ]

        # Save this batch immediately to Qdrant
        qdrant.upsert(collection_name=settings.collection_name, points=points)
        saved += len(points)

        time.sleep(8)  # 8s between batches to avoid rate limits

    return saved


def search(query: str, top_k: int | None = None) -> list[dict]:
    ensure_collection()
    k = top_k or settings.top_k

    query_vector = get_embedding(query, task_type="RETRIEVAL_QUERY")

    results = qdrant.query_points(
        collection_name=settings.collection_name,
        query=query_vector,
        limit=k,
        with_payload=True,
    )

    return [
        {
            "text": point.payload.get("text", ""),
            "source": point.payload.get("source", ""),
            "title": point.payload.get("title", ""),
            "module": point.payload.get("module", ""),
            "score": point.score,
        }
        for point in results.points
    ]
