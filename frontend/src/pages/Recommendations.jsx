import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Recommendations() {
  const [currentSource, setCurrentSource] = useState("");
  const [rides, setRides] = useState([]);

  const getRecommendations = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.post(
        "/recommendations",
        {
          userId: Number(userId),
          currentSource,
        }
      );

      setRides(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">
            Smart Recommendations
          </h1>

          <div className="bg-white p-6 rounded-2xl shadow mb-8">

            <input
              placeholder="Current Source"
              value={currentSource}
              onChange={(e) =>
                setCurrentSource(e.target.value)
              }
              className="border p-3 rounded-xl w-full"
            />

            <button
              onClick={getRecommendations}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Get Recommendations
            </button>

          </div>

          <div className="grid gap-4">

            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white p-5 rounded-2xl shadow"
              >
                <h2 className="text-xl font-semibold">
                  {ride.source} → {ride.destination}
                </h2>

                <p>
                  Date: {ride.travelDate}
                </p>

                <p>
                  Time: {ride.travelTime}
                </p>

                <p>
                  Seats: {ride.availableSeats}
                </p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
}