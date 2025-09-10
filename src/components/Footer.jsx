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
              Nơi tình yêu thương dành cho thú cưng được lan tỏa. 
              Chúng tôi cam kết mang đến những dịch vụ chăm sóc tốt nhất 
              cho những người bạn bốn chân của bạn.
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
            <h3 className="footer-title">Liên kết nhanh</h3>
            <ul className="footer-links">
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/products">Sản phẩm</a></li>
              <li><a href="/services">Dịch vụ</a></li>
              <li><a href="/about">Về chúng tôi</a></li>
              <li><a href="/contact">Liên hệ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Dịch vụ</h3>
            <ul className="footer-links">
              <li><a href="#">Khám chữa bệnh thú y</a></li>
              <li><a href="#">Chăm sóc tại nhà</a></li>
              <li><a href="#">Huấn luyện thú cưng</a></li>
              <li><a href="#">Tư vấn chăm sóc</a></li>
              <li><a href="#">Cứu hộ động vật</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Liên hệ</h3>
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
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 FurEver Care. Tất cả quyền được bảo lưu.</p>
            <div className="footer-bottom-links">
              <a href="#">Chính sách bảo mật</a>
              <a href="#">Điều khoản sử dụng</a>
              <a href="#">Chính sách cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
