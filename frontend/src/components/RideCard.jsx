import TrustBadge from "./TrustBadge";

export default function RideCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-4 border">

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">Rahul Sharma</h3>
          <p className="text-gray-500">
            Hyundai i20
          </p>
        </div>

        <TrustBadge score={92} />
      </div>

      <div className="mt-4">
        <p>Kolkata → Salt Lake</p>
        <p className="mt-2">₹60 per seat</p>
        <p>⭐ 4.8 Rating</p>
        <p>🌱 2.4kg CO₂ Saved</p>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl">
        Join Ride
      </button>

    </div>
  );
}