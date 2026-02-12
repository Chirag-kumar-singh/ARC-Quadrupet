import { useEffect, useState } from "react";

import Header from "../components/Header";
import StatusCards from "../components/StatusCards";
import TaskPieChart from "../components/TaskPieChart";
import SensorBarChart from "../components/SensorBarChart";
import PressureGauge from "../components/PressureGauge";
import AlertDialog from "../components/AlertDialog";
import InfosysLogo from "../components/InfosysLogo";
import GaugeImage from "../components/GaugeImage";


export default function Dashboard() {
  const [readings, setReadings] = useState([]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertShown, setAlertShown] = useState(false);

  // 🔹 Load pressure JSON on page load
  useEffect(() => {
    fetch("/pressure_data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load pressure_data.json");
        return res.json();
      })
      .then((data) => {
        setReadings(data.readings || []);
      })
      .catch((err) => {
        console.error("Error loading pressure data:", err);
      });
  }, []);

  // 🔹 Latest pressure reading
  const latestReading =
    readings.length > 0 ? readings[readings.length - 1] : null;

  // 🚨 ALERT LOGIC
  useEffect(() => {
    if (!latestReading) return;

    if (latestReading.pressure > 41 && !alertShown) {
      setAlertMsg(
        `⚠ WARNING: Pressure exceeded 40 PSI\nCurrent: ${latestReading.pressure} PSI`
      );
      setAlertOpen(true);
      setAlertShown(true);
    }

    if (latestReading.pressure <= 40) {
      setAlertShown(false);
    }
  }, [latestReading, alertShown]);

  return (
    <div style={{ padding: "24px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "12px",marginBottom: "24px" }}>
        <InfosysLogo width={180} />
        <h1 style={{ color: "#00b4ff", margin: 0 }}>
          Robotics Command Center
        </h1>
      </header>

      {/* ✅ SCROLLABLE CONTENT (NEW) */}
      <div
        style={{
          position: "fixed",
          top: "140px", // header height offset
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          padding: "24px",
        }}
      >
        {/* STATUS CARDS */}
        <StatusCards />

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        {/* PIE CHART → latest reading */}
        <GaugeImage />
        {/* <TaskPieChart latest={latestReading} /> */}

        {/* BAR CHART → historical readings */}
        <SensorBarChart readings={readings} />

        {/* GAUGE → latest reading */}
        <PressureGauge latest={latestReading} />
      </div>

     {/* NEW ROW */}
     {/* <div style={{ marginTop: 30 }}>
        <GaugeImage />
      </div> */}

        {/* DEBUG JSON VIEW (optional) */}
        <pre
          style={{
            marginTop: 30,
            background: "#0b1220",
            padding: 12,
            borderRadius: 8,
            fontSize: 12,
            color: "#7dd3fc",
            maxHeight: 220,
            overflow: "auto",
          }}
        >
          {JSON.stringify(readings, null, 2)}
        </pre>
      </div>

      {/* ALERT DIALOG */}
      <AlertDialog
        open={alertOpen}
        message={alertMsg}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
}
