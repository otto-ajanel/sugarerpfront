from fastapi import APIRouter
from app.core.models import Item

router = APIRouter()

@router.get("/items")
async def get_items():
    return {"items": [item.to_dict() for item in Item.query.all()]}

app.include_router(router)
