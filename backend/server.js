require('dotenv').config({ path: '../.env' });

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- CLOUDINARY CONFIG ---------------- */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------------- RUN PYTHON SCRIPT ---------------- */

app.post("/run-fetch", (req, res) => {
  exec("python3 ../fetch_all_image.py", (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
    res.json({ status: "success", output: stdout });
  });
});

/* ---------------- GET LATEST IMAGE ---------------- */

app.get("/latest-image", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder:arc_quadrupet/gauges")
      .sort_by("created_at", "desc")
      .max_results(1)
      .execute();

    if (result.resources.length === 0) {
      return res.json({ message: "No images found" });
    }

    const latest = result.resources[0];

    res.json({
      image_url: latest.secure_url,
      timestamp: latest.created_at,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch latest image" });
  }
});

app.listen(8000, "0.0.0.0", () => {
  console.log("🚀 Backend running on http://localhost:8000");
});
