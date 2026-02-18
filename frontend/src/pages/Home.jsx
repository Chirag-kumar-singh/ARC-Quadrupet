import { useNavigate } from "react-router-dom";
import g1Img from "../assets/g1.jpg";
import go2Img from "../assets/go2.jpg";
import cobotImg from "../assets/cobot.jpg";
import inmoovImg from "../assets/inmoov_robot.jpeg";
import Header from "../components/Header";
import "./Home.css";


function RobotCard({ title, image, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-card)",
        borderRadius: "16px",
        width: "260px",
        height: "340px",              // 🔥 IMPORTANT
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: "0 0 25px rgba(0,180,255,0.25)",
        transition: "transform 0.25s, box-shadow 0.25s",
        display: "flex",
        flexDirection: "column"       // 🔥 prevents stretching
      }}
      
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 0 35px rgba(0,180,255,0.6)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 0 25px rgba(0,180,255,0.25)";
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h2 style={{ color: "var(--accent-blue)" }}>{title}</h2>
        <p style={{ color: "var(--text-muted)" }}>
          Open Dashboard
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
<>
  <Header />
      {/* Scrollable content */}
      <div className="page-content">
        <div className="home-content">
          <div className="robot-grid">
            <RobotCard
              title="G1 Robot"
              image={g1Img}
              onClick={() => navigate("/g1")}
            />
            <RobotCard
              title="Go2 Robot"
              image={go2Img}
              onClick={() => navigate("/go2")}
            />
            <RobotCard
              title="Cobot Robot"
              image={cobotImg}
              onClick={() => navigate("/cobot")}
            />
            <RobotCard
              title="Gini Robot"
              image={inmoovImg}
              onClick={() => navigate("/gini")}
            />
      </div>
    </div>
  </div>
</>

    </>
  );
}
