import React, { useState } from 'react'
import PetOwnerHeader from '../components/PetOwnerHeader'
import Footer from '../components/Footer'

/**
 * PetOwnerFeedback page — UI only (no backend).
 * Props:
 *  - userName (string) optional, taken from App state when rendering route
 */
const PetOwnerFeedback = ({ userName = '' }) => {
  const [feedbacks, setFeedbacks] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !comment.trim()) {
      alert('Please provide both rating and comment.')
      return
    }

    const newFeedback = {
      id: Date.now(),
      name: userName || 'Anonymous',
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString()
    }

    setFeedbacks([newFeedback, ...feedbacks])
    setRating(0)
    setComment('')
  }

  return (
    <>
      {/* Pet owner header (keeps layout consistent with other pet-owner pages) */}
      <PetOwnerHeader userName={userName} userData={null} />

      {/* Main section uses the same container/section pattern as Contact.jsx */}
      <div className="section">
        <div className="container">
          <h1 className="section-title">Pet Owner Feedback</h1>

          <div className="grid" style={{ gap: '30px' }}>
            {/* Feedback form (left) */}
            <div style={{ maxWidth: 720 }}>
              <form onSubmit={handleSubmit} className="feedback-form" style={{ marginBottom: '20px' }}>
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Rating *</label>
                  <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{
                          fontSize: '26px',
                          color: star <= rating ? '#fbbf24' : '#d1d5db',
                          userSelect: 'none'
                        }}
                        role="button"
                        aria-label={`Rate ${star} star`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label htmlFor="comment">Comment *</label>
                  <textarea
                    id="comment"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Write your feedback here..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn">Submit Feedback</button>
                </div>
              </form>
            </div>

            {/* Feedback list (right) */}
            <div style={{ flex: 1 }}>
              {feedbacks.length === 0 ? (
                <p>No feedback yet. Be the first to share your experience!</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {feedbacks.map((fb) => (
                    <div
                      key={fb.id}
                      className="feedback-card"
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '12px',
                        background: '#fff'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 600 }}>{fb.name}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{fb.date}</div>
                      </div>

                      <div style={{ color: '#fbbf24', margin: '8px 0' }}>
                        {'★'.repeat(fb.rating) + '☆'.repeat(5 - fb.rating)}
                      </div>

                      <div style={{ marginTop: 4 }}>{fb.comment}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default PetOwnerFeedback
