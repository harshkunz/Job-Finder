from fastapi import APIRouter
from src.job_finder import fetch_jobs
from src.utils.response import success_response, error_response

router = APIRouter()

@router.post("/search")
async def search_jobs(search_query: str, location: str = "india", max_jobs: int = 30):
    try:
        jobs = fetch_jobs(search_query, location, max_jobs)
        return success_response(data=jobs, message=f"Found {len(jobs)} jobs")
    except Exception as e:
        return error_response(message=f"Job search failed: {e}")
