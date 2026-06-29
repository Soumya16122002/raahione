import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();

    window.location.replace("/login");
  };
  const role = localStorage.getItem("role");

  const handleSearch = () => {
    if (role === "USER") {
      navigate("/user");
    } else if (role === "DRIVER") {
      navigate("/driver");
    } else if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/search");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          Raahione
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/">How It Works</Link>
          <Link to="/">Safety</Link>
          <Link to="/">About us</Link>

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-3">

          {token && role === "USER" && (
            <button
              onClick={() => navigate("/user")}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Dashboard
            </button>
          )}

          {token && role === "DRIVER" && (
            <button
              onClick={() => navigate("/driver")}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Dashboard
            </button>
          )}

          {token && role === "ADMIN" && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Dashboard
            </button>
          )}

          {!token && (
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Search Ride
            </button>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}