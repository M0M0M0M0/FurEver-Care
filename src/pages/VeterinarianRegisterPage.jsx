import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, User, Mail, Phone, MapPin, Award, Calendar, Upload } from 'lucide-react'
import PetOwnerHeader from '../components/PetOwnerHeader'
import Footer from '../components/Footer'
import ScrollingInfoBar from '../components/ScrollingInfoBar'
import '../components/UserForm.css'

const VeterinarianRegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
    clinicName: '',
    clinicAddress: '',
    workingHours: '',
    services: [],
    education: '',
    certifications: '',
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
    
    if (!formData.name) newErrors.name = 'Name is required'
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
      // Save form data to localStorage
      localStorage.setItem('veterinarianRegistrationData', JSON.stringify(formData))
      
      // Show success message
      alert('Registration successful! You will be redirected to the veterinarian dashboard.')
      
      // Navigate to veterinarian dashboard
      navigate('/veterinarian')
    }
  }

  return (
    <div className="veterinarian-register-page">
      <ScrollingInfoBar />
      <PetOwnerHeader />
      
      <div className="user-form-container">
        <div className="form-header">
          <div className="form-icon veterinarian">
            <Stethoscope size={40} />
          </div>
          <h1>Veterinarian Registration</h1>
          <p>Join our veterinary network and provide professional care for pets.</p>
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
                {errors.name && <span className="error">{errors.name}</span>}
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
            <button type="button" className="skip-btn" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Complete Registration
            </button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}

export default VeterinarianRegisterPage
