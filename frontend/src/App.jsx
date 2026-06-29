import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchRide from "./pages/SearchRide";

import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import BookingHistory from "./pages/BookingHistory";

import MyRides from "./pages/MyRides";
import DriverHistory from "./pages/DriverHistory";
import DriverProfile from "./pages/DriverProfile";

import Rating from "./pages/Rating";
import Recommendations from "./pages/Recommendations";
import CreateRide from "./pages/CreateRide";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "USER") {
      return <Navigate to="/user" replace />;
    }

    if (role === "DRIVER") {
      return <Navigate to="/driver" replace />;
    }

    if (role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/search" element={<SearchRide />} />

        {/* User Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-history"
          element={
            <ProtectedRoute >
              <BookingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rating"
          element={
            <ProtectedRoute>
              <Rating />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />

        {/* Driver Routes */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute allowedRole="DRIVER">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-rides"
          element={
            <ProtectedRoute>
              <MyRides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver-history"
          element={
            <ProtectedRoute>
              <DriverHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver-profile"
          element={
            <ProtectedRoute>
              <DriverProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/create-ride"
          element={
            <ProtectedRoute>
              <CreateRide />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
