import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

export default function BatteryStatus() {
  const [battery, setBattery] = useState(null);

  useEffect(() => {
    const batteryRef = ref(database, "go2/battery/soc");

    const unsubscribe = onValue(batteryRef, (snapshot) => {
      const value = snapshot.val();
      setBattery(value);
    });

    return () => unsubscribe();
  }, []);

  if (battery === null) {
    return <p>Loading battery...</p>;
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        padding: 18,
        borderRadius: 12,
        width: 180,
      }}
    >
      <p style={{ color: "var(--text-muted)" }}>Battery</p>
      <h2 style={{ color: "var(--accent-blue)" }}>
        {battery}%
      </h2>
    </div>
  );
}
