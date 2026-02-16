import logo from "../assets/infosys.png";

export default function InfosysLogo({ width = 180 }) {
  return (
    <img
      src={logo}
      alt="Infosys Logo"
      style={{ width: width, height: "auto" }}
    />
  );
}
