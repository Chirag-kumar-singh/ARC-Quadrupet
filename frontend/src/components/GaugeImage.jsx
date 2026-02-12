import { useEffect, useState } from "react";

export default function GaugeImage() {
  const [image, setImage] = useState(null);

  const fetchLatest = async () => {
    try {
      const res = await fetch("http://localhost:8000/latest-image");
      const data = await res.json();
      setImage(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLatest();
    const interval = setInterval(fetchLatest, 5000); // auto refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  if (!image || !image.image_url) {
    return (
      <div style={{ background: "var(--bg-card)", padding: 20 }}>
        No image
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        padding: 16,
        borderRadius: 12,
        textAlign: "center",
      }}
    >
      <h3>Latest Gauge Image</h3>

      <img
        src={image.image_url}
        alt="Gauge"
        style={{
          width: "100%",
          maxWidth: 280,
          borderRadius: 8,
          border: "1px solid #1f2a44",
        }}
      />

      <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>
        Captured at: {new Date(image.timestamp).toLocaleString()}
      </p>
    </div>
  );
}
