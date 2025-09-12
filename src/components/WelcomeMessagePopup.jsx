import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import './WelcomeMessagePopup.css'

const WelcomeMessagePopup = ({ userName, userType, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 200)
  }

  const getUserTypeDisplay = (type) => {
    switch (type) {
      case 'pet-owner':
        return 'Pet Owner'
      case 'veterinarian':
        return 'Veterinarian'
      case 'shelter':
        return 'Animal Shelter'
      default:
        return 'User'
    }
  }

  const getWelcomeMessage = (type) => {
    switch (type) {
      case 'pet-owner':
        return "Welcome to your pet's care journey! We're here to help you provide the best care for your furry friends."
      case 'veterinarian':
        return "Welcome to the veterinary community! Thank you for joining us in providing excellent care for pets."
      case 'shelter':
        return "Welcome to our shelter network! Together we can help more animals find their forever homes."
      default:
        return "Welcome to FurEver Care! We're excited to have you join our community."
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'pet-owner':
        return '🐕'
      case 'veterinarian':
        return '🩺'
      case 'shelter':
        return '🏠'
      default:
        return '❤️'
    }
  }

  if (!isVisible) return null

  return (
    <div className="welcome-message-overlay">
      <div className="welcome-message-popup">
        {/* Close Button */}
        <button className="close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        {/* Popup Content */}
        <div className="popup-content">
          {/* Header with Icon */}
          <div className="popup-header">
            <div className="welcome-icon">
              {getIcon(userType)}
            </div>
          </div>

          {/* Welcome Message */}
          <div className="welcome-message">
            <h2 className="welcome-title">
              <span className="welcome-text">Welcome, {userName}! </span>

            </h2>
            <p className="user-type">{getUserTypeDisplay(userType)}</p>
            <p className="welcome-text">
              {getWelcomeMessage(userType)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="popup-actions">
            <button className="explore-btn" onClick={handleClose}>
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeMessagePopup
