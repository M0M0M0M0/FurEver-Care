import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import PetOwnerHeader from '../components/PetOwnerHeader'
import Footer from '../components/Footer'
import ScrollingInfoBar from '../components/ScrollingInfoBar'

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
        body {
          padding-top: 0 !important; /* Reset padding-top */
        }
        
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
        
        .contact-form .form-group {
          margin-bottom: 25px;
        }
        
        .contact-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
        }
        
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 15px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }
        
        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #7fb069;
          background: white;
          box-shadow: 0 0 0 3px rgba(127, 176, 105, 0.1);
        }
        
        .contact-form .btn {
          background: linear-gradient(135deg, #7fb069 0%, #2d5016 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 15px 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .contact-form .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(127, 176, 105, 0.3);
        }
        
        .contact-form .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
      
      <ScrollingInfoBar />

      <PetOwnerHeader userName={userName} userData={userData} />

      <div className="section">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          
          {/* About Us Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '50px',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              marginBottom: '20px', 
              color: '#2c3e50',
              fontSize: '2.2rem',
              fontWeight: '700'
            }}>
              About FurEver Care
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#555', 
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto 30px'
            }}>
              At FurEver Care, we believe that every pet deserves the best care and love. 
              Founded in 2020, we have been dedicated to providing comprehensive pet care services, 
              from veterinary consultations to emergency assistance, ensuring your furry friends 
              live happy and healthy lives.
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '30px',
              marginTop: '30px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '10px',
                  color: '#7fb069'
                }}>🏥</div>
                <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>24/7 Emergency Care</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Round-the-clock veterinary emergency services</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '10px',
                  color: '#7fb069'
                }}>👨‍⚕️</div>
                <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Expert Veterinarians</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Licensed professionals with years of experience</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '10px',
                  color: '#7fb069'
                }}>❤️</div>
                <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Compassionate Care</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Treating every pet with love and respect</p>
              </div>
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: '50px', alignItems: 'start' }}>
            {/* Contact Information */}
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e9ecef'
            }}>
              <h2 style={{ 
                marginBottom: '30px', 
                color: '#2c3e50',
                fontSize: '1.8rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>Get in Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#7fb069',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '1.1rem' }}>Email</div>
                    <div style={{ color: '#666', fontSize: '1rem' }}>info@furevercare.com</div>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#7fb069',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '1.1rem' }}>Phone</div>
                    <div style={{ color: '#666', fontSize: '1rem' }}>+84 123 456 789</div>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px',
                  padding: '20px',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#7fb069',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#2c3e50', fontSize: '1.1rem' }}>Address</div>
                    <div style={{ color: '#666', fontSize: '1rem' }}>123 ABC Street, XYZ District, HCM City</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Constrain width so form không quá rộng */}
              <div style={{ 
                width: '100%', 
                maxWidth: 720,
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e9ecef'
              }}>
                <h2 style={{ 
                  marginBottom: '30px', 
                  color: '#2c3e50',
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>Send a Message</h2>
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

                  {/* Subject is hidden for pet-owner to simplify the form */}
                  {userType !== 'pet-owner' && (
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
                  )}

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

        {/* Map section only for pet-owner (like shelter contact) */}
        {userType === 'pet-owner' && (
          <div className="container" style={{ marginTop: 60 }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e9ecef'
            }}>
              <h2 style={{ 
                marginBottom: '20px', 
                color: '#2c3e50',
                fontSize: '1.8rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>Our Location</h2>
              <div style={{ 
                width: '100%', 
                height: 0, 
                paddingBottom: '40%', 
                position: 'relative', 
                borderRadius: '12px', 
                overflow: 'hidden',
                border: '2px solid #e9ecef'
              }}>
                <iframe
                  title="FurEver Care Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4223303356325!2d105.77512981055621!3d21.055787886769366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134554d9b014b83%3A0xbbaae84fc810a855!2zUGjDsm5nIEtow6FtIFRow7ogWSBU4bqhaSBOaMOgIC0gUEVUIEhPTUU!5e0!3m2!1svi!2s!4v1757665306548!5m2!1svi!2s"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        )}
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
