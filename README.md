### ☐ Job Finder
*Finding relevant jobs is time-consuming and manually filtering resumes is tedious. It solves this by analyzing resumes using a Large Language Model (LLM) to extract skills, experience, and education. It then recommends matching jobs from top portals like LinkedIn and Naukri. Users can quickly view insights and apply through a simple, responsive interface.*

<p align="center">
  <img src="/public/ig.png" alt="System Architecture" height="400">
</p>

### ☐ Tech Stack
- **Frontend**: Next.js 15, React.js, TailwindCSS, TypeScript
- **Backend**: Python 3.11+, FastAPI, Hugging Face (LLMs), Apify
- **Tools/Version**: Git, MCP

### ☐ Project Workflow
- User uploads resume via UI, server extracts text by using **Fitz_Module**.  
- Backend uses a **LLM (Qwen/Qwen3)** to extract key information from the resume.  
- Job data is scraped from LinkedIn & Naukri using **Apify**.  
- Backend returns JSON with resume insights and matched jobs.  
- Displays results in `JobFinder` with responsive UI and Apply links.

### ☐ Project Structure
``` Java
Job-Finder/
├── app/                          
│   ├── components/              
│   │   └── ...tsx
│   ├── styles/
│   │   └── ...css
│   ├── utils/
│   │   └── ...ts
│   ├── layout.tsx
│   └── page.tsx
├── Public/                      
├── server/                     
│   ├── src/
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── ...py
│   │   ├── utils/
│   │   │   └── ...py
│   │   ├── __init__.py
│   │   ├── gpt_handler.py
│   │   └── job_finder.py
│   ├── main.py
│   └── requirements.txt
├── .gitignore
├── package.json
├── next.config.js
└── tailwind.config.js
```

### ☐ Installation
#### Clone the repository
```bash
git clone https://github.com/harshkunz/Job-Finder.git
cd Job-Finder
```

#### Frontend setup (Next.js)
```bash
cd app
npm install       # Install Dependencies
npm run dev       # Run Server
```
Run at http://localhost:3000

#### Backend setup (FastAPI)
```bash
cd ../server
python -m venv venv         # Create virtual environment
source venv/bin/activate     # Linux/macOS
# OR
venv\Scripts\activate        # Windows

pip install -r requirements.txt  # Install Dependencies
uvicorn main:app --reload        # Run Server
```
Run at http://localhost:8000

#### Environment Variables
.env file in server:
```bash
HF_API_KEY = "your_huggingface_api_key"
APIFY_TOKEN ="your_apify_api_token"
```

### ☐ Contributing
Open to contributions!
- Fork the repository  
- Create a new branch (`git checkout -b feature-name`)  
- Commit your changes (`git commit -m 'Add feature'`)  
- Push to the branch (`git push origin feature-name`)  
- Create a Pull Request
