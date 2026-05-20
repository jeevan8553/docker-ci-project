from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
app = FastAPI(
    title="Anti-Gravity Control API",
    description="Microservice to control anti-gravity fields.",
    version="1.0.0"
)

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    power_level: float

# In-memory database
items_db: List[Item] = []

# Mount the static directory for CSS/JS
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", summary="Root UI Endpoint")
def read_root():
    return FileResponse("static/index.html")

@app.get("/items", response_model=List[Item], summary="Get all items")
def get_items():
    return items_db

@app.post("/items", response_model=Item, status_code=201, summary="Create a new item")
def create_item(item: Item):
    for existing_item in items_db:
        if existing_item.id == item.id:
            raise HTTPException(status_code=400, detail="Item with this ID already exists")
    items_db.append(item)
    return item

@app.get("/items/{item_id}", response_model=Item, summary="Get an item by ID")
def get_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")
