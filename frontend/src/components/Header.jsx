import { useNavigate } from "react-router-dom";
import infosysLogo from "../assets/infosys.png";
import "./Header.css";

export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      {/* Infosys Logo (clickable) */}
      <div
        className="header-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={infosysLogo} alt="Infosys" />
      </div>
      {/* Center Title */}
      <div className="header-title">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

