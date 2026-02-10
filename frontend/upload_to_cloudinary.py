import cloudinary
import cloudinary.uploader
import json
from datetime import datetime

# 🔐 Configure (use env vars in real projects)
cloudinary.config(
    cloud_name="ddw6yefy0",
    api_key="135188217753753",
    api_secret="a0zQ7VkwfnjQcAJ6rlGSewuwV40",
    secure=True
)

def upload_image(image_path):
    result = cloudinary.uploader.upload(
        image_path,
        folder="arc_quadrupet/gauges",
        resource_type="image"
    )

    return {
        "image_url": result["secure_url"],
        "public_id": result["public_id"],
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    image_data = upload_image(r"/home/arc02/ARC-Quadrupet/image.png")

    # Save metadata so frontend can read it
    with open("public/latest_image.json", "w") as f:
        json.dump(image_data, f, indent=2)

    print("Uploaded:", image_data["image_url"])
