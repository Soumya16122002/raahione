import { useEffect, useState } from "react";
import api from "../services/api";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.get(
        `/bookings/history/${userId}`
      );

      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Booking History</h1>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <p>Source: {booking.ride.source}</p>
          <p>Destination: {booking.ride.destination}</p>
          <p>Status: {booking.status}</p>
          <p>Seats: {booking.seatsBooked}</p>
        </div>
      ))}
    </div>
  );
}