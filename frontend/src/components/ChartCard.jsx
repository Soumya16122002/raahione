import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartCard({ title }) {
  const data = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 90 },
    { name: "May", value: 120 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h3 className="text-xl font-bold mb-4">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}