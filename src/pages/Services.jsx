import React from 'react'
import { Stethoscope, Home, Heart, Users } from 'lucide-react'

const Services = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Dịch vụ của chúng tôi</h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666', marginBottom: '50px' }}>
          Các dịch vụ chuyên nghiệp dành cho thú cưng và chủ nuôi
        </p>
        <div className="grid grid-2">
          <div className="service-card">
            <div className="service-icon">
              <Stethoscope size={50} />
            </div>
            <h3>Khám chữa bệnh thú y</h3>
            <p>Dịch vụ khám chữa bệnh chuyên nghiệp với đội ngũ bác sĩ thú y giàu kinh nghiệm</p>
            <button className="btn">Đặt lịch</button>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <Home size={50} />
            </div>
            <h3>Chăm sóc tại nhà</h3>
            <p>Dịch vụ chăm sóc thú cưng tại nhà khi bạn bận rộn hoặc đi công tác</p>
            <button className="btn">Đặt dịch vụ</button>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <Heart size={50} />
            </div>
            <h3>Huấn luyện thú cưng</h3>
            <p>Chương trình huấn luyện chuyên nghiệp giúp thú cưng ngoan ngoãn và vâng lời</p>
            <button className="btn">Đăng ký</button>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <Users size={50} />
            </div>
            <h3>Tư vấn chăm sóc</h3>
            <p>Tư vấn miễn phí về cách chăm sóc, dinh dưỡng và sức khỏe cho thú cưng</p>
            <button className="btn">Liên hệ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
