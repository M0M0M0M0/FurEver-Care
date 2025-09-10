import React, { useState } from 'react'
import { Heart, User, Mail, Phone, MapPin, Camera, Upload } from 'lucide-react'
import './UserForm.css'

const PetOwnerForm = ({ userName, onComplete }) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: 'abc@gmail.com',
    phone: '0123456789',
    address: '123 ABC Street, District 1, HCMC',
    petName: 'Buddy',
    petType: 'Dog',
    petBreed: 'Golden Retriever',
    petAge: '2 years old',
    petGender: 'Male',
    petDescription: 'A very friendly and energetic dog, loves to play and go for walks.',
    profileImage: null
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.petName) newErrors.petName = 'Pet name is required'
    if (!formData.petType) newErrors.petType = 'Pet type is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete('pet-owner', formData)
    }
  }

  return (
    <div className="user-form-container">
      <div className="form-header">
        <div className="form-icon">
          <Heart size={40} />
        </div>
        <h1>Pet Owner Registration</h1>
        <p>Welcome {userName}! Please complete your information to start your pet care journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        {/* Personal Information */}
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">
                <User size={16} />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={16} />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={16} />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">
                <MapPin size={16} />
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>

        {/* Pet Information */}
        <div className="form-section">
          <h2>Pet Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="petName">
                <Heart size={16} />
                Pet Name *
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
              />
              {errors.petName && <span className="error">{errors.petName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petType">Pet Type *</label>
              <select
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              >
                <option value="">Select pet type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
                <option value="rabbit">Rabbit</option>
                <option value="hamster">Hamster</option>
                <option value="other">Other</option>
              </select>
              {errors.petType && <span className="error">{errors.petType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petBreed">Breed</label>
              <input
                type="text"
                id="petBreed"
                name="petBreed"
                value={formData.petBreed}
                onChange={handleChange}
                placeholder="e.g.: Golden Retriever, Persian..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="petAge">Age</label>
              <input
                type="text"
                id="petAge"
                name="petAge"
                value={formData.petAge}
                onChange={handleChange}
                placeholder="e.g.: 2 years old, 6 months..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="petGender">Gender</label>
              <select
                id="petGender"
                name="petGender"
                value={formData.petGender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="petDescription">Pet Description</label>
              <textarea
                id="petDescription"
                name="petDescription"
                value={formData.petDescription}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your pet's personality, preferences, health condition..."
              />
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="form-section">
          <h2>Profile Image</h2>
          <div className="image-upload">
            <div className="upload-area">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="profileImage" className="upload-label">
                <Upload size={24} />
                <span>Upload pet image</span>
              </label>
              {formData.profileImage && (
                <p className="file-name">{formData.profileImage.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="skip-btn" onClick={() => onComplete('pet-owner', { name: userName, skip: true })}>
            Skip
          </button>
          <button type="submit" className="submit-btn">
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  )
}

export default PetOwnerForm
