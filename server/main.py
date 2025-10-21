import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.route import router as job_router
from dotenv import load_dotenv


load_dotenv()

app = FastAPI(
    title="Job Finder API",
    description="API to fetch jobs and analyze resumes",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    os.getenv("FRONTEND_URL", "*")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(job_router, prefix="/api", tags=["Jobs"])


@app.get("/")
def root():
    return {"message": "Server is running!"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
