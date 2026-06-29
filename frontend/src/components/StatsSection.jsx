export default function StatsSection() {
  const stats = [
    {
      value: "25K+",
      label: "Rides Completed",
    },
    {
      value: "12K+",
      label: "Active Users",
    },
    {
      value: "₹18L+",
      label: "Money Saved",
    },
    {
      value: "45 Tons",
      label: "CO₂ Reduced",
    },
  ];

  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Community Impact
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 text-center shadow"
            >
              <h3 className="text-4xl font-bold text-blue-600">
                {stat.value}
              </h3>

              <p className="mt-3 text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}