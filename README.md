# PDF RAG

A streamlined full-stack application for Retrieval-Augmented Generation (RAG) over PDF documents.

---

## Prerequisites

- **Docker**: To run the PostgreSQL database.
- **uv**: For fast Python dependency management.
- **Bun**: For fast JavaScript runtime and frontend builds.

---

## Configuration

Create a `.env` file in your **backend** directory and add the following variables:

```env
OPENAI_API_KEY="your_openai_api_key_here"
PORT=8000
DEBUG=true
DATABASE_URL=postgresql+psycopg2://myuser:mypassword@127.0.0.1:5432/mydatabase
RELOAD=true
```

---

## Setup Instructions

### 1. Database

Start the PostgreSQL server using Docker Compose:

```bash
sudo docker compose up -d
```

### 2. Backend

Navigate to the backend folder to install dependencies and start the server:

```bash
# Install dependencies
uv add -r requirement.txt

# Run the application
uv run main.py
```

### 3. Frontend

Navigate to the frontend folder to install packages and start the development server:

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

---

## Tech Stack

- **Frontend**: Next.js / React (powered by Bun)
- **Backend**: FastAPI / Python (powered by uv)
- **Database**: PostgreSQL (via Docker)
- **AI**: OpenAI GPT models for retrieval and generation

---
