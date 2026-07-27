from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator

class Settings(BaseSettings):
    database_url:str
    API_NINJAS_KEY:str
    API_NINJAS_URL:str
    VITE_URL_BASE_API_DEV:str
    WIKI_USER_AGENT:str
    ALLOWED_ORIGINS:str = ""
    SQL_ECHO:bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @field_validator("database_url")
    @classmethod
    def normalize_database_url(cls, v: str) -> str:
        """Railway's Postgres plugin injects DATABASE_URL as postgres:// or
        postgresql://, but the app's async engine needs the asyncpg driver."""
        if v.startswith("postgres://"):
            v = "postgresql://" + v[len("postgres://"):]
        if v.startswith("postgresql://"):
            v = "postgresql+asyncpg://" + v[len("postgresql://"):]
        return v

    @property
    def allowed_origins(self) -> list[str]:
        origins = [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return origins or [self.VITE_URL_BASE_API_DEV]

CONFIG=Settings()