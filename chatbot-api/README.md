# Physical AI Book — RAG Chatbot API

FastAPI backend for the RAG chatbot embedded in the Physical AI & Humanoid Robotics textbook.

## Stack

- **FastAPI** — API server
- **Google Gemini** — Embeddings (text-embedding-004) + Chat (gemini-1.5-flash) — **100% Free**
- **Qdrant Cloud** — Vector storage for book content — **Free tier**
- **Neon Postgres** — Chat session/message history — **Free tier**

## Setup

### 1. Get a free Gemini API key

1. Go to **https://aistudio.google.com**
2. Sign in with Google
3. Click **Get API Key** → **Create API key**
4. Copy the key

### 2. Install dependencies

```bash
cd chatbot-api
pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env with your API keys:
#   GEMINI_API_KEY     - Google AI Studio API key (free)
#   QDRANT_URL         - Qdrant Cloud cluster URL
#   QDRANT_API_KEY     - Qdrant Cloud API key
#   NEON_DATABASE_URL  - Neon Postgres connection string
```

### 4. Ingest book content

```bash
python -m scripts.ingest_book
```

### 5. Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/chat` | Send a chat message (returns full response) |
| POST | `/api/chat/stream` | Send a chat message (SSE streaming) |
| POST | `/api/ingest` | Ingest document chunks |
| GET | `/api/sessions/{id}/history` | Get chat history |

### Chat Request

```json
{
  "message": "What is ROS 2?",
  "session_id": "optional-uuid",
  "selected_text": "optional text the user selected on the page"
}
```

## Deployment

### Docker

```bash
docker build -t chatbot-api .
docker run -p 8000:8000 --env-file .env chatbot-api
```

### Frontend Config

Update `static/scripts/chatbot-config.js` in the Docusaurus project with your deployed API URL:

```js
window.__CHATBOT_API_URL = "https://your-deployed-api.com";
```

## Free Tier Limits (Gemini)

| Model | Free Limit |
|-------|-----------|
| gemini-1.5-flash | 15 requests/min, 1M tokens/day |
| text-embedding-004 | 1,500 requests/day |
