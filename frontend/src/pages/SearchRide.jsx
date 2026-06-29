import { useState } from "react";
import api from "../services/api";

export default function SearchRide() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [rides, setRides] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get(
        `/rides/search?source=${source}&destination=${destination}&travelDate=${travelDate}`
      );

      setRides(response.data);
    } catch (error) {
      console.error(error);
      alert("Search Failed");
    }
  };
  const handleBookRide = async (rideId) => {
    try {
      const userId = localStorage.getItem("userId");

      await api.post("/bookings", {
        userId: Number(userId),
        rideId: Number(rideId),
        seatsBooked: 1,
      });

      alert("Ride Booked Successfully");
    } catch (error) {
      console.error(error);
      alert("Booking Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Search Ride</h1>

      <form onSubmit={handleSearch}>
        <input
          style={{ border: "1px solid black", padding: "10px", width: "300px" }}
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <br />
        <br />

        <input
          style={{ border: "1px solid black", padding: "10px", width: "300px" }}
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <br />
        <br />

        <input
          style={{ border: "1px solid black", padding: "10px", width: "300px" }}
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />

        <br />
        <br />

        <button
          type="submit"
          style={{
            border: "1px solid black",
            padding: "10px 20px",
          }}
        >
          Search
        </button>
      </form>

      <br />

      {rides.map((ride) => (
        <div
          key={ride.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <p>Source: {ride.source}</p>
          <p>Destination: {ride.destination}</p>
          <p>Date: {ride.travelDate}</p>
          <p>Time: {ride.travelTime}</p>
          <p>Seats: {ride.availableSeats}</p>
          <button
            onClick={() => handleBookRide(ride.id)}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            Book Ride
          </button>
        </div>
      ))}
    </div>
  );
}