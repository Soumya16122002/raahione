

import { useState } from "react";
import axios from "axios";
const API_BASE_URL = "raahione-backend-production.up.railway.app";
axios.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

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
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");

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
      const response = await axios.post(`${API_BASE_URL}/users/register`, {
        name,
        email,
        password,
        role,
        phone,
        city,
        bio
      });
      alert("User Registered Successfully");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setCity("");
      setBio("");
      setRole("USER");

    } catch (error) {

      alert("Registration Failed");
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.userId,
          role: response.data.role
        })
      );
      setBookings([]);
      setDriverBookings([]);
      setApprovedBookings([]);
      setDriverTrips([]);
      setRides([]);
      setRecommendations([]);
      setCurrentUser({
        id: response.data.userId,
        role: response.data.role
      });
      if (response.data.role === "USER") {
        loadBookings();
      }

      if (response.data.role === "DRIVER") {
        loadDriverBookings();
        loadDriverTrips();
      }
      alert("Login Successful");
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {

      alert("Login Failed");
    }
  };
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setCurrentUser(null);

    setLoginEmail("");
    setLoginPassword("");

    setBookings([]);
    setDriverBookings([]);
    setApprovedBookings([]);
    setDriverTrips([]);
    setRides([]);
    setRecommendations([]);
    setUsers([]);
    setAllRides([]);
    setAllBookings([]);
    setAnalytics(null);
  };

  const searchRides = async () => {
    try {
     const url = `${API_BASE_URL}/rides/search?source=${source}&destination=${destination}&travelDate=${searchDate}`;
      const response = await axios.get(url);
      setRides(response.data);
    } catch (error) {

      alert("Ride Search Failed");
    }
  };
  const loadRecommendations = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.post(
        `${API_BASE_URL}/recommendations`,
        {
          userId: user.id,
          currentSource: source
        }
      );

      setRecommendations(response.data);

    } catch (error) {

    }
  };

  const bookRide = async (rideId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post(`${API_BASE_URL}/bookings`, {
        userId: user.id,
        rideId: rideId,
        seatsBooked: 1,
      });
      alert("Ride Booked Successfully");
    } catch (error) {

      alert("Booking Failed");
    }
  };
  const loadBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await axios.get(
        `${API_BASE_URL}/bookings/history/` + user.id
      );

      setBookings(response.data);
    } catch (error) {

      alert("Failed To Load Bookings");
    }
  };
  const loadDriverTrips = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        `${API_BASE_URL}/rides/driver/` + user.id
      );

      setDriverTrips(response.data);

    } catch (error) {

    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/bookings/cancel/` + bookingId
      );

      alert("Booking Cancelled");

      loadBookings();
    } catch (error) {

      alert("Cancel Failed");
    }
  };
  const loadDriverBookings = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        `${API_BASE_URL}/bookings/driver/` + user.id
      );


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

    }
  };
  const approveBooking = async (bookingId) => {
    try {

      await axios.put(
        `${API_BASE_URL}/bookings/approve/`+ bookingId
      );

      loadDriverBookings();

    } catch (error) {

    }
  };

  const rejectBooking = async (bookingId) => {
    try {

      await axios.put(
        `${API_BASE_URL}/bookings/reject/` + bookingId
      );

      loadDriverBookings();

    } catch (error) {

    }
  };

  const createRide = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.post(
        `${API_BASE_URL}/rides`,
        {
              source: rideSource,
              destination: rideDestination,
              departureTime: rideDepartureTime,
              travelDate: travelDate,
              travelTime: travelTime,
              availableSeats: parseInt(rideSeats),
              driverId: user.id,
        }
      );

      alert("Ride Created Successfully");


    } catch (error) {

      alert("Ride Creation Failed");
    }
  };
  const loadUsers = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/users`
    );
    setUsers(response.data);
  };

  const loadAllRides = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/rides`
    );
    setAllRides(response.data);
  };

  const loadAllBookings = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/admin/bookings`
    );
    setAllBookings(response.data);
  };

  const loadAnalytics = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/admin/analytics`
    );
    setAnalytics(response.data);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/users/` + userId
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
        `${API_BASE_URL}/rides/` + rideId
      );

      loadAllRides();

    } catch (error) {
      alert("Cannot delete ride");
    }
  };
  const submitRating = async (rideId) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `${API_BASE_URL}/ratings`,
        {
          userId: user.id,
          rideId: rideId,
          rating: parseInt(rating),
          review: review
        }
      );

      alert("Rating Submitted");

      setRating("");
      setReview("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Rating Failed"
      );
    }
  };
  const loadRatings = async (rideId) => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/ratings/ride/` + rideId
      );

      setRatings(response.data);

    } catch (error) {

      alert("Failed To Load Ratings");
    }
  };
  const loadAllRatings = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/ratings`
      );

      setAllRatings(response.data);

    } catch (error) {

      alert("Failed To Load Ratings");
    }
  };
  const completeRide = async (rideId) => {

    try {

      await axios.put(
        `${API_BASE_URL}/rides/complete/` + rideId
      );

      alert("Ride Completed");

      loadDriverTrips();

    } catch (error) {

      alert("Failed To Complete Ride");
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      {loggedUser && (
        <button onClick={logout}>
          Logout
        </button>
      )}

      <h1>Raahione Ride Sharing</h1>
      <hr />
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
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
        type="date"
        value={travelDate}
        onChange={(e) =>
          setTravelDate(e.target.value)
        }
      />

      <br /><br />

      <input
        type="time"
        value={travelTime}
        onChange={(e) =>
          setTravelTime(e.target.value)
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
          <p>Status: {ride.status}</p>

          {ride.status !== "COMPLETED" && (
            <button
              onClick={() => completeRide(ride.id)}
            >
              Complete Ride
            </button>
          )}
          <button
            onClick={() => loadRatings(ride.id)}
          >
            View Ratings
          </button>
          {ratings.map((rating) => (
            <div
              key={rating.id}
              style={{
                border: "1px solid gray",
                padding: "5px",
                marginTop: "5px"
              }}
            >
              <p>
                {"⭐".repeat(rating.rating)}
              </p>
              <p>Review: {rating.review}</p>
              <p>User: {rating.user.name}</p>
            </div>
          ))}
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

      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
      />
      <br /><br />
      <input
        type="time"
        value={searchTime}
        onChange={(e) => setSearchTime(e.target.value)}
      />
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
          {booking.status === "APPROVED" && (
            <>
              <br />

             <div>
               {[1, 2, 3, 4, 5].map((star) => (
                 <span
                   key={star}
                   onClick={() => setRating(star)}
                   style={{
                     cursor: "pointer",
                     fontSize: "25px"
                   }}
                 >
                   {star <= rating ? "⭐" : "☆"}
                 </span>
               ))}
             </div>

              <br /><br />

              <input
                placeholder="Review"
                value={review}
                onChange={(e) =>
                  setReview(e.target.value)
                }
              />

              <br /><br />

              <button
                onClick={() =>
                  submitRating(booking.ride.id)
                }
              >
                Submit Rating
              </button>
            </>
          )}

          {(booking.status === "APPROVED" ||
            booking.status === "PENDING") &&
            booking.ride.status !== "COMPLETED" && (
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
          <button onClick={loadAllRatings}>
            Load Ratings
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
          <hr />

          <h3>Ratings</h3>

          {allRatings.map((rating) => (
            <div
              key={rating.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px"
              }}
            >
              <p>Driver: {rating.ride.driver.name}</p>

              <p>User: {rating.user.name}</p>

              <p>
                {"⭐".repeat(rating.rating)}
              </p>

              <p>{rating.review}</p>
            </div>
          ))}
        </>
      )}
    </div>

  );
}

export default App;