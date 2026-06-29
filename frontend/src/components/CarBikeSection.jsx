export default function CarBikeSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-blue-900 text-white rounded-3xl p-8">
            <p className="text-blue-300 text-sm mb-3">
              FOR CAR OWNERS
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Carpooling
            </h2>

            <p className="text-blue-100 mb-6">
              Offer verified seats and recover fuel costs.
            </p>

            <button className="bg-blue-500 px-5 py-3 rounded-xl">
              Share Your Ride
            </button>
          </div>

          <div className="bg-orange-600 text-white rounded-3xl p-8">
            <p className="text-orange-200 text-sm mb-3">
              FOR BIKE OWNERS
            </p>

            <h2 className="text-4xl font-bold mb-4">
              Bikepooling
            </h2>

            <p className="text-orange-100 mb-6">
              Share your pillion seat and split petrol costs.
            </p>

            <button className="bg-orange-500 px-5 py-3 rounded-xl">
              Hop on a Bike
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}