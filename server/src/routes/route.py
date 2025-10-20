from fastapi import APIRouter, UploadFile, File, Form
from src.gpt_handler import extract_text_from_pdf, ask_huggingface, extract_resume_via_gpt
from src.utils.response import success_response, error_response
from src.job_finder import fetch_linkedin_jobs, fetch_naukri_jobs

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        text = extract_text_from_pdf(file_bytes)
        parsed_data = extract_resume_via_gpt(text)

        print("Response from Hugging Face (parsed JSON):")
        print(parsed_data)

        if not parsed_data:
            return error_response(message="Failed to parse resume via GPT")
        
        return success_response(data=parsed_data, message="Resume parsed successfully")

    except Exception as e:
        return error_response(message=f"Resume parsing failed: {e}")


@router.post("/search/linkedin")
async def search_linkedin_jobs(
    search_query: str = Form(...),
    location: str = Form("india"),
    max_jobs: int = Form(30)
):
    try:
        jobs = fetch_linkedin_jobs(search_query, location, max_jobs)
        return success_response(data=jobs, message=f"Found {len(jobs)} LinkedIn jobs")
    except Exception as e:
        return error_response(message=f"LinkedIn job search failed: {e}")


@router.post("/search/naukri")
async def search_naukri_jobs(
    search_query: str = Form(...),
    location: str = Form("india"),
    max_jobs: int = Form(30)
):
    try:
        jobs = fetch_naukri_jobs(search_query, location, max_jobs)
        return success_response(data=jobs, message=f"Found {len(jobs)} Naukri jobs")
    except Exception as e:
        return error_response(message=f"Naukri job search failed: {e}")
