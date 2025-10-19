import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.route import router as job_router


app = FastAPI(
    title="Job Finder API",
    description="API to fetch jobs and analyze resumes",
    version="1.0.0"
)


# ----------------- CORS -----------------
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(job_router, prefix="/api", tags=[""])


# ----------------- Root -----------------
@app.get("/")
def root():
    return {"message": "Server is running "}


# ----------------- Run -----------------
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
