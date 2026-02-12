import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

export default function SensorBarChart({ readings }) {
  if (!readings || readings.length === 0) {
    return <p>No data</p>;
  }

  const data = readings.map((r, index) => ({
    name: index + 1,
    value: r.pressure,
  }));

  const getBarColor = (value) => {
    if (value < 30) return "#22c55e";   // green
    if (value <= 40) return "#eab308";  // yellow
    if (value <= 50) return "#f97316";  // orange (buffer zone)
    return "#ef4444";                   // red
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        padding: 16,
        borderRadius: 12,
      }}
    >
      <h3>Pressure History</h3>

      <BarChart width={350} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getBarColor(entry.value)}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
