import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import G1 from "./pages/G1";
import Go2 from "./pages/Go2";
import Cobot from "./pages/Cobot";
import Gini from "./pages/Gini";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/g1" element={<G1 />} />
      <Route path="/go2" element={<Go2 />} />
      <Route path="/cobot" element={<Cobot />} />
      <Route path="/gini" element={<Gini />} />
    </Routes>
  );
}


// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import RobotDashboard from "./pages/RobotDashboard";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/:robotId" element={<RobotDashboard />} />
//     </Routes>
//   );
// }
