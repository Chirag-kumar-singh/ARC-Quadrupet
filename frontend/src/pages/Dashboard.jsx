import { useEffect, useState } from "react";

import { robots } from "../config/robots";


import StatusCards from "../components/StatusCards";
import SensorBarChart from "../components/SensorBarChart";
import PressureGauge from "../components/PressureGauge";
import AlertDialog from "../components/AlertDialog";
import InfosysLogo from "../components/InfosysLogo";
import GaugeImage from "../components/GaugeImage";
import TelemetryPanel from "../components/TelemetryPanel";
import StatusPill from "../components/StatusPill";

import BatteryPanel from "../components/BatteryPanel";
import MotorHeatmap from "../components/MotorHeatmap";
import IMUPanel from "../components/IMUPanel";
import FootPressurePanel from "../components/FootPressurePanel";




export default function Dashboard({ robotId  = "go2" }) {

  const robot = robots[robotId] || robots["go2"];
  const features = robot.features;


  const [readings, setReadings] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertShown, setAlertShown] = useState(false);
  const [connected, setConnected] = useState(true);

  let viewerHeight = 500;

    if (robotId === "gini") {
      viewerHeight = 1000;
    }


  // Load pressure JSON
  useEffect(() => {
    fetch("/pressure_data.json")
      .then((res) => res.json())
      .then((data) => {
        setReadings(data.readings || []);
        setConnected(true);
      })
      .catch(() => {
        setConnected(false);
      });
  }, []);

  const latestReading =
    readings.length > 0 ? readings[readings.length - 1] : null;

  // Alert logic
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
  <div className="dashboard-layout">

    {/* HEADER */}
    <div className="dashboard-header">
      <div className="dashboard-title">
        <InfosysLogo width={140} />
        <h1>Robotics Command Center</h1>
      </div>
      <StatusPill connected={connected} />
    </div>

    <div className="dashboard-body">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <TelemetryPanel title="ROBOT STATUS">
          <div className="metric-medium">ONLINE</div>
          <div className="metric-small">Mode: AUTONOMOUS</div>
        </TelemetryPanel>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* ROW 1 */}
        {robotId !== "gini" && (
        <div className="dashboard-grid">
          <TelemetryPanel title="BATTERY SYSTEM">
            <BatteryPanel />
          </TelemetryPanel>

          <TelemetryPanel title="MOTOR TEMPERATURE">
            <MotorHeatmap />
          </TelemetryPanel>
        </div>
        )}

        

        {/* 🔥 FULL WIDTH 3D VIEW */}
        <TelemetryPanel title="3D ROBOT VIEW">
          <div style={{ height: `${viewerHeight}px` }}>
            <iframe
              //src="http://localhost:3001"
              src={`https://arc-robot-viewer.vercel.app/?robot=${robotId}`}
              title="title={`${robotId.toUpperCase()} 3D Viewer`}"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "10px",
              }}
            />
          </div>
        </TelemetryPanel>

        {/* ROW 2 - Hide for Gini */}
        {robotId !== "gini" && (
          <div className="dashboard-row-split">

            <div className="left-stack">
              <TelemetryPanel title="IMU STATUS">
                <IMUPanel />
              </TelemetryPanel>

              <TelemetryPanel title="FOOT PRESSURE">
                <FootPressurePanel />
              </TelemetryPanel>
            </div>

            <TelemetryPanel title="PRESSURE MONITOR">
              <PressureGauge latest={latestReading} />
            </TelemetryPanel>

          </div>
        )}

        {/* ROW 3 - Hide for Gini */}
        {robotId !== "gini" && (
          <div className="dashboard-grid">
            <TelemetryPanel title="HISTORICAL SENSOR DATA">
              <SensorBarChart readings={readings} />
            </TelemetryPanel>

            <TelemetryPanel title="VISUAL FEEDBACK">
              <GaugeImage />
            </TelemetryPanel>
          </div>
        )}

        {/* RAW TELEMETRY - Hide for Gini */}
        {robotId !== "gini" && (
          <TelemetryPanel title="RAW TELEMETRY DATA">
            <pre className="telemetry-raw">
              {JSON.stringify(readings, null, 2)}
            </pre>
          </TelemetryPanel>
        )}

      </main>
    </div>

    {/* <AlertDialog
      open={alertOpen}
      message={alertMsg}
      onClose={() => setAlertOpen(false)}
    /> */}

  </div>
);

}
