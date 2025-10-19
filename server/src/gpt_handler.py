import os
from google.auth import load_credentials_from_file
from google.auth.transport.requests import Request
from google.auth.credentials import AnonymousCredentials
from googleapiclient.discovery import build

# Load credentials from the service account file
credentials, project = load_credentials_from_file(
    '/path/to/your/service-account-file.json',
    scopes=['https://www.googleapis.com/auth/cloud-platform']
)

# Refresh the credentials if necessary
if credentials.expired and credentials.refresh_token:
    credentials.refresh(Request())

# Build the Gemini API client
gemini = build('gemini', 'v1alpha', credentials=credentials)


def ask_gemini(prompt, max_tokens=500):
    """
    Sends a prompt to the Gemini API and returns the response.
    
    Args:
        prompt (str): The prompt to send to the Gemini API.
        max_tokens (int): The maximum number of tokens to generate.
        
    Returns:
        str: The response from the Gemini API.
    """
    try:
        response = gemini.projects().locations().models().predict(
            name='projects/{}/locations/us-central1/models/text-bison-001'.format(project),
            body={
                'instances': [{'content': prompt}],
                'parameters': {'temperature': 0.5, 'maxOutputTokens': max_tokens}
            }
        ).execute()

        return response['predictions'][0]['content']
    except Exception as e:
        print(f"Error during Gemini API request: {e}")
        return None
