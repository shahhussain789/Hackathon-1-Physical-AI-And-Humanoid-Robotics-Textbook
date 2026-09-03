import requests
from .config import settings
from .vectorstore import search

# Models to try in order — first one that works is used
CHAT_MODELS = [
    "gemini-3.6-flash",
    "gemini-flash-latest-high-res-exp",
    "gemini-flash-lite-latest",
    "gemini-flash-latest",
]

def _model_url(model: str, stream: bool = False) -> str:
    base = "https://generativelanguage.googleapis.com/v1beta/models"
    if stream:
        return f"{base}/{model}:streamGenerateContent?alt=sse"
    return f"{base}/{model}:generateContent"

SYSTEM_PROMPT = """You are an expert AI tutor for the textbook "Physical AI & Humanoid Robotics: AI Systems in the Physical World."

Your role:
- Answer questions about Physical AI, ROS 2, Gazebo, Unity, NVIDIA Isaac, and Vision-Language-Action models.
- Use the provided context from the textbook to give accurate, educational answers.
- Reference specific chapters or modules when relevant.
- If the context doesn't contain enough information, say so honestly and provide your best knowledge with a disclaimer.
- Use code examples when helpful — the book teaches Python, ROS 2 (rclpy), URDF/SDF, and related tools.
- Keep answers concise but thorough. Use markdown formatting.

When the user has selected specific text from the book, focus your answer on explaining that selected text in detail."""


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


def _build_prompt(question: str, context: str, history: list[dict] | None) -> str:
    history_text = ""
    if history:
        for msg in history[-10:]:
            role = "User" if msg["role"] == "user" else "Assistant"
            history_text += f"{role}: {msg['content']}\n"
    return f"""{SYSTEM_PROMPT}

Relevant textbook context:

{context}

{history_text}User: {question}
Assistant:"""


def _make_request(prompt: str, stream: bool = False) -> requests.Response:
    import time
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 4096,
        },
    }
    # Streaming: short timeout, try each model once — fail fast, move on
    # Non-streaming: slightly longer, one retry on 503
    timeout = 25 if stream else 45
    last_error = None

    for model in CHAT_MODELS:
        try:
            resp = requests.post(
                _model_url(model, stream),
                params={"key": settings.gemini_api_key},
                json=payload,
                stream=stream,
                timeout=timeout,
            )
            if resp.status_code == 404:
                last_error = f"{model} → 404"
                continue  # model not available, try next immediately
            if resp.status_code == 429:
                time.sleep(5)
                last_error = f"{model} → 429"
                continue  # rate limited, try next model
            if resp.status_code in (500, 502, 503):
                last_error = f"{model} → {resp.status_code}"
                continue  # server error, try next model immediately (no sleep)
            return resp  # 200 or other — let caller handle
        except requests.exceptions.Timeout:
            last_error = f"{model} → timeout"
            continue  # timed out, try next model

    raise Exception(f"All chat models failed. Last error: {last_error}")


def chat(
    question: str,
    history: list[dict] | None = None,
    selected_text: str | None = None,
) -> str:
    if selected_text:
        query = f"Explain this from the textbook:\n\n\"{selected_text}\"\n\nUser question: {question}"
        context_results = search(selected_text, top_k=3)
    else:
        query = question
        context_results = search(question)

    context = build_context(context_results)
    prompt = _build_prompt(query, context, history)

    response = _make_request(prompt, stream=False)
    response.raise_for_status()
    data = response.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]


def chat_stream(
    question: str,
    history: list[dict] | None = None,
    selected_text: str | None = None,
):
    if selected_text:
        query = f"Explain this from the textbook:\n\n\"{selected_text}\"\n\nUser question: {question}"
        context_results = search(selected_text, top_k=3)
    else:
        query = question
        context_results = search(question)

    context = build_context(context_results)
    prompt = _build_prompt(query, context, history)

    response = _make_request(prompt, stream=True)
    response.raise_for_status()

    for line in response.iter_lines():
        if line:
            line = line.decode("utf-8") if isinstance(line, bytes) else line
            if line.startswith("data: "):
                import json
                try:
                    data = json.loads(line[6:])
                    text = data["candidates"][0]["content"]["parts"][0]["text"]
                    if text:
                        yield text
                except (KeyError, json.JSONDecodeError):
                    continue
