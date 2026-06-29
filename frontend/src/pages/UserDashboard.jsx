import { useEffect, useState } from "react";
import { FaCar, FaMoneyBillWave, FaClock, FaTimesCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [selectedDay, setSelectedDay] = useState("today");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.get(`/users/${userId}`);

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };
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
  const searchRides = async () => {
    try {
      const response = await api.get(
        `/rides/search?source=${source}&destination=${destination}`
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approvedCount = bookings.filter(
    (b) => b.status === "APPROVED"
  ).length;

  const pendingCount = bookings.filter(
    (b) => b.status === "PENDING"
  ).length;

  const rejectedCount = bookings.filter(
    (b) => b.status === "REJECTED"
  ).length;

  const moneySaved = approvedCount * 120;

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

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto p-6">

          {/* HERO */}

          {/* PROFILE BAR */}

          <div className="bg-white rounded-3xl p-4 shadow mb-6 flex justify-between items-center">

            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>

              <div>

                <h2 className="font-bold text-2xl">
                  {user?.name || "User"}
                </h2>
                <div className="flex gap-2 mt-1">

                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    ✓ Verified
                  </span>

                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {user?.role || "Passenger"}
                  </span>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 border rounded-xl"
              >
                Profile
              </button>

              <div className="px-5 py-2 rounded-full bg-green-50 border border-green-200">
                 {user?.city || "Add City"}
              </div>

            </div>

          </div>

          {/* SEARCH BOX */}

          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 mb-8">

            <h2 className="text-3xl font-bold mb-5">
              Where are you going today?
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">

              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                type="text"
                placeholder="From — e.g. Howrah Station"
                className="w-full border rounded-2xl p-4"
              />

              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
                placeholder="To — e.g. Salt Lake Sector V"
                className="w-full border rounded-2xl p-4"
              />

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => setSelectedDay("today")}
                className={`px-6 py-3 rounded-xl ${
                  selectedDay === "today"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                Today
              </button>

              <button
                onClick={() => setSelectedDay("tomorrow")}
                className={`px-6 py-3 rounded-xl ${
                  selectedDay === "tomorrow"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                Tomorrow
              </button>

              <input
                type="date"
                className="border rounded-xl px-4 py-3"
              />

              <button
                onClick={searchRides}
                className="ml-auto px-8 py-3 bg-indigo-600 text-white rounded-xl"
              >
                Search Rides
              </button>

            </div>
            {searchResults.length > 0 && (

              <div className="mb-8">

                <h2 className="text-3xl font-bold mb-4">
                  Search Results
                </h2>

                <div className="space-y-4">

                  {searchResults.map((ride) => (

                    <div
                      key={ride.id}
                      className="bg-white rounded-3xl shadow p-5"
                    >

                      <h3 className="text-xl font-semibold">
                        {ride.source} → {ride.destination}
                      </h3>

                      <p>
                        📅 {ride.travelDate}
                      </p>

                      <p>
                        🕒 {ride.travelTime}
                      </p>

                      <p>
                        👥 {ride.availableSeats} Seats
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

          {/* QUICK ACTIONS */}


          {/* STATS */}

          <div className="mb-8">

            <h2 className="text-3xl font-bold mb-4">
              Your Snapshot
            </h2>

            <div className="grid md:grid-cols-4 gap-5">

              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5">
                <p className="text-gray-600">Rides Taken</p>
                <h2 className="text-5xl font-bold mt-2 text-emerald-700">
                  {approvedCount}
                </h2>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-5">
                <p className="text-gray-600">Money Saved</p>
                <h2 className="text-5xl font-bold mt-2 text-indigo-700">
                  ₹{approvedCount * 120}
                </h2>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-3xl p-5">
                <p className="text-gray-600">CO₂ Offset</p>
                <h2 className="text-5xl font-bold mt-2 text-orange-700">
                  {approvedCount * 2} kg
                </h2>
              </div>

              <div className="bg-lime-50 border border-lime-200 rounded-3xl p-5">
                <p className="text-gray-600">Your Rating</p>
                <h2 className="text-5xl font-bold mt-2 text-lime-700">
                  4.8
                </h2>
              </div>

            </div>

          </div>

          <div className="bg-green-50 border border-green-200 rounded-3xl p-6 mb-8">

            <div className="flex justify-between items-start">

              <div>

                <span className="bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                  Active
                </span>

                <h2 className="text-3xl font-bold mt-4">
                  Howrah → Salt Lake Sector V
                </h2>

                <p className="text-gray-600 mt-2">
                  Driver: Arjun K.
                </p>

                <p className="text-gray-600">
                  Departure: 10:30 AM
                </p>

                <p className="text-gray-600">
                  Seat: B2
                </p>

              </div>

              <div className="flex flex-col gap-3">

                <button
                  onClick={() => navigate("/my-bookings")}
                  className="bg-green-700 text-white px-6 py-3 rounded-xl"
                >
                  Track Ride
                </button>

                <button
                  onClick={() => navigate("/messages")}
                  className="bg-white border px-6 py-3 rounded-xl"
                >
                  Message Driver
                </button>

              </div>

            </div>

          </div>

          {/* MAIN GRID */}

          <div className="mb-8">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-3xl font-bold">
                Upcoming Bookings
              </h2>

              <button className="font-medium">
                View All →
              </button>

            </div>

            <div className="space-y-4">

              {bookings.slice(0, 5).map((booking) => (

                <div
                  key={booking.id}
                  className="bg-white rounded-3xl shadow p-5 flex justify-between items-center"
                >

                  <div className="flex gap-5 items-center">

                    <div className="bg-indigo-50 rounded-2xl px-5 py-3 text-center min-w-[80px]">

                      <div className="text-2xl font-bold">
                        {booking.ride.travelDate?.split("-")[2]}
                      </div>

                      <div className="text-sm text-gray-500">
                        Jun
                      </div>

                    </div>

                    <div>

                      <h3 className="text-2xl font-semibold">
                        {booking.ride.source} → {booking.ride.destination}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {booking.ride.travelTime}
                      </p>

                    </div>

                  </div>

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        booking.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>
          <div className="mb-10">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-3xl font-bold">
                Recent Rides
              </h2>

              <button>
                View All →
              </button>

            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow">

              <div className="grid grid-cols-5 bg-gray-100 p-4 font-semibold">

                <div>Route</div>
                <div>Date</div>
                <div>Driver</div>
                <div>Fare</div>
                <div>Rating</div>

              </div>

              {bookings.map((booking) => (

                <div
                  key={booking.id}
                  className="grid grid-cols-5 p-4 border-t"
                >

                  <div>
                    {booking.ride.source} → {booking.ride.destination}
                  </div>

                  <div>
                    {booking.ride.travelDate}
                  </div>

                  <div>
                    {booking.ride.driver?.name || "Driver"}
                  </div>

                  <div>
                    ₹120
                  </div>

                  <div>
                    ⭐ 4.8
                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="mb-10">

            <h2 className="text-3xl font-bold mb-4">
              Recommended For You
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-white rounded-3xl shadow p-5">

                <h3 className="text-xl font-semibold">
                  Howrah → Dum Dum
                </h3>

                <p className="text-gray-500 mt-2">
                  Today • 11:00 AM
                </p>

                <p className="mt-2">
                  2 Seats Left
                </p>

                <button className="mt-4 bg-green-100 text-green-700 px-5 py-2 rounded-full">
                  ₹70
                </button>

              </div>

              <div className="bg-white rounded-3xl shadow p-5">

                <h3 className="text-xl font-semibold">
                  Esplanade → Barasat
                </h3>

                <p className="text-gray-500 mt-2">
                  Today • 12:30 PM
                </p>

                <p className="mt-2">
                  1 Seat Left
                </p>

                <button className="mt-4 bg-orange-100 text-orange-700 px-5 py-2 rounded-full">
                  ₹110
                </button>

              </div>

              <div className="bg-white rounded-3xl shadow p-5">

                <h3 className="text-xl font-semibold">
                  Salt Lake → Sealdah
                </h3>

                <p className="text-gray-500 mt-2">
                  Today • 2:00 PM
                </p>

                <p className="mt-2">
                  3 Seats Left
                </p>

                <button className="mt-4 bg-lime-100 text-lime-700 px-5 py-2 rounded-full">
                  ₹55
                </button>

              </div>

            </div>

          </div>



        </div>
      </div>
    </>
  );
}