import cloudinary
import cloudinary.uploader
import json
from datetime import datetime
from dotenv import load_dotenv

# 👇 LOAD .env file
load_dotenv()

# 🔐 Configure (use env vars in real projects)
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
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
