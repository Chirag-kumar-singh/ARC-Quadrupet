export default function AlertDialog({ open, message, onClose }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,0,0,0.15)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#111",
          padding: 30,
          borderRadius: 12,
          border: "2px solid red",
          textAlign: "center",
          minWidth: 320,
        }}
      >
        <h2 style={{ color: "red", marginBottom: 12 }}>
          ⚠ SYSTEM ALERT
        </h2>

        <p style={{ marginBottom: 24 }}>{message}</p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "1px solid #444",
              background: "#222",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ACKNOWLEDGE
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "none",
              background: "red",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            SEND G1
          </button>
        </div>
      </div>
    </div>
  );
}
