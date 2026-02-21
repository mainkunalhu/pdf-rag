from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings

embeddings = OllamaEmbeddings(model="all-minilm")
vector_db = Chroma(persist_directory="./chroma_db", embedding_function=embeddings)
