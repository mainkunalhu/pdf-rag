from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class EnvConfig(BaseSettings):
    openai_api_key: str
    port: int
    debug: bool
    database_url: str
    reload: bool

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_env_config():
    return EnvConfig()


dotenv = get_env_config()
