import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
  IndianRupee,
} from "lucide-react";

export default function CreateRide() {
  const navigate = useNavigate();
  const [ride, setRide] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    seats: 1,
    price: "",
    vehicle: "",
  });


  const handleChange = (e) => {
    setRide({
      ...ride,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const driverId = localStorage.getItem("userId");

      const payload = {
        source: ride.source,
        destination: ride.destination,
        departureTime: ride.time,
        availableSeats: Number(ride.seats),
        driverId: Number(driverId),
        travelDate: ride.date,
        travelTime: ride.time,
      };

      const response = await api.post("/rides", payload);

      alert("Ride published successfully!");

      setTimeout(() => {
        navigate("/driver");
      }, 1000);

      console.log(response.data);

      setRide({
        source: "",
        destination: "",
        date: "",
        time: "",
        seats: 1,
        price: "",
        vehicle: "",
      });

    }
    catch (error) {
       console.error(error);

       if (
         error.response &&
         typeof error.response.data === "string"
       ) {
         alert(error.response.data);
       } else {
         alert("Failed to publish ride.");
       }
     }
     }

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Create Ride
          </h1>

          <p className="text-gray-500 mt-2">
            Publish your trip and start receiving booking requests.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-10 space-y-8"
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <MapPin size={18} />
                Pickup Location
              </label>

              <input
                type="text"
                name="source"
                value={ride.source}
                onChange={handleChange}
                placeholder="Kolkata"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <MapPin size={18} />
                Destination
              </label>

              <input
                type="text"
                name="destination"
                value={ride.destination}
                onChange={handleChange}
                placeholder="Durgapur"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <Calendar size={18} />
                Travel Date
              </label>

              <input
                type="date"
                name="date"
                value={ride.date}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <Clock size={18} />
                Departure Time
              </label>

              <input
                type="time"
                name="time"
                value={ride.time}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <Users size={18} />
                Available Seats
              </label>

              <input
                type="number"
                name="seats"
                min="1"
                max="8"
                value={ride.seats}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="font-semibold mb-2 flex items-center gap-2">
                <IndianRupee size={18} />
                Price Per Seat
              </label>

              <input
                type="number"
                name="price"
                value={ride.price}
                onChange={handleChange}
                placeholder="250"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

          </div>

          <div>
            <label className="font-semibold mb-2 flex items-center gap-2">
              <Car size={18} />
              Vehicle
            </label>

            <input
              type="text"
              name="vehicle"
              value={ride.vehicle}
              onChange={handleChange}
              placeholder="Hyundai Creta"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="grid grid-cols-3 gap-5">

            <div className="bg-blue-50 rounded-2xl p-5">
              <h3 className="font-semibold text-blue-700">
                Safe Ride
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Your ride is visible only to verified users.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5">
              <h3 className="font-semibold text-green-700">
                Instant Requests
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Receive booking requests immediately after publishing.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-5">
              <h3 className="font-semibold text-purple-700">
                Manage Easily
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Approve or reject passengers from your dashboard.
              </p>
            </div>

          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] transition"
          >
            Publish Ride
          </button>

        </form>

      </div>

    </div>
  );
}