import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Header from '../components/Header'
import PetOwnerHeader from '../components/PetOwnerHeader'
import Footer from '../components/Footer'

/**
 * Contact page renders a header based on userType:
 * - pet-owner -> PetOwnerHeader
 * - others (or undefined) -> default Header
 *
 * Props:
 *  - userType (string | null)
 *  - userData (object | null)
 *  - userName (string)
 */
const Contact = ({ userType = null, userData = null, userName = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: replace alert with real API submit if needed
    alert('Thank you for contacting us! We will get back to you as soon as possible.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const renderHeader = () => {
    if (userType === 'pet-owner') {
      return <PetOwnerHeader userName={userName} userData={userData} />
    }
    // If you have other header components (veterinarian, shelter), add them here.
    return <Header />
  }

  return (
    <>
      {renderHeader()}

      <div className="section">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <div className="grid grid-2" style={{ gap: '50px', alignItems: 'start' }}>
            {/* Contact Information */}
            <div>
              <h2 style={{ marginBottom: '30px', color: '#333' }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>Email</div>
                    <div style={{ color: '#666' }}>info@furevercare.com</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>Phone</div>
                    <div style={{ color: '#666' }}>+84 123 456 789</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>Address</div>
                    <div style={{ color: '#666' }}>123 ABC Street, XYZ District, HCM City</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 style={{ marginBottom: '30px', color: '#333' }}>Send a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
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
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Contact
