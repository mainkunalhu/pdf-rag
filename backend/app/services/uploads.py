import shutil
from pathlib import Path

from fastapi import File, HTTPException, UploadFile
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sqlalchemy.orm import Session

from app.config.chroma import vector_db
from app.config.openai import gpt_mini_model
from app.models.files import FilesModel

TEMP_DIR = Path("app/temp_files")
TEMP_DIR.mkdir(parents=True, exist_ok=True)


def uploads_pdf_into_vector_db(
    db: Session,
    file: UploadFile = File(...),
):
    filename = file.filename
    if not filename:
        raise HTTPException(status_code=400, detail="No filename provided.")

    if not filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    file_path = TEMP_DIR / filename
    try:
        # Store Temp
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Load PDF
        loader = PyPDFLoader(str(file_path))
        documents = loader.load()

        # Generate Summary
        sample_text = " ".join([doc.page_content for doc in documents[:2]])[:2000]
        summary_prompt = f"Describe this document in one short sentence for a database index: {sample_text}"
        ai_description = gpt_mini_model.invoke(summary_prompt).content

        # Chucking
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500, chunk_overlap=100
        )
        chunks = text_splitter.split_documents(documents)
        for chunk in chunks:
            chunk.metadata["source"] = filename
            chunk.metadata["description"] = ai_description

        # Store into vector db
        vector_db.add_documents(chunks)

        # Creating New File
        new_file = FilesModel(
            file_name=filename, file_description=ai_description, file_type="PDF"
        )
        db.add(new_file)
        db.commit()
        db.refresh(new_file)

        # Reponse
        return {"status": "file uploaded successfully", "item": new_file}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving: {e}")
    finally:
        file.file.close()
