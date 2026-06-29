import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function UserBookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.get(
        `/bookings/history/${userId}`
      );

      setBookings(response.data);
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
            Booking History
          </h1>

          <div className="space-y-4">

            {bookings.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl shadow">
                No bookings found.
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow p-6"
                >
                  <h2 className="text-2xl font-semibold">
                    {booking.ride.source} → {booking.ride.destination}
                  </h2>

                  <p className="mt-3">
                    Date: {booking.ride.travelDate}
                  </p>

                  <p>
                    Time: {booking.ride.travelTime}
                  </p>

                  <p>
                    Seats: {booking.seatsBooked}
                  </p>

                  <p
                    className={`font-semibold ${
                      booking.status === "APPROVED"
                        ? "text-green-600"
                        : booking.status === "PENDING"
                        ? "text-yellow-600"
                        : booking.status === "REJECTED"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    Status: {booking.status}
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