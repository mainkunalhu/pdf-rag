from datetime import date

from pydantic import BaseModel, Field


class FilesSchema(BaseModel):
    id: int
    file_name: str = Field(..., max_length=500, min_length=3)
    file_description: str = Field(..., max_length=1000, min_length=5)
    file_type: str
    created_at: date
