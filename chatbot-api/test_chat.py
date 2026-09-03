"""
Test which Gemini chat model endpoints actually respond.
Run: cd chatbot-api && python test_chat.py
"""
import requests, os, time
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("GEMINI_API_KEY")

# First, list all models that support generateContent
print("=== Fetching available models ===")
r = requests.get(
    f"https://generativelanguage.googleapis.com/v1beta/models?key={key}",
    timeout=15
)
models = r.json().get("models", [])
chat_models = [
    m["name"] for m in models
    if "generateContent" in m.get("supportedGenerationMethods", [])
]
print(f"Found {len(chat_models)} models supporting generateContent:")
for m in chat_models:
    print(f"  {m}")

# Try each model with a short 20s timeout
print("\n=== Testing each model ===")
payload = {"contents": [{"parts": [{"text": "Say exactly: Hello"}]}]}

for model_name in chat_models:
    # model_name is like "models/gemini-pro", extract just the model part
    model_id = model_name.replace("models/", "")

    for api_version in ["v1beta", "v1"]:
        url = f"https://generativelanguage.googleapis.com/{api_version}/models/{model_id}:generateContent"
        print(f"\nTrying {model_id} ({api_version})...", end=" ", flush=True)
        try:
            start = time.time()
            resp = requests.post(url, params={"key": key}, json=payload, timeout=20)
            elapsed = time.time() - start
            print(f"Status {resp.status_code} in {elapsed:.1f}s")
            if resp.status_code == 200:
                try:
                    text = resp.json()["candidates"][0]["content"]["parts"][0]["text"]
                    print(f"  ✅ WORKS! Response: {text[:100]}")
                    print(f"\n🎯 USE THIS: model={model_id}, api_version={api_version}")
                    break
                except Exception as e:
                    print(f"  Response parse error: {e} | Raw: {resp.text[:200]}")
            elif resp.status_code == 429:
                print(f"  Rate limited")
            else:
                print(f"  Error: {resp.text[:200]}")
        except requests.exceptions.Timeout:
            print("TIMEOUT after 20s")
        except Exception as e:
            print(f"ERROR: {e}")

        time.sleep(2)  # small delay between tests
    else:
        continue
    break  # found working model, stop
else:
    print("\n❌ No working model found. The generateContent API may be blocked on your network.")
    print("Consider using Groq (free alternative) — see instructions below.")
    print("\nGroq free API: https://console.groq.com/")
    print("Models: llama-3.1-70b-versatile, mixtral-8x7b-32768")
