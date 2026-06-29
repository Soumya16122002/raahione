export default function EcoImpact() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Environmental Impact
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-green-50 p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-green-600">45 Tons</h3>
            <p>CO₂ Reduced</p>
          </div>

          <div className="bg-blue-50 p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-blue-600">25K+</h3>
            <p>Shared Trips</p>
          </div>

          <div className="bg-cyan-50 p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-cyan-600">12K+</h3>
            <p>Cars Removed</p>
          </div>

        </div>

      </div>
    </section>
  );
}