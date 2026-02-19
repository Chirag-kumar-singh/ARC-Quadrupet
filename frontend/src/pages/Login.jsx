import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔒 Hardcoded credentials
    if (username === "admin" && password === "robotics123") {
      sessionStorage.setItem("auth", "true");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0a0f1c",
      color: "#fff"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "12px",
          width: "320px",
          boxShadow: "0 0 20px rgba(0,180,255,0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Robotics Dashboard Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #1f2937",
  background: "#0f172a",
  color: "#fff"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#00e5ff",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
  display: "block",
  transition: "0.2s",
};

