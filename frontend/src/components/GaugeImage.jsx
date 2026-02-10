import { useEffect, useState } from "react";

export default function GaugeImage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch("/latest_image.json")
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch(console.error);
  }, []);

  if (!image) {
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
        Captured at: {new Date(image.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}
