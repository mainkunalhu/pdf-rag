from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.env import dotenv
from app.db.db import Base, engine
from app.router.chats import chats_router
from app.router.files import files_router
from app.router.health_check import health_router
from app.router.uploads import uploads_router

# models
from .models.files import FilesModel

Base.metadata.create_all(bind=engine)

app = FastAPI(debug=dotenv.debug)

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)
app.include_router(uploads_router)
app.include_router(files_router)
app.include_router(chats_router)
