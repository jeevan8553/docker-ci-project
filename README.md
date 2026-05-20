# Anti-Gravity Control Microservice

This is a containerized microservice that exposes a REST API built with Python (FastAPI). It includes automated testing using PyTest, is fully containerized with Docker, and is designed for integration with a CI/CD pipeline using Jenkins and GitLab.

## Features

- **FastAPI Backend**: High-performance REST API with automatic documentation.
- **PyTest**: Automated unit tests for API endpoints.
- **Docker**: Containerization for consistent environments.
- **Jenkins**: CI/CD pipeline configuration (`Jenkinsfile`).

## API Endpoints

- `GET /`: Root endpoint returning a welcome message.
- `GET /items`: Retrieve a list of all items.
- `POST /items`: Create a new item.
- `GET /items/{item_id}`: Retrieve a specific item by its ID.

## Local Development

### 1. Install Dependencies

It is recommended to use a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### 2. Run the Application

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`. You can access the interactive Swagger documentation at `http://127.0.0.1:8000/docs`.

### 3. Run Tests

```bash
pytest test_main.py -v
```

## Docker Containerization

### Build the Image

```bash
docker build -t microservice-api:latest .
```

### Run the Container

```bash
docker run -d -p 8000:8000 --name microservice microservice-api:latest
```

## CI/CD Setup with Jenkins and GitLab

1. **GitLab**: Push this repository to a project in GitLab.
2. **Jenkins**: 
   - Ensure the Jenkins server has Docker installed and the Jenkins user has permission to run docker commands.
   - Create a new "Pipeline" job in Jenkins.
   - Under "Pipeline", select "Pipeline script from SCM".
   - Choose Git as the SCM, provide the GitLab repository URL, and configure credentials if needed.
   - Specify `Jenkinsfile` as the Script Path.
3. **Webhook (Optional)**: Configure a webhook in GitLab to point to your Jenkins server URL (`http://<jenkins-url>/gitlab-webhook/post`) to trigger the build automatically on every push.
