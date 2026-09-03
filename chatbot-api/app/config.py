from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    gemini_api_key: str
    qdrant_url: str
    qdrant_api_key: str
    neon_database_url: str
    groq_api_key: str = ""
    embedding_model: str = "models/gemini-embedding-001"
    chat_model: str = "gemini-1.5-flash"
    collection_name: str = "book_chapters"
    chunk_size: int = 800
    chunk_overlap: int = 100
    top_k: int = 5

    class Config:
        env_file = ".env"


settings = Settings()
