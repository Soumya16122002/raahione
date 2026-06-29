import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalRides: 0,
    totalBookings: 0,
  });
  const [selectedCard, setSelectedCard] = useState("");
    const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(
        "/admin/analytics"
      );

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const loadData = async (type) => {
    try {

      let response;

      if (type === "users") {
        response = await api.get("/admin/users");
      }

      else if (type === "drivers") {
        response = await api.get("/admin/users");

        response.data = response.data.filter(
          (user) => user.role === "DRIVER"
        );
      }

      else if (type === "rides") {
        response = await api.get("/admin/rides");
      }

      else if (type === "bookings") {
        response = await api.get("/admin/bookings");
      }

      setSelectedCard(type);
      setTableData(response.data);

    } catch (error) {
      console.error(error);
    }
  };
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

          <div className="bg-white p-6 rounded-3xl shadow mb-8">
            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Platform Analytics
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">

            <div
              onClick={() => loadData("users")}
              className="cursor-pointer"
            >
              <DashboardCard
                title="Total Users"
                value={analytics.totalUsers}
              />
            </div>

            <div
              onClick={() => loadData("drivers")}
              className="cursor-pointer"
            >
              <DashboardCard
                title="Total Drivers"
                value={analytics.totalDrivers}
              />
            </div>

            <div
              onClick={() => loadData("rides")}
              className="cursor-pointer"
            >
              <DashboardCard
                title="Total Rides"
                value={analytics.totalRides}
              />
            </div>

            <div
              onClick={() => loadData("bookings")}
              className="cursor-pointer"
            >
              <DashboardCard
                title="Total Bookings"
                value={analytics.totalBookings}
              />
            </div>

          </div>

        </div>
        {selectedCard !== "" && (

        <div className="bg-white rounded-3xl shadow p-6 mt-8">

        <h2 className="text-2xl font-bold mb-5 capitalize">

        {selectedCard}

        </h2>

        <table className="w-full border-collapse">

        <thead>

        {selectedCard === "users" ||
        selectedCard === "drivers" ? (

        <tr className="border-b">

        <th className="text-left p-3">Name</th>
        <th className="text-left p-3">Email</th>
        <th className="text-left p-3">Role</th>

        </tr>

        ) : selectedCard === "rides" ? (

        <tr className="border-b">

        <th className="text-left p-3">Source</th>
        <th className="text-left p-3">Destination</th>
        <th className="text-left p-3">Seats</th>

        </tr>

        ) : (

        <tr className="border-b">

        <th className="text-left p-3">Passenger</th>
        <th className="text-left p-3">Seats</th>
        <th className="text-left p-3">Status</th>

        </tr>

        )}

        </thead>

        <tbody>

        {tableData.map(item => (

        <tr
        key={item.id}
        className="border-b hover:bg-gray-50"
        >

        {selectedCard === "users" ||
        selectedCard === "drivers" ? (

        <>

        <td className="p-3">{item.name}</td>
        <td className="p-3">{item.email}</td>
        <td className="p-3">{item.role}</td>

        </>

        ) : selectedCard === "rides" ? (

        <>

        <td className="p-3">{item.source}</td>
        <td className="p-3">{item.destination}</td>
        <td className="p-3">{item.availableSeats}</td>

        </>

        ) : (

        <>

        <td className="p-3">{item.user.name}</td>
        <td className="p-3">{item.seatsBooked}</td>
        <td className="p-3">{item.status}</td>

        </>

        )}

        </tr>

        ))}

        </tbody>

        </table>

        </div>

        )}
      </div>
    </>
  );
}