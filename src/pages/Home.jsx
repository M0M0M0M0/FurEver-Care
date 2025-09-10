import React from 'react'
import { Heart, Shield, Users, Star } from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Chào mừng đến với FurEver Care</h1>
          <p>Nơi tình yêu thương dành cho thú cưng được lan tỏa</p>
          <button className="btn">Khám phá ngay</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <h2 className="section-title">Tại sao chọn FurEver Care?</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">
                <Heart size={40} />
              </div>
              <h3>Chăm sóc tận tâm</h3>
              <p>Chúng tôi hiểu rằng thú cưng là thành viên trong gia đình bạn và xứng đáng được chăm sóc tốt nhất.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={40} />
              </div>
              <h3>An toàn tuyệt đối</h3>
              <p>Tất cả sản phẩm và dịch vụ đều được kiểm định chất lượng và an toàn cho thú cưng.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={40} />
              </div>
              <h3>Cộng đồng yêu thương</h3>
              <p>Kết nối với cộng đồng những người yêu thú cưng và chia sẻ kinh nghiệm chăm sóc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Thú cưng được chăm sóc</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Bác sĩ thú y</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Trại cứu hộ</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Tỉnh thành</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
