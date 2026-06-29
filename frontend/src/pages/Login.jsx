import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId", response.data.userId);

      if (response.data.role === "DRIVER") {
        navigate("/driver", { replace: true });
      } else if (response.data.role === "USER") {
        navigate("/user", { replace: true });
      } else if (response.data.role === "ADMIN") {
        navigate("/admin", { replace: true });
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Login to your Raahione account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer ml-2"
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
  }