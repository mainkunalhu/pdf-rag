from langchain_openai import ChatOpenAI
from pydantic import SecretStr

from app.config.env import dotenv

gpt_mini_model = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=SecretStr(dotenv.openai_api_key),
    temperature=0.3,
    max_completion_tokens=700,
)
