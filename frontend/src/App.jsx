

import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [rides, setRides] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [driverBookings, setDriverBookings] = useState([]);
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [driverTrips, setDriverTrips] = useState([]);
  const [users, setUsers] = useState([]);
  const [allRides, setAllRides] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const loggedUser =
    currentUser ||
    JSON.parse(localStorage.getItem("user"));
  const [rideSource, setRideSource] = useState("");
  const [rideDestination, setRideDestination] = useState("");
  const [rideDepartureTime, setRideDepartureTime] = useState("");
  const [rideSeats, setRideSeats] = useState("");

  const register = async () => {
  if (
    !name.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    alert("Name, Email and Password are required");
    return;
  }
    try {
      const response = await axios.post("http://localhost:8080/users/register", {
        name,
        email,
        password,
        role,
      });
      alert("User Registered Successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
      alert("Login Successful");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  const searchRides = async () => {
    try {
      const url = "http://localhost:8080/rides/search?source=" + source + "&destination=" + destination;
      const response = await axios.get(url);
      setRides(response.data);
    } catch (error) {
      console.log(error);
      alert("Ride Search Failed");
    }
  };
  const loadRecommendations = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.post(
        "http://localhost:8080/recommendations",
        {
          userId: user.id,
          currentSource: source
        }
      );

      setRecommendations(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const bookRide = async (rideId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:8080/bookings", {
        userId: user.id,
        rideId: rideId,
        seatsBooked: 1,
      });
      alert("Ride Booked Successfully");
    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };
  const loadBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        "http://localhost:8080/bookings/history/" + user.id
      );

      setBookings(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed To Load Bookings");
    }
  };
  const loadDriverTrips = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        "http://localhost:8080/rides/driver/" + user.id
      );

      setDriverTrips(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(
        "http://localhost:8080/bookings/cancel/" + bookingId
      );

      alert("Booking Cancelled");

      loadBookings();
    } catch (error) {
      console.log(error);
      alert("Cancel Failed");
    }
  };
  const loadDriverBookings = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        "http://localhost:8080/bookings/driver/" + user.id
      );
      console.log(response.data);

      setDriverBookings(
        response.data.filter(
          (booking) => booking.status === "PENDING"
        )
      );

      setApprovedBookings(
        response.data.filter(
          (booking) => booking.status === "APPROVED"
        )
      );

    } catch (error) {
      console.log(error);
    }
  };
  const approveBooking = async (bookingId) => {
    try {

      await axios.put(
        "http://localhost:8080/bookings/approve/" + bookingId
      );

      loadDriverBookings();

    } catch (error) {
      console.log(error);
    }
  };

  const rejectBooking = async (bookingId) => {
    try {

      await axios.put(
        "http://localhost:8080/bookings/reject/" + bookingId
      );

      loadDriverBookings();

    } catch (error) {
      console.log(error);
    }
  };

  const createRide = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.post(
        "http://localhost:8080/rides",
        {
          source: rideSource,
          destination: rideDestination,
          departureTime: rideDepartureTime,
          availableSeats: parseInt(rideSeats),
          driverId: user.id,
        }
      );

      alert("Ride Created Successfully");
      console.log(response.data);

    } catch (error) {
      console.log(error);
      alert("Ride Creation Failed");
    }
  };
  const loadUsers = async () => {
    const response = await axios.get(
      "http://localhost:8080/users"
    );
    setUsers(response.data);
  };

  const loadAllRides = async () => {
    const response = await axios.get(
      "http://localhost:8080/rides"
    );
    setAllRides(response.data);
  };

  const loadAllBookings = async () => {
    const response = await axios.get(
      "http://localhost:8080/admin/bookings"
    );
    setAllBookings(response.data);
  };

  const loadAnalytics = async () => {
    const response = await axios.get(
      "http://localhost:8080/admin/analytics"
    );
    setAnalytics(response.data);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        "http://localhost:8080/users/" + userId
      );

      loadUsers();

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Cannot delete user"
      );
    }
  };

  const deleteRide = async (rideId) => {
    try {
      await axios.delete(
        "http://localhost:8080/rides/" + rideId
      );

      loadAllRides();

    } catch (error) {
      alert("Cannot delete ride");
    }
  };
  console.log(loggedUser);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Raahione Ride Sharing</h1>
      <hr />
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="USER">USER</option>
        <option value="DRIVER">DRIVER</option>
      </select>

      <br /><br />
      <button onClick={register}>Register</button>
      <hr />
      <h2>Login</h2>
      <input placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      <br /><br />
      <button onClick={login}>Login</button>
      <hr />

      <hr />
      {loggedUser?.role === "DRIVER" && (
      <>
      <h2>Offer Ride</h2>

      <input
        placeholder="Source"
        value={rideSource}
        onChange={(e) =>
          setRideSource(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Destination"
        value={rideDestination}
        onChange={(e) =>
          setRideDestination(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Departure Time"
        value={rideDepartureTime}
        onChange={(e) =>
          setRideDepartureTime(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Available Seats"
        value={rideSeats}
        onChange={(e) =>
          setRideSeats(e.target.value)
        }
      />

      <br /><br />

      <button onClick={createRide}>
        Create Ride
      </button>
      <hr />

      <h2>Booking Requests</h2>

      <button onClick={loadDriverBookings}>
        Load Requests
      </button>

      <br /><br />

      {driverBookings
        .filter((booking) => booking.status === "PENDING")
        .map((booking) => (
        <div
          key={booking.id}
          style={{
            border: "1px solid green",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Booking ID: {booking.id}</p>
          <p>Status: {booking.status}</p>
          <p>User: {booking.user.name}</p>

          <button
            onClick={() => approveBooking(booking.id)}
          >
            Approve
          </button>

          <button
            onClick={() => rejectBooking(booking.id)}
          >
            Reject
          </button>
        </div>
      ))}
      <hr />

      <h2>Approved Passengers</h2>

      {approvedBookings.map((booking) => (
        <div
          key={booking.id}
          style={{
            border: "1px solid blue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>User: {booking.user.name}</p>
          <p>Email: {booking.user.email}</p>
          <p>Booking ID: {booking.id}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
      <hr />

      <h2>My Trips</h2>

      <button onClick={loadDriverTrips}>
        Load My Trips
      </button>

      <br /><br />

      {driverTrips.map((ride) => (
        <div
          key={ride.id}
          style={{
            border: "1px solid orange",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Ride ID: {ride.id}</p>
          <p>Source: {ride.source}</p>
          <p>Destination: {ride.destination}</p>
        </div>
      ))}

      </>
      )}
      {loggedUser?.role === "USER" && (
      <>
      <h2>Search Ride</h2>

      <input placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
      <br /><br />
      <input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <br /><br />
      <button
        onClick={() => {
          searchRides();
          loadRecommendations();
        }}
      >
        Search Ride
      </button>
      <br /><br />

      <h2>Recommended For You</h2>

      {recommendations.map((ride) => (
        <div
          key={ride.id}
          style={{
            border: "2px solid green",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>⭐ Source: {ride.source}</p>
          <p>⭐ Destination: {ride.destination}</p>
          <p>⭐ Departure: {ride.departureTime}</p>
          <p>⭐ Available Seats: {ride.availableSeats}</p>
        </div>
      ))}
      <br /><br />
      {rides
        .filter((ride) => ride.availableSeats > 0)
        .map((ride) => (
        <div key={ride.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
          <h3>Ride #{ride.id}</h3>
          <p>Source: {ride.source}</p>
          <p>Destination: {ride.destination}</p>
          <p>Available Seats: {ride.availableSeats}</p>
          <p>Departure: {ride.departureTime}</p>
          <button onClick={() => bookRide(ride.id)}>Book Ride</button>
        </div>
      ))}
      </>
      )}
      <hr />
      {loggedUser?.role === "USER" && (
      <>
      <h2>My Bookings</h2>

      <button onClick={loadBookings}>
        Load My Bookings
      </button>

      <br /><br />

      {bookings.map((booking) => (
        <div
          key={booking.id}
          style={{
            border: "1px solid blue",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p>Booking ID: {booking.id}</p>
          <p>Status: {booking.status}</p>
          <p>Seats Booked: {booking.seatsBooked}</p>

          {(booking.status === "APPROVED" ||
            booking.status === "PENDING") && (
            <button
              onClick={() =>
                cancelBooking(booking.id)
              }
            >
              Cancel Booking
            </button>
          )}

        </div>
      ))}
      </>
      )}
      {loggedUser?.role === "ADMIN" && (
        <>
          <hr />

          <h2>Admin Dashboard</h2>

          <button onClick={loadAnalytics}>
            Load Analytics
          </button>

          <button onClick={loadUsers}>
            Load Users
          </button>

          <button onClick={loadAllRides}>
            Load Rides
          </button>

          <button onClick={loadAllBookings}>
            Load Bookings
          </button>

          <br /><br />

          {analytics && (
            <div>
              <h3>Analytics</h3>

              <p>Total Users: {analytics.totalUsers}</p>

              <p>Total Drivers: {analytics.totalDrivers}</p>

              <p>Total Rides: {analytics.totalRides}</p>

              <p>Total Bookings: {analytics.totalBookings}</p>
            </div>
          )}

          <hr />

          <h3>Users</h3>

          {users.map((user) => (
            <div key={user.id}>
              {user.name} - {user.role}

              <button
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          ))}

          <hr />

          <h3>Rides</h3>

          {allRides.map((ride) => (
            <div key={ride.id}>
              {ride.source} → {ride.destination}

              <button
                onClick={() => deleteRide(ride.id)}
              >
                Delete Ride
              </button>
            </div>
          ))}

          <hr />

          <h3>Bookings</h3>

          {allBookings.map((booking) => (
            <div key={booking.id}>
              Booking #{booking.id}
              {" - "}
              {booking.status}
            </div>
          ))}
        </>
      )}
    </div>

  );
}

export default App;