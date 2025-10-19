import fitz 
import os
from dotenv import load_dotenv
import requests

load_dotenv()

# API KEY
HF_API_KEY = os.getenv("HF_API_KEY")

# Chat API URL
HF_API_URL = "https://router.huggingface.co/v1/chat/completions"


def extract_text_from_pdf(file_bytes):
    """
    Extracts text from a PDF file.

    Args:
        file_bytes (bytes): The PDF file content as bytes.

    Returns:
        str: The extracted text.
    """
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text


def ask_huggingface(prompt, model="Qwen/Qwen3-Coder-30B-A3B-Instruct:nebius", max_tokens=500):
    """
    Sends a prompt to Hugging Face Chat API and returns the response.
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
        
        # Extract chat response
        if "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"]
        else:
            return str(data)
    except Exception as e:
        print(f"Error calling Hugging Face API: {e}")
        return None
