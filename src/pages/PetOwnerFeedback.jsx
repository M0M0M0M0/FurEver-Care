import React, { useState, useEffect } from "react"
import PetOwnerHeader from "../components/PetOwnerHeader"
import Footer from "../components/Footer"

const PetOwnerFeedback = ({ userName }) => {
  const [feedbacks, setFeedbacks] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  // Load feedbacks from JSON file
  useEffect(() => {
    fetch("/json/feedback.json")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error loading feedbacks:", err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!rating || !comment.trim()) {
      alert("Please provide both rating and comment.")
      return
    }

    const newFeedback = {
      id: feedbacks.length + 1,
      name: userName || "Anonymous",
      rating,
      comment,
    }

    setFeedbacks([...feedbacks, newFeedback])
    setRating(0)
    setComment("")
  }

  return (
    <>
      <PetOwnerHeader userName={userName} />
      <div className="section">
        <div className="container">
          <h1 className="section-title">Feedback</h1>

          {/* Feedback form */}
          <form
            onSubmit={handleSubmit}
            style={{ marginBottom: "40px", maxWidth: "600px" }}
          >
            <div className="form-group">
              <label>Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              >
                <option value="">Select rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div className="form-group">
              <label>Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                required
              />
            </div>

            <button type="submit" className="btn">
              Submit Feedback
            </button>
          </form>

          {/* Feedback list */}
          <div>
            <h2 style={{ marginBottom: "20px" }}>All Feedback</h2>
            {feedbacks.length === 0 ? (
              <p>No feedback yet.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {feedbacks.map((fb) => (
                  <li
                    key={fb.id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "15px",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <strong>{fb.name}</strong> -{" "}
                    {"⭐".repeat(fb.rating) || "No rating"}
                    <p style={{ marginTop: "8px" }}>{fb.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PetOwnerFeedback
