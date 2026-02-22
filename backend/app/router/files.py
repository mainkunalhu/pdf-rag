from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from app.db.db import get_db
from app.services.files import (
    delete_files_by_id_handler,
    get_all_files_handler,
    get_files_by_id_handler,
)

files_router = APIRouter(prefix="/api/v1/files")


@files_router.get("/")
def get_all_files(db: Session = Depends(get_db)):
    return get_all_files_handler(db=db)


@files_router.get("/{id}")
def get_files_by_id(id: str, db: Session = Depends(get_db)):
    return get_files_by_id_handler(db=db, id=id)


@files_router.delete("/{id}")
def delete_files_by_id(id: str, db: Session = Depends(get_db)):
    return delete_files_by_id_handler(db=db, id=id)
