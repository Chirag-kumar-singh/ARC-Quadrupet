export default function RobotIcon({ size = 34 }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00b4ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(0,180,255,0.6))" }}
      >
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <circle cx="8" cy="13" r="1" />
        <circle cx="16" cy="13" r="1" />
        <path d="M12 7V3" />
      </svg>
    );
  }
  