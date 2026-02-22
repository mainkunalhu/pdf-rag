import uuid

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.config.chroma import vector_db
from app.config.openai import gpt_mini_model
from app.models.chats import ChatsModel
from app.models.files import FilesModel
from app.utils.system_prompt import SYSTEM_PROMPT


def get_chats_handler(db: Session, id: uuid.UUID, page: int, limit: int):
    file_exists = db.execute(select(FilesModel.id).where(FilesModel.id == id)).scalar()

    if not file_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"File with ID {id} not found.",
        )

    offset = (page - 1) * limit

    query = (
        select(ChatsModel)
        .where(ChatsModel.file_id == id)
        .order_by(ChatsModel.created_at.desc())
        .offset(offset)
        .limit(limit)
    )

    chats = db.execute(query).scalars().all()

    total = db.scalar(
        select(func.count()).select_from(ChatsModel).where(ChatsModel.file_id == id)
    )

    return {
        "items": chats,
        "total": total if total else 0,
        "page": page,
        "limit": limit,
    }


# def chat_with_llm_handler():
#     pass


def chat_with_llm_with_pdf_handler(db: Session, id: uuid.UUID, user_prompt: str):

    file_record = db.execute(
        select(FilesModel).where(FilesModel.id == id)
    ).scalar_one_or_none()

    if not file_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="PDF not found in database."
        )

    try:
        search_kwargs = {"filter": {"source": file_record.file_name}}
        docs = vector_db.similarity_search(user_prompt, k=5, **search_kwargs)

        if not docs:
            context = "No relevant Context is found in document"
        else:
            context = "\n\nMore Context\n\n".join([doc.page_content for doc in docs])

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT + context},
            {"role": "user", "content": user_prompt},
        ]

        llm_response = gpt_mini_model.invoke(messages)
        answer = llm_response.content

        new_chat = ChatsModel(file_id=id, user_prompt=user_prompt, system_prompt=answer)
        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)

        return new_chat

    except HTTPException as he:
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}",
        )
