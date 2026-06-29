import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function DriverProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.get(
        `/users/${userId}`
      );

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-3xl shadow p-8">

            <h1 className="text-4xl font-bold mb-6">
              Driver Profile
            </h1>

            <div className="space-y-4">

              <div>
                <p className="text-gray-500">
                  Name
                </p>

                <p className="text-xl font-semibold">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Email
                </p>

                <p className="text-xl font-semibold">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Phone
                </p>

                <p className="text-xl font-semibold">
                  {user.phone || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  City
                </p>

                <p className="text-xl font-semibold">
                  {user.city || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Bio
                </p>

                <p className="text-xl font-semibold">
                  {user.bio || "Not Added"}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}