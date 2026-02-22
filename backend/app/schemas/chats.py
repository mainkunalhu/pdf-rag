from pydantic import BaseModel, Field


class CreateChatSchema(BaseModel):
    user_prompt: str = Field(..., max_length=10000)
