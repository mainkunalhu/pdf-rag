import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.db import get_db
from app.schemas.chats import CreateChatSchema
from app.services.chats import chat_with_llm_with_pdf_handler, get_chats_handler

chats_router = APIRouter(prefix="/api/v1/chats")


@chats_router.get("/llm-pdf/{id}")
def get_chats(
    id: uuid.UUID,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_chats_handler(db=db, id=id, limit=limit, page=page)


# @chats_router.get("/llm")
# def chat_with_llm():
#     return chat_with_llm_handler()


@chats_router.post("/llm-pdf/{id}")
def chat_with_llm_with_pdf(
    id: uuid.UUID, body: CreateChatSchema, db: Session = Depends(get_db)
):
    return chat_with_llm_with_pdf_handler(db=db, id=id, user_prompt=body.user_prompt)
