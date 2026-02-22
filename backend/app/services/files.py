from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.config.chroma import vector_db
from app.models.files import FilesModel


def get_all_files_handler(db: Session):
    return db.query(FilesModel).all()


def get_files_by_id_handler(db: Session, id: str):
    file_record = db.query(FilesModel).filter(FilesModel.id == id).first()

    if not file_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"File with id {id} not found"
        )
    return file_record


def delete_files_by_id_handler(db: Session, id: str):
    file_record = db.query(FilesModel).filter(FilesModel.id == id).first()

    if not file_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"File with id {id} not found"
        )

    vector_db.delete(where={"source": file_record.file_name})
    db.delete(file_record)
    db.commit()
    return {"status": "success", "message": f"File {id} deleted from database"}
