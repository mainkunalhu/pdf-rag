import uvicorn

from app.config.env import dotenv

if __name__ == "__main__":
    uvicorn.run("app.app:app", host="0.0.0.0", port=dotenv.port, reload=dotenv.reload)
