import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.get(`/users/${userId}`);

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await api.put(`/users/${userId}`, user);

      localStorage.setItem("userName", user.name);
      alert("Profile Updated");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">

        <div className="max-w-6xl mx-auto">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8">

            <div className="flex items-center gap-6">

              <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                {user.name?.charAt(0)}
              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  {user.name}
                </h1>

                <div className="flex gap-3 mt-3">

                  <span className="bg-white/20 px-4 py-1 rounded-full">
                    ✓ Verified
                  </span>

                  <span className="bg-white/20 px-4 py-1 rounded-full">
                    {user.role || "Passenger"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-4 gap-5 mb-8">

            <div className="bg-white rounded-3xl p-5 shadow">
              <p>Total Rides</p>
              <h2 className="text-4xl font-bold mt-2">24</h2>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow">
              <p>Rating</p>
              <h2 className="text-4xl font-bold mt-2">4.8</h2>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow">
              <p>Trust Score</p>
              <h2 className="text-4xl font-bold mt-2">95%</h2>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow">
              <p>Member Since</p>
              <h2 className="text-xl font-bold mt-2">2025</h2>
            </div>

          </div>

          <div className="bg-white rounded-3xl shadow p-8">

            <h2 className="text-3xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                value={user.name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
                placeholder="Name"
                className="border rounded-2xl p-4"
              />

              <input
                value={user.email}
                disabled
                className="border rounded-2xl p-4 bg-gray-100 cursor-not-allowed"
              />

              <input
                value={user.phone || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone"
                className="border rounded-2xl p-4"
              />

              <input
                value={user.city || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    city: e.target.value,
                  })
                }
                placeholder="City"
                className="border rounded-2xl p-4"
              />

            </div>

            <textarea
              value={user.bio || ""}
              onChange={(e) =>
                setUser({
                  ...user,
                  bio: e.target.value,
                })
              }
              placeholder="Bio"
              rows="5"
              className="border rounded-2xl p-4 w-full mt-6"
            />

            <button
              onClick={updateProfile}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>
    </>
  );
}