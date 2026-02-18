import { useParams } from "react-router-dom";
import { robots } from "../config/robots";

import Header from "../components/Header";
import TelemetryPanel from "../components/TelemetryPanel";
import BatteryPanel from "../components/BatteryPanel";
import MotorHeatmap from "../components/MotorHeatmap";
import IMUPanel from "../components/IMUPanel";
import FootPressurePanel from "../components/FootPressurePanel";

export default function RobotDashboard() {
  const { robotId } = useParams();
  const robot = robots[robotId];

  if (!robot) {
    return <div style={{ padding: 40 }}>Robot not found</div>;
  }

  return (
    <>
      <Header title={`${robot.name} Dashboard`} />

      <div className="dashboard-layout">

        {/* Battery + Motor */}
        {(robot.features.battery || robot.features.motor) && (
          <div className="dashboard-grid">
            {robot.features.battery && (
              <TelemetryPanel title="BATTERY SYSTEM">
                <BatteryPanel />
              </TelemetryPanel>
            )}

            {robot.features.motor && (
              <TelemetryPanel title="MOTOR TEMPERATURE">
                <MotorHeatmap />
              </TelemetryPanel>
            )}
          </div>
        )}

        {/* IMU + Foot */}
        {(robot.features.imu || robot.features.footPressure) && (
          <div className="dashboard-grid">
            {robot.features.imu && (
              <TelemetryPanel title="IMU STATUS">
                <IMUPanel />
              </TelemetryPanel>
            )}

            {robot.features.footPressure && (
              <TelemetryPanel title="FOOT PRESSURE">
                <FootPressurePanel />
              </TelemetryPanel>
            )}
          </div>
        )}

        {/* 3D Viewer */}
        {robot.features.viewer && (
          <TelemetryPanel title="3D ROBOT VIEW">
            <div style={{ height: robot.layout.viewerHeight }}>
              <iframe
                src={`https://arc-robot-viewer.vercel.app/?robot=${robotId}`}
                title={`${robot.name} 3D Viewer`}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "10px",
                }}
              />
            </div>
          </TelemetryPanel>
        )}
      </div>
    </>
  );
}
