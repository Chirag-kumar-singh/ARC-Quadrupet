import base64
import json
import re
import requests
from pathlib import Path
from datetime import datetime

# ==============================
# CONFIG
# ==============================

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "gemma3:27b"

ALL_IMAGES_JSON = "/home/arc02/ARC-Quadrupet/frontend/public/all_images.json"
DATA_FILE = Path("/home/arc02/ARC-Quadrupet/frontend/public/pressure_data.json")
TMP_IMAGE_PATH = Path("/tmp/latest_gauge.png")

# ==============================
# UTILS
# ==============================

def encode_image(image_path: Path) -> str:
    return base64.b64encode(image_path.read_bytes()).decode("utf-8")

def extract_json(text: str) -> dict:
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError(f"No JSON found in model output:\n{text}")
    return json.loads(match.group())

def load_existing_data() -> dict:
    if DATA_FILE.exists():
        return json.loads(DATA_FILE.read_text())
    return {"readings": []}

def save_pressure_reading(pressure: int, image_id: str):
    data = load_existing_data()

    # Prevent duplicate processing
    if data["readings"]:
        last = data["readings"][-1]
        if last.get("image_id") == image_id:
            print("⚠️ Image already processed, skipping")
            return

    entry = {
        "pressure": pressure,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "image_id": image_id,
        "source": "gemma3-vision"
    }

    data["readings"].append(entry)

    # Keep last 50 readings
    data["readings"] = data["readings"][-50:]

    DATA_FILE.write_text(json.dumps(data, indent=2))
    print(f"✔ Saved pressure {pressure} PSI")

def get_latest_image():
    with open(ALL_IMAGES_JSON, "r") as f:
        images = json.load(f)

    if not images:
        raise ValueError("No images found in all_images.json")

    # JSON already sorted oldest → newest
    return images[-1]

def download_image(url: str, dest: Path):
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    dest.write_bytes(resp.content)

# ==============================
# GEMMA VISION GAUGE READER
# ==============================

def read_gauge(image_path: Path) -> dict:
    image_b64 = encode_image(image_path)

    prompt = """
You are a vision-based data reader. Read all the data correctly from the image.
Output format:
{
  "readings": [
    { "<metric_name>": <value> }
  ]
}
"""

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt,
                "images": [image_b64]
            }
        ],
            "stream": False
        }

    response = requests.post(OLLAMA_URL, json=payload, timeout=120)
    response.raise_for_status()

    content = response.json()["message"]["content"]
    print("\n🧠 Model output:\n", content)

    return extract_json(content)

# ==============================
# MAIN
# ==============================

if __name__ == "__main__":
    print("🔍 Fetching latest image metadata...")
    latest = get_latest_image()

    print("📸 Latest image:")
    print("  ID :", latest["public_id"])
    print("  URL:", latest["url"])

    print("⬇️ Downloading image...")
    download_image(latest["url"], TMP_IMAGE_PATH)

    print("🧠 Reading gauge...")
    result = read_gauge(TMP_IMAGE_PATH)

    pressure = result["readings"][0]["pressure"]

    save_pressure_reading(pressure, latest["public_id"])
