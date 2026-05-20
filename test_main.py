import pytest
from fastapi.testclient import TestClient
from main import app, items_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def run_before_and_after_tests():
    # Setup: clear the in-memory database before each test
    items_db.clear()
    yield

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]

def test_create_item():
    item_data = {
        "id": 1,
        "name": "Gravity Emitter",
        "description": "Local gravity manipulation",
        "power_level": 9000.1
    }
    response = client.post("/items", json=item_data)
    assert response.status_code == 201
    assert response.json() == item_data

def test_create_duplicate_item():
    item_data = {
        "id": 1,
        "name": "Gravity Emitter",
        "power_level": 9000.1
    }
    client.post("/items", json=item_data)
    response = client.post("/items", json=item_data)
    assert response.status_code == 400
    assert response.json() == {"detail": "Item with this ID already exists"}

def test_get_items():
    item_data = {
        "id": 1,
        "name": "Gravity Emitter",
        "power_level": 9000.1
    }
    client.post("/items", json=item_data)
    response = client.get("/items")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == 1

def test_get_item_by_id():
    item_data = {
        "id": 42,
        "name": "Dark Matter Core",
        "power_level": 100000.0
    }
    client.post("/items", json=item_data)
    response = client.get("/items/42")
    assert response.status_code == 200
    assert response.json()["name"] == "Dark Matter Core"

def test_get_item_not_found():
    response = client.get("/items/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Item not found"}
