import cloudinary
import cloudinary.api
import json
from datetime import datetime
import os
import os
from dotenv import load_dotenv

# 👇 LOAD .env file
load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def fetch_all_images(folder_name):
    images = []
    next_cursor = None

    while True:
        result = cloudinary.api.resources(
            type="upload",
            prefix=folder_name,   # folder filter
            resource_type="image",
            max_results=100,
            next_cursor=next_cursor
        )

        images.extend(result["resources"])

        next_cursor = result.get("next_cursor")
        if not next_cursor:
            break

    return images


def normalize_and_sort(images):
    normalized = []

    for img in images:
        normalized.append({
            "url": img["secure_url"],
            "public_id": img["public_id"],
            "created_at": img["created_at"]
        })

    # ✅ Ascending order (oldest → newest)
    normalized.sort(
        key=lambda x: datetime.fromisoformat(
            x["created_at"].replace("Z", "")
        )
    )

    return normalized


if __name__ == "__main__":
    images = fetch_all_images("arc_quadrupet/gauges")
    sorted_images = normalize_and_sort(images)

    with open("public/all_images.json", "w") as f:
        json.dump(sorted_images, f, indent=2)

    print(f"Fetched {len(sorted_images)} images")
