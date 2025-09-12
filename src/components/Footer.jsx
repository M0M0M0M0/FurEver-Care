import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Eye } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const [visitCount, setVisitCount] = useState(0)
  const navigate = useNavigate()

  // Function to handle navigation with scroll to top
  const handleNavigation = (path) => {
    navigate(path)
    
    // Handle anchor links
    if (path.includes('#')) {
      const [route, anchor] = path.split('#')
      setTimeout(() => {
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 300)
    } else {
      // Scroll to top for regular navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  useEffect(() => {
    // Fake visit counter - starts from a random number and increments
    const baseCount = 125847
    const randomIncrement = Math.floor(Math.random() * 50) + 1
    setVisitCount(baseCount + randomIncrement)
    
    // Simulate visits increasing over time
    const interval = setInterval(() => {
      setVisitCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo">
              <Heart className="logo-icon" />
              <span className="logo-text">FurEver Care</span>
            </div>
            <p className="footer-description">
              Where love for pets spreads. 
              We are committed to providing the best care services 
              for your four-legged friends.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleNavigation('/')} className="footer-link-btn">Home</button></li>
              <li><button onClick={() => handleNavigation('/products')} className="footer-link-btn">Products</button></li>
              <li><button onClick={() => handleNavigation('/pet-care')} className="footer-link-btn">Services</button></li>
              <li><button onClick={() => handleNavigation('/contact')} className="footer-link-btn">About Us</button></li>
              <li><button onClick={() => handleNavigation('/contact')} className="footer-link-btn">Contact</button></li>
            </ul>
          </div>

          {/* Pages */}
          <div className="footer-section">
            <h3 className="footer-title">Pages</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleNavigation('/veterinarian')} className="footer-link-btn">Veterinary</button></li>
              <li><button onClick={() => handleNavigation('/')} className="footer-link-btn">Pet Owner</button></li>
              <li><button onClick={() => handleNavigation('/pet-care#training-tips')} className="footer-link-btn">Pet Training</button></li>
              <li><button onClick={() => handleNavigation('/pet-care#health-tips')} className="footer-link-btn">Care Consultant</button></li>
              <li><button onClick={() => handleNavigation('/pet-adoption')} className="footer-link-btn">Animal Rescue</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>info@furevercare.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+84 123 456 789</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 ABC Street, XYZ District, HCMC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 FurEver Care. All rights reserved.</p>
            <div className="footer-bottom-links">
              <button onClick={() => handleNavigation('/contact')} className="footer-link-btn">Privacy Policy</button>
              <button onClick={() => handleNavigation('/contact')} className="footer-link-btn">Terms of Service</button>
              <button onClick={() => handleNavigation('/contact')} className="footer-link-btn">Cookie Policy</button>
            </div>
          </div>
          <div className="visit-counter">
            <Eye size={16} />
            <span>Total Visits: {formatNumber(visitCount)}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
