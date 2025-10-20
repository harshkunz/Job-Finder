import fitz 
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()

# API KEY
HF_API_KEY = os.getenv("HF_API_KEY")

# Chat API URL
HF_API_URL = "https://router.huggingface.co/v1/chat/completions"


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extracts text from a PDF file.
    """
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text


def ask_huggingface(prompt: str, model="Qwen/Qwen3-Coder-30B-A3B-Instruct:nebius", max_tokens=500) -> str:
    """
    Sends a prompt to Hugging Face Chat API and returns the response as string.
    """
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_new_tokens": max_tokens
    }

    try:
        response = requests.post(HF_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        
        if "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"]
        else:
            return str(data)
    except Exception as e:
        print(f"Error calling Hugging Face API: {e}")
        return None


def extract_resume_via_gpt(resume_text: str) -> dict:
    """
    Extracts role, qualification, skills, projects from resume text via GPT
    and returns Python dictionary.
    """
    prompt = f"""
    Extract the following information from the resume text below.
    Return ONLY JSON with keys: role, qualification (degree, college)(both are in short form and it is a string), skills (list), projects (name only and it is a list).

    Resume text:
    \"\"\"{resume_text}\"\"\"
    """

    response_text = ask_huggingface(prompt)
    if not response_text:
        return None

    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        try:
            start = response_text.index("{")
            end = response_text.rindex("}") + 1
            return json.loads(response_text[start:end])
        except:
            print("Failed to parse GPT response as JSON:", response_text)
            return None
