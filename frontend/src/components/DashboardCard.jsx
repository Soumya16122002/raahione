export default function DashboardCard({
  title,
  value,
  color = "text-blue-600",
}) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <p className="text-gray-500">{title}</p>

      <h3 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h3>
    </div>
  );
}