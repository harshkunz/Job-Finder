from fastapi import APIRouter, UploadFile, File
from src.utils.pdf_reader import extract_text_from_pdf
from src.gpt_handler import ask_gemini
from src.utils.response import success_response, error_response

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        text = extract_text_from_pdf(file)
        parsed_data = ask_gemini(f"Extract skills, experience, education, and contact info from this resume:\n{text}")
        return success_response(data=parsed_data, message="Resume parsed successfully")
    except Exception as e:
        return error_response(message=f"Resume parsing failed: {e}")
