import requests, os
from dotenv import load_dotenv
load_dotenv()
key = os.getenv("GROQ_API_KEY")
r = requests.get("https://api.groq.com/openai/v1/models", headers={"Authorization": f"Bearer {key}"})
models = r.json().get("data", [])
print("Available Groq models:")
for m in sorted(models, key=lambda x: x["id"]):
    print(f"  {m['id']}")
