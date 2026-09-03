import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from collections import defaultdict
from .config import settings
import threading

SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS chat_sessions (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    session_id TEXT REFERENCES chat_sessions(id),
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    selected_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_session
    ON chat_messages(session_id, created_at);
"""

# In-memory cache — instant reads, no cold-start wait
_sessions: dict[str, list[dict]] = defaultdict(list)
_lock = threading.Lock()


@contextmanager
def get_db():
    conn = psycopg2.connect(settings.neon_database_url, cursor_factory=RealDictCursor,
                            connect_timeout=5)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    """Try to init DB schema; if Neon is asleep, skip — it'll wake on next write."""
    try:
        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute(SCHEMA_SQL)
    except Exception as e:
        print(f"[db] init skipped (Neon cold start): {e}")


def _persist_async(fn, *args):
    """Write to Neon in background thread so it never blocks the response."""
    def _run():
        try:
            fn(*args)
        except Exception as e:
            print(f"[db] background write failed: {e}")
    threading.Thread(target=_run, daemon=True).start()


def _db_create_session(session_id: str):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chat_sessions (id) VALUES (%s) ON CONFLICT DO NOTHING",
                (session_id,),
            )


def _db_save_message(session_id: str, role: str, content: str, selected_text=None):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chat_messages (session_id, role, content, selected_text) VALUES (%s,%s,%s,%s)",
                (session_id, role, content, selected_text),
            )


def create_session(session_id: str):
    with _lock:
        if session_id not in _sessions:
            _sessions[session_id] = []
    _persist_async(_db_create_session, session_id)


def save_message(session_id: str, role: str, content: str, selected_text=None):
    with _lock:
        _sessions[session_id].append({"role": role, "content": content})
    _persist_async(_db_save_message, session_id, role, content, selected_text)


def get_history(session_id: str, limit: int = 20) -> list[dict]:
    """Instant — reads from memory cache only."""
    with _lock:
        msgs = _sessions.get(session_id, [])
        return msgs[-limit:]
