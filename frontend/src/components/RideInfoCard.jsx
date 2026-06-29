import DriverProfileCard from "./DriverProfileCard";

export default function RideInfoCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-5">

      <DriverProfileCard />

      <div className="mt-5 space-y-2">

        <p>
          📍 Kolkata → Salt Lake
        </p>

        <p>
          🚗 Hyundai i20
        </p>

        <p>
          💺 3 Seats Available
        </p>

        <p>
          🌱 CO₂ Saved: 2.4kg
        </p>

        <p>
          ₹60 per seat
        </p>

      </div>

      <button className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl">
        Join Ride
      </button>

    </div>
  );
}