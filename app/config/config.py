from pydantic_settings import BaseSettings
from pydantic import Field
class Settings(BaseSettings):
    database_url: str = Field(..., alias="DATABASE_URL")
    echo: bool = Field(default=False, alias="ECHO")
    secret_key: str = Field(..., alias="SECRET_KEY")
    algorithm: str = Field(default="HS256", alias="ALGORITHM")
    access_token_expire_minutes: int = Field(..., alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(..., alias="REFRESH_TOKEN_EXPIRE_DAYS")
    # Admin
    university_token: str = Field(..., alias="UNIVERSITY_TOKEN")

    model_config = {
        "env_file": ".env",
        "extra": "ignore",
        "case_sensitive": False
    }
settings = Settings()