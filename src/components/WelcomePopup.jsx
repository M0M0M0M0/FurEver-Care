import React, { useState } from 'react'
import { Heart, User, Stethoscope, Home } from 'lucide-react'
import './WelcomePopup.css'

const WelcomePopup = ({ onUserTypeSelect }) => {
  const [selectedType, setSelectedType] = useState('')
  const [userName, setUserName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedType && userName.trim()) {
      onUserTypeSelect(selectedType, userName.trim())
    }
  }

  const userTypes = [
    {
      id: 'pet-owner',
      title: 'Pet Owner',
      description: 'Chủ nuôi thú cưng',
      icon: <Heart size={32} />,
      color: '#FF6B6B'
    },
    {
      id: 'veterinarian',
      title: 'Veterinarian',
      description: 'Bác sĩ thú y',
      icon: <Stethoscope size={32} />,
      color: '#4ECDC4'
    },
    {
      id: 'shelter-volunteer',
      title: 'Animal Shelter / Rescue Volunteer',
      description: 'Tình nguyện viên cứu hộ',
      icon: <Home size={32} />,
      color: '#4CAF50'
    }
  ]

  return (
    <div className="welcome-overlay">
      <div className="welcome-popup">

        {/* Welcome Content */}
        <div className="popup-content">
          <h1 className="welcome-title">Welcome to FurEver Care</h1>
          <p className="welcome-subtitle">Your Trusted Companion for All Things Pet Care</p>
          <p className="welcome-tagline">They Deserve Forever Love</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="welcome-form">
            <div className="form-group">
              <label htmlFor="userName">Enter Your Name:</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nhập tên của bạn"
                required
              />
            </div>

            <div className="form-group">
              <label>Select the user category you belong to:</label>
              <div className="user-type-options">
                {userTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`user-type-option ${selectedType === type.id ? 'selected' : ''}`}
                    onClick={() => setSelectedType(type.id)}
                    style={{ '--accent-color': type.color }}
                  >
                    <div className="option-icon" style={{ backgroundColor: type.color }}>
                      {type.icon}
                    </div>
                    <div className="option-content">
                      <h3>{type.title}</h3>
                      <p>{type.description}</p>
                    </div>
                    <div className="radio-button">
                      <div className={`radio-dot ${selectedType === type.id ? 'active' : ''}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={!selectedType || !userName.trim()}
            >
              Continue
            </button>
          </form>

          {/* Pet Icons at Bottom */}
          <div className="bottom-pets">
            <div className="pet-illustration-bottom">
              <div className="cat">🐱</div>
              <div className="dog">🐶</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePopup
