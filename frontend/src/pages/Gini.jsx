import DashboardLayout from "./Dashboard";
import TelemetryPanel from "../components/TelemetryPanel";
import GiniMotorStatusPanel from "../components/GiniMotorStatusPanel";


export default function Gini() {
  return (
    <DashboardLayout>

      <TelemetryPanel title="3D ROBOT VIEW">
        <div style={{ height: "1000px" }}>
          <iframe
            src="https://arc-robot-viewer.vercel.app/?robot=gini"
            title="GINI 3D Viewer"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "10px",
            }}
          />
        </div>
      </TelemetryPanel>

      {/* MOTOR STATUS */}
      <TelemetryPanel title="MOTOR STATUS">
        <GiniMotorStatusPanel />
      </TelemetryPanel>

    </DashboardLayout>
  );
}
