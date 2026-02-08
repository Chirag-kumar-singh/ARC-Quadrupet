import { useState } from "react";
import Header from "../components/Header";
import StatusCards from "../components/StatusCards";
import TaskPieChart from "../components/TaskPieChart";
import SensorBarChart from "../components/SensorBarChart";
import PressureGauge from "../components/PressureGauge";
import AlertDialog from "../components/AlertDialog";

export default function Dashboard() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  return (
    <>
      {/* Fixed Header */}
      <Header title="⚙ Robotics Control Dashboard" />

      {/* Scrollable Content */}
      <div
        style={{
          position: "fixed",
          top: "140px",   // header offset
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          padding: "24px"
        }}
      >
        <StatusCards />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
            marginTop: "30px"
          }}
        >
          <TaskPieChart />
          <SensorBarChart />
          <PressureGauge
            onAlert={(msg) => {
              setAlertMsg(msg);
              setAlertOpen(true);
            }}
          />
        </div>
      </div>

      <AlertDialog
        open={alertOpen}
        message={alertMsg}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
