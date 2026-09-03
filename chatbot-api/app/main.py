from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import uuid

from .config import settings
from .database import init_db, create_session, save_message, get_history
from .rag_groq import chat, chat_stream

app = FastAPI(title="Physical AI Book — RAG Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_db()


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None
    selected_text: str | None = None
    stream: bool = False


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    sources: list[dict] = []


class IngestRequest(BaseModel):
    chunks: list[dict]


class IngestResponse(BaseModel):
    count: int


@app.get("/health")
def health():
    return {"status": "ok", "model": settings.chat_model}


@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())
    create_session(session_id)

    history = get_history(session_id)
    save_message(session_id, "user", req.message, req.selected_text)

    try:
        reply = chat(
            question=req.message,
            history=history,
            selected_text=req.selected_text,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    save_message(session_id, "assistant", reply)

    return ChatResponse(reply=reply, session_id=session_id)


@app.post("/api/chat/stream")
def chat_stream_endpoint(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())
    create_session(session_id)

    history = get_history(session_id)
    save_message(session_id, "user", req.message, req.selected_text)

    collected = []

    def generate():
        for token in chat_stream(
            question=req.message,
            history=history,
            selected_text=req.selected_text,
        ):
            collected.append(token)
            yield f"data: {token}\n\n"
        full_reply = "".join(collected)
        save_message(session_id, "assistant", full_reply)
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "X-Session-Id": session_id,
            "Cache-Control": "no-cache",
        },
    )


@app.post("/api/ingest", response_model=IngestResponse)
def ingest_endpoint(req: IngestRequest):
    from .vectorstore import upsert_chunks

    count = upsert_chunks(req.chunks)
    return IngestResponse(count=count)


@app.get("/api/sessions/{session_id}/history")
def get_session_history(session_id: str):
    history = get_history(session_id)
    return {"session_id": session_id, "messages": history}
