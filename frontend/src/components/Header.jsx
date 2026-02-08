import infosysLogo from "../assets/infosys.png";
import "./Header.css";


export default function Header({ title }) {
  return (
    <div className="header">
      {/* Infosys Logo (LEFT) */}
      <div className="header-logo">
        <img src={infosysLogo} alt="Infosys" />
      </div>

      {/* Center Title */}
      <div className="header-title">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
