from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.db.db import get_db
from app.services.uploads import uploads_pdf_into_vector_db

uploads_router = APIRouter(prefix="/api/v1/uploads")


@uploads_router.post("/pdf")
async def uploads_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    return uploads_pdf_into_vector_db(db=db, file=file)
