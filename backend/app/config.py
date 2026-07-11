from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url:str
    API_NINJAS_KEY:str
    API_NINJAS_URL:str
    VITE_URL_BASE_API_DEV:str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )
    
CONFIG=Settings()