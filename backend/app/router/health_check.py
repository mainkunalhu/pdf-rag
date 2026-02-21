from fastapi import APIRouter

health_router = APIRouter(prefix="/api/v1/health-check")


@health_router.get("/")
def health_endpoint():
    return {"status": "alive"}
