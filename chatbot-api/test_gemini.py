import requests
import os
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("GEMINI_API_KEY")

print(f"Key starts with: {key[:10]}...")
print()

# Test 1: List available models
print("=== Available Embedding Models ===")
r = requests.get(f"https://generativelanguage.googleapis.com/v1beta/models?key={key}")
print(f"Status: {r.status_code}")

if r.status_code == 200:
    models = r.json().get("models", [])
    for m in models:
        name = m.get("name", "")
        methods = m.get("supportedGenerationMethods", [])
        if "embedContent" in methods or "embed" in name.lower():
            print(f"  EMBED: {name} → {methods}")
    print()
    print("=== All Models (first 10) ===")
    for m in models[:10]:
        print(f"  {m.get('name')} → {m.get('supportedGenerationMethods')}")
else:
    print(f"Error: {r.text[:500]}")
