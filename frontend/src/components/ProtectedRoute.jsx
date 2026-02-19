import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("auth") === "true";


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
