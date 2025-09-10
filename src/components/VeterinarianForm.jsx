import React, { useState } from 'react'
import { Stethoscope, User, Mail, Phone, MapPin, Award, Calendar, Upload } from 'lucide-react'
import './UserForm.css'

const VeterinarianForm = ({ userName, onComplete }) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: 'dr.smith@vetclinic.com',
    phone: '0987654321',
    address: '456 XYZ Street, District 3, HCMC',
    licenseNumber: 'VET-2023-001',
    specialization: 'Veterinary Surgery',
    experience: '5 years',
    clinicName: 'ABC Veterinary Clinic',
    clinicAddress: '789 DEF Street, District 7, HCMC',
    workingHours: '8:00 - 17:00 (Monday - Friday)',
    services: ['General Checkup', 'Surgery', 'Vaccination'],
    education: 'Master of Veterinary Medicine - HCMC University of Agriculture and Forestry',
    certifications: 'Advanced Surgery Certificate, Ultrasound Certificate',
    profileImage: null
  })

  const [errors, setErrors] = useState({})

  const serviceOptions = [
    'General Checkup',
    'Surgery',
    'Vaccination',
    'Laboratory Tests',
    'X-ray',
    'Ultrasound',
    'Veterinary Dentistry',
    'Physical Therapy',
    '24/7 Emergency',
    'Nutritional Consultation'
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

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
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
    if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required'
    if (!formData.specialization) newErrors.specialization = 'Specialization is required'
    if (!formData.clinicName) newErrors.clinicName = 'Clinic name is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete('veterinarian', formData)
    }
  }

  return (
    <div className="user-form-container">
      <div className="form-header">
        <div className="form-icon veterinarian">
          <Stethoscope size={40} />
        </div>
        <h1>Veterinarian Registration</h1>
        <p>Welcome {userName}! Please complete your information to join our veterinary network.</p>
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

        {/* Professional Information */}
        <div className="form-section">
          <h2>Professional Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="licenseNumber">
                <Award size={16} />
                License Number *
              </label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
              {errors.licenseNumber && <span className="error">{errors.licenseNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Specialization *</label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <option value="">Select specialization</option>
                <option value="general">General Veterinary</option>
                <option value="surgery">Surgery</option>
                <option value="dermatology">Dermatology</option>
                <option value="cardiology">Cardiology</option>
                <option value="oncology">Oncology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="dentistry">Dentistry</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </select>
              {errors.specialization && <span className="error">{errors.specialization}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience (years)</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                placeholder="Years of experience"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="education">Education</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows="3"
                placeholder="University, degree, certificates..."
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="certifications">Professional Certifications</label>
              <textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                rows="3"
                placeholder="Certificates, courses attended..."
              />
            </div>
          </div>
        </div>

        {/* Clinic Information */}
        <div className="form-section">
          <h2>Clinic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="clinicName">Clinic Name *</label>
              <input
                type="text"
                id="clinicName"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                required
              />
              {errors.clinicName && <span className="error">{errors.clinicName}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="clinicAddress">Clinic Address</label>
              <input
                type="text"
                id="clinicAddress"
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleChange}
                placeholder="Clinic address"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="workingHours">
                <Calendar size={16} />
                Working Hours
              </label>
              <input
                type="text"
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                placeholder="e.g.: Mon-Fri: 8:00-17:00, Sat: 8:00-12:00"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="form-section">
          <h2>Services Provided</h2>
          <div className="services-grid">
            {serviceOptions.map((service) => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                />
                <span className="checkmark"></span>
                {service}
              </label>
            ))}
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
                <span>Upload professional image</span>
              </label>
              {formData.profileImage && (
                <div className="image-preview">
                  <img 
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile Preview"
                    className="preview-image"
                  />
                  <p className="file-name">{formData.profileImage.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="skip-btn" onClick={() => onComplete('veterinarian', { name: userName, skip: true })}>
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

export default VeterinarianForm
