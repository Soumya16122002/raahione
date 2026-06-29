import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import VerificationBadge from "../components/VerificationBadge";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [hasActiveRide, setHasActiveRide] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const driverId = localStorage.getItem("userId");

      // Booking Requests
      const bookingResponse = await api.get(
        `/bookings/driver/${driverId}`
      );

      setBookings(bookingResponse.data);

      // Driver Rides
      const rideResponse = await api.get(
        `/rides/driver/${driverId}`
      );

      const activeRide = rideResponse.data.find(
        (ride) => ride.status === "ACTIVE"
      );

      setHasActiveRide(!!activeRide);

    } catch (error) {
      console.error(error);
    }
  };

  const approveBooking = async (bookingId) => {
    try {
      await api.put(`/bookings/approve/${bookingId}`);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectBooking = async (bookingId) => {
    try {
      await api.put(`/bookings/reject/${bookingId}`);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const totalRequests = bookings.length;

  const pendingCount = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;

  const approvedCount = bookings.filter(
    (b) => b.status === "APPROVED"
  ).length;

  const rejectedCount = bookings.filter(
    (b) => b.status === "REJECTED"
  ).length;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow mb-8">
            <div>
              <h1 className="text-4xl font-bold">
                Driver Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Manage rides and passengers
              </p>
            </div>

            <VerificationBadge />
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <DashboardCard
              title="Total Requests"
              value={totalRequests}
            />

            <DashboardCard
              title="Passengers"
              value={approvedCount}
            />

            <DashboardCard
              title="Rating"
              value="N/A"
            />

            <DashboardCard
              title="Pending"
              value={pendingCount}
            />

            <DashboardCard
              title="Rejected"
              value={rejectedCount}
            />
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">
              Booking Requests
            </h2>
            <div className="grid md:grid-cols-4 gap-6 mb-8">

              {hasActiveRide ? (

              <div className="bg-gray-300 p-6 rounded-3xl shadow">

              <h3 className="text-2xl font-bold text-gray-700">
              🚫 Active Ride Exists
              </h3>

              <p className="mt-2 text-gray-600">
              Complete your current ride first.
              </p>

              </div>

              ) : (

              <Link
              to="/driver/create-ride"
              className="bg-blue-600 text-white p-6 rounded-3xl shadow hover:shadow-lg transition"
              >

              <h3 className="text-2xl font-bold">
              + Create Ride
              </h3>

              <p className="mt-2 text-blue-100">
              Publish a new ride
              </p>

              </Link>

              )}

              <a
                href="/my-rides"
                className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold">
                  🚗 My Rides
                </h3>

                <p className="text-gray-500 mt-2">
                  Manage active rides
                </p>
              </a>

              <a
                href="/driver-history"
                className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold">
                  📜 Ride History
                </h3>

                <p className="text-gray-500 mt-2">
                  View completed trips
                </p>
              </a>

              <a
                href="/driver-profile"
                className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold">
                  👤 Profile
                </h3>

                <p className="text-gray-500 mt-2">
                  Driver details & ratings
                </p>
              </a>

            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setActiveTab("PENDING")}
                className={`px-5 py-2 rounded-xl font-semibold ${
                  activeTab === "PENDING"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Pending ({pendingCount})
              </button>

              <button
                onClick={() => setActiveTab("APPROVED")}
                className={`px-5 py-2 rounded-xl font-semibold ${
                  activeTab === "APPROVED"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Approved ({approvedCount})
              </button>

              <button
                onClick={() => setActiveTab("REJECTED")}
                className={`px-5 py-2 rounded-xl font-semibold ${
                  activeTab === "REJECTED"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>

            <div className="space-y-4">

              {bookings.filter(
                (booking) => booking.status === activeTab
              ).length === 0 ? (
                <p className="text-gray-500">
                  No bookings found.
                </p>
              ) : (
                bookings
                  .filter(
                    (booking) =>
                      booking.status === activeTab
                  )
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-xl p-4"
                    >
                      <p className="font-semibold">
                        Passenger: {booking.user.name}
                      </p>

                      <p>
                        Seats: {booking.seatsBooked}
                      </p>

                      <p>
                        Status: {booking.status}
                      </p>

                      {booking.status === "PENDING" && (
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() =>
                              approveBooking(booking.id)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectBooking(booking.id)
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
