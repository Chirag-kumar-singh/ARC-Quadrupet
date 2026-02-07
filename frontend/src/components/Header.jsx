// import infosysLogo from "../assets/infosys.png";

// export default function Header() {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 20,
//         left: 0,
//         right: 0,
//         height: "100px",
//         display: "flex",
//         alignItems: "center",
//         zIndex: 1000,
//         pointerEvents: "none" // prevents header from blocking clicks
//       }}
//     >
//       {/* Infosys Logo (LEFT) */}
//       <div style={{ marginLeft: "50px", pointerEvents: "auto" }}>
//         <img
//           src={infosysLogo}
//           alt="Infosys"
//           style={{ height: "100px" }}
//         />
//       </div>

//       {/* ARC TITLE (CENTER) */}
//       <div
//         style={{
//           position: "absolute",
//           left: "50%",
//           transform: "translateX(-50%)",
//           textAlign: "center"
//         }}
//       >
//         <h1
//           style={{
//             margin: 0,
//             color: "#00b4ff",
//             fontSize: "30px",
//             letterSpacing: "1.2px",
//             textShadow: "0 0 12px rgba(0,180,255,0.6)"
//           }}
//         >
//            Humanoid ARC Control Center
//         </h1>
//       </div>
//     </div>
//   );
// }

import infosysLogo from "../assets/infosys.png";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      {/* Infosys Logo */}
      <div className="header-logo">
        <img src={infosysLogo} alt="Infosys" />
      </div>

      {/* ARC Title */}
      <div className="header-title">
        <h1>🤖 Humanoid ARC Control Center</h1>
      </div>
    </div>
  );
}

