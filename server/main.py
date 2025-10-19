# main.py
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

# Import your backend functions
from src.job_finder import fetch_linkedin_jobs, fetch_naukri_jobs
from src.gpt_handler import ask_openai, extract_text_from_pdf
from src.routes.route import router as job_router

app = FastAPI(
    title="Job Finder API",
    description="API to fetch jobs and analyze resumes",
    version="1.0.0"
)

# ----------------- CORS Setup -----------------
origins = [
    "http://localhost:3000",  # frontend URL
    "http://127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Direct Job Routes -----------------
@app.post("/api/jobs/linkedin")
async def linkedin_jobs(search_query: str = Form(...), location: str = Form("india")):
    jobs = fetch_linkedin_jobs(search_query, location)
    return {"jobs": jobs}

@app.post("/api/jobs/naukri")
async def naukri_jobs(search_query: str = Form(...), location: str = Form("india")):
    jobs = fetch_naukri_jobs(search_query, location)
    return {"jobs": jobs}

# ----------------- Resume Routes -----------------
@app.post("/api/resume/analyze")
async def analyze_resume(prompt: str = Form(...), max_tokens: int = Form(500)):
    summary = ask_openai(prompt, max_tokens)
    return {"summary": summary}

# ----------------- Test Upload Endpoint -----------------
@app.post("/api/test/upload")
async def test_upload(file: UploadFile = File(...)):
    content = await file.read()
    return {"filename": file.filename, "size": len(content)}

# ----------------- Include Router Endpoints -----------------
app.include_router(job_router, prefix="/api", tags=["Job Routes"])

# ----------------- Root -----------------
@app.get("/")
def root():
    return {"message": "Job Finder API is running "}

# ----------------- Run -----------------
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
