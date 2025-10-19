from apify_client import ApifyClient
import os
from dotenv import load_dotenv

load_dotenv()

client = ApifyClient(os.getenv("APIFY_API_TOKEN"))


def fetch_linkedin_jobs(search_query, location="india", max_jobs=30):
    """
    Fetch jobs from LinkedIn using Apify actor and standardize the output.
    """
    try:
        run_input = {
            "title": search_query,
            "location": location,
            "rows": max_jobs,
            "proxy": {"useApifyProxy": True, "apifyProxyGroups": ["RESIDENTIAL"]},
        }
        run = client.actor("BHzefUZlZRKWxkTck").call(run_input=run_input)
        jobs_raw = list(client.dataset(run["defaultDatasetId"]).iterate_items())
        
        jobs = [
            {
                "title": j.get("title"),
                "company": j.get("company"),
                "location": j.get("location"),
                "url": j.get("url"),
                "source": "LinkedIn"
            }
            for j in jobs_raw
        ]
        return jobs
    except Exception as e:
        print(f"[LinkedIn] Job fetch failed: {e}")
        return []
    

def fetch_naukri_jobs(search_query, location="india", max_jobs=30):
    """
    Fetch jobs from Naukri using Apify actor and standardize the output.
    """
    try:
        run_input = {
            "keyword": search_query,
            "location": location,
            "maxJobs": max_jobs,
            "freshness": "all",
            "sortBy": "relevance",
            "experience": "all",
        }
        run = client.actor("alpcnRV9YI9lYVPWk").call(run_input=run_input)
        jobs_raw = list(client.dataset(run["defaultDatasetId"]).iterate_items())

        jobs = [
            {
                "title": j.get("title"),
                "company": j.get("companyName"),
                "location": j.get("location"),
                "url": j.get("url"),
                "source": "Naukri"
            }
            for j in jobs_raw
        ]
        return jobs
    except Exception as e:
        print(f"[Naukri] Job fetch failed: {e}")
        return []