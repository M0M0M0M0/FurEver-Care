import React, { useState, useEffect } from "react"
import PetOwnerHeader from "../components/PetOwnerHeader"
import Footer from "../components/Footer"
import ScrollingInfoBar from "../components/ScrollingInfoBar"
import "./PetOwnerFeedback.css"

const PetOwnerFeedback = ({ userName }) => {
  const [feedbacks, setFeedbacks] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [filter, setFilter] = useState("all")
  const [serviceType, setServiceType] = useState("")
  const [email, setEmail] = useState("")

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
      email: email || "",
      rating,
      comment,
      serviceType: serviceType || "General",
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString()
    }

    setFeedbacks([...feedbacks, newFeedback])
    setRating(0)
    setComment("")
    setServiceType("")
    setEmail("")
    setShowSuccess(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleStarClick = (starRating) => {
    setRating(starRating)
  }

  const filteredFeedbacks = feedbacks.filter(fb => {
    if (filter === "all") return true
    if (filter === "5") return fb.rating === 5
    if (filter === "4") return fb.rating === 4
    if (filter === "3") return fb.rating === 3
    if (filter === "2") return fb.rating === 2
    if (filter === "1") return fb.rating === 1
    return true
  })

  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length).toFixed(1)
    : 0

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ))
  }

  return (
    <>
      <ScrollingInfoBar />
    
      <PetOwnerHeader userName={userName} />
      <div className="feedback-page">
        <div className="feedback-container">
          {/* Hero Section */}
          <div className="feedback-hero">
            <h1>Share Your Experience</h1>
            <p>Your feedback helps us improve our services and create better experiences for you and your beloved pets.</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="feedback-success">
              <h3>🎉 Thank you for your feedback!</h3>
              <p>Your review has been submitted successfully.</p>
            </div>
          )}

          {/* Feedback Form */}
          <div className="feedback-form-section">
            <h2>Leave Your Feedback</h2>
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="feedback-form-group">
                <label>Your Rating:</label>
                <div className="feedback-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`feedback-star ${star <= rating ? 'active' : ''}`}
                      onClick={() => handleStarClick(star)}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <p style={{ textAlign: 'center', color: '#7f8c8d', margin: '10px 0 0' }}>
                  {rating === 0 ? 'Click to rate' : 
                   rating === 1 ? 'Poor' :
                   rating === 2 ? 'Fair' :
                   rating === 3 ? 'Good' :
                   rating === 4 ? 'Very Good' : 'Excellent'}
                </p>
              </div>

              <div className="feedback-form-group">
                <label htmlFor="serviceType">Service Type:</label>
                <select
                  id="serviceType"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="">Select service type</option>
                  <option value="Pet Care">Pet Care Services</option>
                  <option value="Pet Products">Pet Products</option>
                  <option value="Veterinary">Veterinary Services</option>
                  <option value="Adoption">Pet Adoption</option>
                  <option value="General">General Experience</option>
                </select>
              </div>

              <div className="feedback-form-group">
                <label htmlFor="email">Email (Optional):</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="feedback-form-group">
                <label htmlFor="comment">Your Feedback:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience..."
                  required
                />
              </div>

              <button type="submit" className="feedback-submit-btn">
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Feedback List */}
          <div className="feedback-list-section">
            <div className="feedback-list-header">
              <h2>Customer Reviews</h2>
              <div className="feedback-stats">
                <div className="feedback-stat">
                  <div className="feedback-stat-number">{feedbacks.length}</div>
                  <div className="feedback-stat-label">Reviews</div>
                </div>
                <div className="feedback-stat">
                  <div className="feedback-stat-number">{averageRating}</div>
                  <div className="feedback-stat-label">Average</div>
                </div>
              </div>
            </div>

            <div className="feedback-filters">
              <button 
                className={`feedback-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Reviews
              </button>
              <button 
                className={`feedback-filter-btn ${filter === '5' ? 'active' : ''}`}
                onClick={() => setFilter('5')}
              >
                ⭐⭐⭐⭐⭐ Excellent
              </button>
              <button 
                className={`feedback-filter-btn ${filter === '4' ? 'active' : ''}`}
                onClick={() => setFilter('4')}
              >
                ⭐⭐⭐⭐ Very Good
              </button>
              <button 
                className={`feedback-filter-btn ${filter === '3' ? 'active' : ''}`}
                onClick={() => setFilter('3')}
              >
                ⭐⭐⭐ Good
              </button>
            </div>

            {filteredFeedbacks.length === 0 ? (
              <div className="feedback-empty">
                <div className="feedback-empty-icon">💬</div>
                <h3>No feedback yet</h3>
                <p>Be the first to share your experience with us!</p>
              </div>
            ) : (
              <div>
                {filteredFeedbacks.map((fb) => (
                  <div key={fb.id} className="feedback-item">
                    <div className="feedback-item-header">
                      <div className="feedback-author">{fb.name}</div>
                      <div className="feedback-date">{fb.date}</div>
                    </div>
                    <div className="feedback-rating-display">
                      {renderStars(fb.rating)}
                    </div>
                    <div className="feedback-comment">{fb.comment}</div>
                    {fb.serviceType && (
                      <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#7f8c8d' }}>
                        Service: {fb.serviceType}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PetOwnerFeedback
