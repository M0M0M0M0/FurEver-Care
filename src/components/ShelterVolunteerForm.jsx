import React, { useState } from 'react'
import { Home, User, Mail, Phone, MapPin, Heart, Users, Calendar, Upload } from 'lucide-react'
import './UserForm.css'

const ShelterVolunteerForm = ({ userName, onComplete }) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: 'volunteer@shelter.org',
    phone: '0369852147',
    address: '321 GHI Street, District 10, HCMC',
    organizationName: 'ABC Animal Rescue Center',
    organizationType: 'Non-profit Organization',
    role: 'Care Volunteer',
    experience: '2 years',
    availability: ['Saturday', 'Sunday'],
    skills: ['Animal Care', 'Basic Training'],
    motivation: 'I love animals and want to help homeless pets.',
    emergencyContact: 'Nguyen Van A',
    emergencyPhone: '0123456789',
    profileImage: null
  })

  const [errors, setErrors] = useState({})

  const availabilityOptions = [
    'Monday',
    'Tuesday', 
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Morning (6:00-12:00)',
    'Afternoon (12:00-18:00)',
    'Evening (18:00-22:00)',
    'Weekends',
    'Flexible'
  ]

  const skillOptions = [
    'Animal Care',
    'Basic Training',
    'Veterinary First Aid',
    'Event Organization',
    'Social Media Management',
    'Photography/Video',
    'Translation',
    'Legal Consultation',
    'Fundraising',
    'Animal Transportation',
    'Shelter Cleaning',
    'Pet Adoption',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
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
    if (!formData.organizationName) newErrors.organizationName = 'Organization name is required'
    if (!formData.role) newErrors.role = 'Role is required'
    if (!formData.motivation) newErrors.motivation = 'Motivation is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete('shelter-volunteer', formData)
    }
  }

  return (
    <div className="user-form-container">
      <div className="form-header">
        <div className="form-icon shelter">
          <Home size={40} />
        </div>
        <h1>Animal Shelter / Rescue Volunteer Registration</h1>
        <p>Welcome {userName}! Thank you for your interest in animal rescue and care.</p>
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

        {/* Organization Information */}
        <div className="form-section">
          <h2>Organization Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="organizationName">Organization Name *</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
              />
              {errors.organizationName && <span className="error">{errors.organizationName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="organizationType">Organization Type</label>
              <select
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
              >
                <option value="">Select organization type</option>
                <option value="shelter">Animal Shelter</option>
                <option value="rescue">Rescue Group</option>
                <option value="foster">Foster Home</option>
                <option value="adoption">Adoption Center</option>
                <option value="clinic">Veterinary Clinic</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role in Organization *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select role</option>
                <option value="volunteer">Volunteer</option>
                <option value="coordinator">Coordinator</option>
                <option value="foster-parent">Foster Parent</option>
                <option value="fundraiser">Fundraiser</option>
                <option value="social-media">Social Media Manager</option>
                <option value="transport">Transportation</option>
                <option value="admin">Administrator</option>
                <option value="other">Other</option>
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience (months)</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                placeholder="Months of experience"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="form-section">
          <h2>
            <Calendar size={20} />
            Available Time
          </h2>
          <div className="checkbox-grid">
            {availabilityOptions.map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.availability.includes(option)}
                  onChange={() => handleArrayChange('availability', option)}
                />
                <span className="checkmark"></span>
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h2>
            <Heart size={20} />
            Skills and Strengths
          </h2>
          <div className="checkbox-grid">
            {skillOptions.map((skill) => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleArrayChange('skills', skill)}
                />
                <span className="checkmark"></span>
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="form-section">
          <h2>Motivation</h2>
          <div className="form-group">
            <label htmlFor="motivation">Why do you want to participate in animal rescue activities? *</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows="5"
              placeholder="Share your motivation and aspirations..."
              required
            />
            {errors.motivation && <span className="error">{errors.motivation}</span>}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="form-section">
          <h2>Emergency Contact</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact Name</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Family member name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyPhone">Emergency Contact Phone</label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder="Phone number"
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
                <span>Upload profile image</span>
              </label>
              {formData.profileImage && (
                <p className="file-name">{formData.profileImage.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="skip-btn" onClick={() => onComplete('shelter-volunteer', { name: userName, skip: true })}>
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

export default ShelterVolunteerForm;
