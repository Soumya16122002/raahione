import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Rating() {
  const [rideId, setRideId] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submitRating = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await api.post("/ratings", {
        userId: Number(userId),
        rideId: Number(rideId),
        rating: Number(rating),
        review,
      });

      alert("Rating Submitted");

      setRideId("");
      setRating(5);
      setReview("");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data ||
        "Rating Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen p-6">
        <div className="max-w-3xl mx-auto">

          <div className="bg-white p-8 rounded-3xl shadow">

            <h1 className="text-4xl font-bold mb-6">
              Rate Your Ride
            </h1>

            <div className="space-y-5">

              <input
                type="number"
                placeholder="Ride ID"
                value={rideId}
                onChange={(e) =>
                  setRideId(e.target.value)
                }
                className="w-full border p-3 rounded-xl"
              />

              <select
                value={rating}
                onChange={(e) =>
                  setRating(e.target.value)
                }
                className="w-full border p-3 rounded-xl"
              >
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>

              <textarea
                rows="5"
                placeholder="Write review..."
                value={review}
                onChange={(e) =>
                  setReview(e.target.value)
                }
                className="w-full border p-3 rounded-xl"
              />

              <button
                onClick={submitRating}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                Submit Rating
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}