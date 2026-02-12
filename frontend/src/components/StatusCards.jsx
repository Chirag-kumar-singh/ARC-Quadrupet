import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "12px",
        padding: "18px",
        width: "180px",
        boxShadow: "0 0 15px rgba(0,180,255,0.15)",
      }}
    >
      <p style={{ color: "var(--text-muted)" }}>{title}</p>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

export default function StatusCards() {
  const [battery, setBattery] = useState("--");

  useEffect(() => {
    const batteryRef = ref(database, "go2/battery/soc");

    const unsubscribe = onValue(batteryRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        setBattery(value);
      }
    });

    return () => unsubscribe();
  }, []);

  const batteryColor =
    battery < 20 ? "#ef4444" :
    battery < 50 ? "#eab308" :
    "#22c55e";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Card title="Robot Status" value="ONLINE" color="var(--accent-blue)" />
      <Card title="Battery" value={`${battery}%`} color={batteryColor} />
      <Card title="Mode" value="AUTONOMOUS" color="var(--accent-blue)" />
      {/* Push button to the right */}
      <div style={{ marginLeft: "auto" }}>
        <button
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:8000/run-fetch", {
                method: "POST",
              });

              const data = await response.json();
              console.log("Python Output:", data);

            } catch (error) {
              console.error("Error running script:", error);
            }
          }}

          style={{
            background: "linear-gradient(135deg, #00b4ff, #0077ff)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "14px 22px",
            marginBottom: "123px",
            fontSize: "23px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 0 18px rgba(0,180,255,0.4)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "scale(0.96)")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          SEND GO2
        </button>
      </div>

    </div>

    
  );
}
