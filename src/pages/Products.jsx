import React from 'react'

const Products = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Sản phẩm cho thú cưng</h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666', marginBottom: '50px' }}>
          Khám phá các sản phẩm chất lượng cao dành cho thú cưng yêu quý của bạn
        </p>
        <div className="product-grid">
          <div className="product-card">
            <div className="product-image" style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              🍖
            </div>
            <div className="product-info">
              <h3 className="product-title">Thức ăn cho chó</h3>
              <div className="product-price">299.000đ</div>
              <p className="product-description">Thức ăn dinh dưỡng cao cấp cho chó mọi lứa tuổi</p>
              <button className="btn">Thêm vào giỏ</button>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image" style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              🐱
            </div>
            <div className="product-info">
              <h3 className="product-title">Thức ăn cho mèo</h3>
              <div className="product-price">249.000đ</div>
              <p className="product-description">Thức ăn chuyên biệt cho mèo với hương vị thơm ngon</p>
              <button className="btn">Thêm vào giỏ</button>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image" style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              🧸
            </div>
            <div className="product-info">
              <h3 className="product-title">Đồ chơi thú cưng</h3>
              <div className="product-price">89.000đ</div>
              <p className="product-description">Đồ chơi an toàn và thú vị cho thú cưng</p>
              <button className="btn">Thêm vào giỏ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
