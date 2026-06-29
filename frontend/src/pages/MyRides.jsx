import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function MyRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchMyRides();
  }, []);

  const fetchMyRides = async () => {
    try {
      const driverId = localStorage.getItem("userId");

      const response = await api.get(
        `/rides/driver/${driverId}`
      );

      setRides(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">
            My Rides
          </h1>

          <div className="grid gap-6">

            {rides.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl shadow">
                No rides found.
              </div>
            ) : (
              rides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white p-6 rounded-2xl shadow"
                >
                  <h2 className="text-2xl font-semibold">
                    {ride.source} → {ride.destination}
                  </h2>

                  <p className="mt-3">
                    Date: {ride.travelDate}
                  </p>

                  <p>
                    Time: {ride.departureTime}
                  </p>

                  <p>
                    Available Seats: {ride.availableSeats}
                  </p>

                  <p>
                    Status: {ride.status}
                  </p>
                </div>
              ))
            )}

          </div>

        </div>
      </div>
    </>
  );
}