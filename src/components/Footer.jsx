import React from 'react'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import './Footer.css'

const Footer = () => {
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
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#">Veterinary Care</a></li>
              <li><a href="#">Home Care</a></li>
              <li><a href="#">Pet Training</a></li>
              <li><a href="#">Care Consultation</a></li>
              <li><a href="#">Animal Rescue</a></li>
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
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
