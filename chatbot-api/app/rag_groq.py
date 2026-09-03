"""
Groq-based RAG chat — free alternative if Gemini generateContent is blocked.
Requires: pip install groq
Get free API key at: https://console.groq.com/
Add to .env: GROQ_API_KEY=gsk_...
"""
import requests
from .config import settings
from .vectorstore import search

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "openai/gpt-oss-120b"   # 120B model available on Groq free tier

SYSTEM_PROMPT = """You are an expert AI tutor for the textbook "Physical AI & Humanoid Robotics: AI Systems in the Physical World."

Your role:
- Answer questions about Physical AI, ROS 2, Gazebo, Unity, NVIDIA Isaac, and Vision-Language-Action models.
- Use the provided context from the textbook to give accurate, educational answers.
- Reference specific chapters or modules when relevant.
- If the context doesn't contain enough information, say so honestly and provide your best knowledge with a disclaimer.
- Use code examples when helpful — the book teaches Python, ROS 2 (rclpy), URDF/SDF, and related tools.
- Keep answers concise but thorough. Use markdown formatting.

When the user has selected specific text from the book, focus your answer on explaining that selected text in detail."""


SIMPLE_QUERY_WORDS = {
    "hi", "hello", "hey", "thanks", "thank you", "ok", "okay", "bye",
    "goodbye", "yes", "no", "cool", "great", "nice", "good", "awesome",
    "help", "who are you", "what can you do", "what are you",
}

def _is_simple_query(text: str) -> bool:
    """Skip RAG for greetings and very short non-technical messages."""
    t = text.strip().lower().rstrip("!?.，。")
    if t in SIMPLE_QUERY_WORDS:
        return True
    if len(t) < 20 and not any(w in t for w in ["ros", "robot", "gazebo", "isaac", "urdf", "vla", "ai", "python", "sensor", "motor", "joint", "slam", "nav"]):
        return True
    return False


def build_context(results: list[dict]) -> str:
    if not results:
        return "No relevant context found in the textbook."
    parts = []
    for i, r in enumerate(results, 1):
        source = r.get("source", "unknown")
        title = r.get("title", "")
        header = f"[Source {i}: {title} ({source})]" if title else f"[Source {i}: {source}]"
        parts.append(f"{header}\n{r['text']}")
    return "\n\n---\n\n".join(parts)


def _build_messages(question: str, context: str, history: list[dict] | None) -> list[dict]:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Add conversation history
    if history:
        for msg in history[-10:]:
            messages.append({"role": msg["role"], "content": msg["content"]})

    # Add RAG context + current question
    user_content = f"""Relevant textbook context:

{context}

---

User question: {question}"""
    messages.append({"role": "user", "content": user_content})
    return messages


def _get_groq_key() -> str:
    key = settings.groq_api_key
    if not key:
        raise ValueError("GROQ_API_KEY not set in .env")
    return key


def chat(
    question: str,
    history: list[dict] | None = None,
    selected_text: str | None = None,
) -> str:
    if selected_text:
        query = f"Explain this from the textbook:\n\n\"{selected_text}\"\n\nUser question: {question}"
        context_results = search(selected_text, top_k=3)
        context = build_context(context_results)
    elif _is_simple_query(question):
        query = question
        context = ""  # skip RAG entirely for simple messages
    else:
        query = question
        context_results = search(question)
        context = build_context(context_results)

    messages = _build_messages(query, context, history)

    response = requests.post(
        GROQ_API_URL,
        headers={
            "Authorization": f"Bearer {_get_groq_key()}",
            "Content-Type": "application/json",
        },
        json={
            "model": GROQ_MODEL,
            "messages": messages,
            "temperature": 0.3,
            "max_tokens": 1024,
        },
        timeout=30,
    )
    if not response.ok:
        raise Exception(f"{response.status_code} {response.text[:300]}")
    return response.json()["choices"][0]["message"]["content"]


def chat_stream(
    question: str,
    history: list[dict] | None = None,
    selected_text: str | None = None,
):
    import json

    if selected_text:
        query = f"Explain this from the textbook:\n\n\"{selected_text}\"\n\nUser question: {question}"
        context_results = search(selected_text, top_k=3)
        context = build_context(context_results)
    elif _is_simple_query(question):
        query = question
        context = ""  # skip RAG for simple messages
    else:
        query = question
        context_results = search(question)
        context = build_context(context_results)

    messages = _build_messages(query, context, history)

    response = requests.post(
        GROQ_API_URL,
        headers={
            "Authorization": f"Bearer {_get_groq_key()}",
            "Content-Type": "application/json",
        },
        json={
            "model": GROQ_MODEL,
            "messages": messages,
            "temperature": 0.3,
            "max_tokens": 1024,
            "stream": True,
        },
        stream=True,
        timeout=30,
    )
    response.raise_for_status()

    for line in response.iter_lines():
        if line:
            line = line.decode("utf-8") if isinstance(line, bytes) else line
            if line.startswith("data: "):
                data_str = line[6:]
                if data_str == "[DONE]":
                    break
                try:
                    data = json.loads(data_str)
                    delta = data["choices"][0]["delta"]
                    text = delta.get("content", "")
                    if text:
                        yield text
                except (KeyError, json.JSONDecodeError):
                    continue
