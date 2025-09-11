import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import PetOwnerHeader from '../components/PetOwnerHeader'
import Footer from '../components/Footer'

/**
 * Contact page with PetOwnerHeader
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
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show success message
    setShowSuccess(true)
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Auto hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }


  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounceIn {
          0% { 
            opacity: 0;
            transform: scale(0.3);
          }
          50% { 
            opacity: 1;
            transform: scale(1.1);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <PetOwnerHeader userName={userName} userData={userData} />

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

                <button 
                  type="submit" 
                  className="btn" 
                  disabled={isSubmitting}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #ffffff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7fb069 0%, #2d5016 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              animation: 'bounceIn 0.6s ease-out'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            
            <h2 style={{
              color: '#333',
              marginBottom: '15px',
              fontSize: '1.8rem',
              fontWeight: '600'
            }}>
              Message Sent Successfully!
            </h2>
            
            <p style={{
              color: '#666',
              marginBottom: '30px',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}>
              Thank you for contacting us! We have received your message and will get back to you within 24 hours.
            </p>
            
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                background: 'linear-gradient(135deg, #7fb069 0%, #2d5016 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 30px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 5px 15px rgba(45, 80, 22, 0.3)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Contact
