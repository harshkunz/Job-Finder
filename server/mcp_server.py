# mcp_server.py
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from src.routes import jobs, resume

app = FastAPI(
    title="Job Finder MCP Test Server",
    description="Test server for Job Finder APIs (Resume + Jobs)",
    version="1.0.0"
)

# CORS setup for testing
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])

# Simple root endpoint
@app.get("/")
def root():
    return {"message": "MCP Test Server is running ✅"}

# Optional test endpoints
@app.post("/api/test/upload")
async def test_upload(file: UploadFile = File(...)):
    content = await file.read()
    return {"filename": file.filename, "size": len(content)}

@app.post("/api/test/job-search")
def test_job_search(search_query: str = Form(...), location: str = Form("india")):
    return {"search_query": search_query, "location": location}

if __name__ == "__main__":
    uvicorn.run("mcp_server:app", host="0.0.0.0", port=8000, reload=True)
