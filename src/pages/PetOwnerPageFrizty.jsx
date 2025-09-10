import React, { useState, useEffect } from 'react';
import PetOwnerHeader from '../components/PetOwnerHeader';
import Footer from '../components/Footer';
import PetProfile from '../components/PetProfile';
import './PetOwnerPageFrizty.css';

const PetOwnerPageFrizty = ({ userData, userName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Ho Chi Minh City, Vietnam');
  const [showPetProfile, setShowPetProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample pet products data
  const petProducts = {
    featured: [
      {
        id: 1,
        name: 'Thức Ăn Chó Royal Canin',
        brand: 'Royal Canin',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
        price: 520000,
        originalPrice: 620000,
        rating: 5.0,
        isSale: true,
        description: 'Thức ăn dinh dưỡng cao cấp cho chó trưởng thành, giàu protein và vitamin'
      },
      {
        id: 2,
        name: 'Cát Vệ Sinh Mèo Tidy Cats',
        brand: 'Tidy Cats',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop',
        price: 102000,
        originalPrice: 112000,
        rating: 4.0,
        isSale: true,
        description: 'Cát vệ sinh khử mùi hiệu quả, dễ dàng vệ sinh và thân thiện môi trường'
      },
      {
        id: 3,
        name: 'Bộ Đồ Chơi Chó Kong',
        brand: 'Kong',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
        price: 220000,
        originalPrice: 257000,
        rating: 5.0,
        isSale: true,
        description: 'Đồ chơi tương tác giúp kích thích trí tuệ và giảm stress cho chó'
      },
      {
        id: 4,
        name: 'Cột Cào Mèo Catit',
        brand: 'Catit',
        image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop',
        price: 130000,
        originalPrice: 150000,
        rating: 4.5,
        isSale: true,
        description: 'Cột cào bền chắc cho mèo, giúp mài móng và giải tỏa căng thẳng'
      }
    ],
    newArrivals: [
      {
        id: 5,
        name: 'Túi Vận Chuyển Thú Cưng',
        brand: 'PetSafe',
        image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop',
        price: 650000,
        originalPrice: null,
        rating: 4.5,
        isSale: false,
        description: 'Túi vận chuyển an toàn và thoải mái cho thú cưng khi di chuyển'
      },
      {
        id: 6,
        name: 'Bánh Thưởng Huấn Luyện Chó',
        brand: 'Pedigree',
        image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop',
        price: 97000,
        originalPrice: null,
        rating: 4.0,
        isSale: false,
        description: 'Bánh thưởng dinh dưỡng cho việc huấn luyện chó, giàu protein'
      }
    ],
    bestSellers: [
      {
        id: 7,
        name: 'Bộ Dụng Cụ Chải Lông',
        brand: 'Furminator',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
        price: 399000,
        originalPrice: null,
        rating: 4.8,
        isSale: false,
        description: 'Bộ dụng cụ chải lông chuyên nghiệp cho chó và mèo'
      }
    ]
  };

  const specialProducts = [
    {
      id: 8,
      name: 'Giường Thú Cưng Cao Cấp',
      brand: 'PetSafe',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
      price: 520000,
      originalPrice: 620000,
      rating: 5.0,
      isSale: true,
      description: 'Giường thú cưng siêu thoải mái với đệm memory foam. Hoàn hảo cho chó và mèo mọi kích cỡ. Có vỏ bọc tháo rời, giặt máy được và đế chống trượt.',
      features: [
        'Đệm memory foam cao cấp',
        'Vỏ bọc tháo rời',
        'Giặt máy được',
        'Đế chống trượt',
        'Nhiều kích cỡ khác nhau'
      ]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Thị Lan',
      position: 'Chủ Nuôi Chó Golden Retriever',
      content: 'FurEver Care đã giúp tôi chăm sóc chú chó của mình một cách hoàn hảo. Sản phẩm chất lượng cao và dịch vụ tư vấn rất chuyên nghiệp!',
      rating: 5
    },
    {
      id: 2,
      name: 'Trần Văn Minh',
      position: 'Chủ Nuôi Mèo Anh Lông Ngắn',
      content: 'Từ khi sử dụng dịch vụ của FurEver Care, mèo nhà tôi khỏe mạnh hơn rất nhiều. Thức ăn và phụ kiện đều rất tốt!',
      rating: 5
    },
    {
      id: 3,
      name: 'Lê Thị Hương',
      position: 'Chủ Nuôi Chó Poodle',
      content: 'Đội ngũ bác sĩ thú y rất tận tâm, tư vấn 24/7 giúp tôi yên tâm chăm sóc thú cưng. Giao hàng nhanh và đóng gói cẩn thận.',
      rating: 5
    },
    {
      id: 4,
      name: 'Phạm Đức Thành',
      position: 'Chủ Nuôi Mèo Ba Tư',
      content: 'Sản phẩm đa dạng, giá cả hợp lý và chất lượng vượt mong đợi. FurEver Care thực sự là nơi đáng tin cậy cho thú cưng!',
      rating: 5
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: '10 Dấu Hiệu Thú Cưng Cần Đến Bác Sĩ Thú Y Ngay Lập Tức',
      date: '15 Tháng 12, 2024',
      author: 'BS. Nguyễn Văn An',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Hướng Dẫn Chọn Thức Ăn Phù Hợp Cho Từng Độ Tuổi Thú Cưng',
      date: '12 Tháng 12, 2024',
      author: 'ThS. Lê Thị Bình',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'Cách Chăm Sóc Thú Cưng Trong Mùa Đông Lạnh',
      date: '10 Tháng 12, 2024',
      author: 'BS. Trần Minh Cường',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=250&fit=crop'
    }
  ];

  const handleBuyNow = (product) => {
    alert(`Buy Now clicked for ${product.name}`);
  };

  const handleCareAction = (action) => {
    switch(action) {
      case 'feeding':
        alert('Tính năng Feeding Guide sẽ được phát triển sớm!');
        break;
      case 'grooming':
        alert('Tính năng Grooming Videos sẽ được phát triển sớm!');
        break;
      case 'health':
        alert('Tính năng Health Tips sẽ được phát triển sớm!');
        break;
      case 'training':
        alert('Tính năng Training Tips sẽ được phát triển sớm!');
        break;
      default:
        break;
    }
  };

  return (
    <div className="pet-owner-page-frizty">
      <PetOwnerHeader userName={userName} userData={userData} />
      
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Chăm Sóc Thú Cưng<br />Tốt Nhất Cho Gia Đình<br />FurEver Care - Nơi Yêu Thương Bắt Đầu!</h1>
              <div className="hero-images-inline">
                <div className="hero-icon">🐕</div>
                <div className="hero-icon">🐱</div>
                <div className="hero-icon">🐰</div>
              </div>
              <p>Khám phá thế giới chăm sóc thú cưng chuyên nghiệp với các sản phẩm chất lượng cao, dịch vụ tư vấn chuyên môn và cộng đồng yêu thương động vật.</p>
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">🍽️</div>
                  <span>Thức Ăn Chất Lượng Cao - Dinh Dưỡng Tối Ưu Cho Thú Cưng Của Bạn</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏥</div>
                  <span>Dịch Vụ Chăm Sóc Y Tế - Tư Vấn Bác Sĩ Thú Y 24/7</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎉</div>
                  <span>Giảm Giá 30% - Ưu Đãi Đặc Biệt Cho Khách Hàng Mới</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="promo-banners">
        <div className="container">
          <div className="banner-grid">
            <div className="banner-card boarding">
              <div className="banner-content">
                <h3>Mới</h3>
                <h2>Dịch Vụ Chăm Sóc Thú Cưng</h2>
                <p>Trung tâm chăm sóc thú cưng chuyên nghiệp với đội ngũ bác sĩ thú y giàu kinh nghiệm</p>
                <button className="banner-btn">Tìm hiểu thêm</button>
              </div>
            </div>
            <div className="banner-card discount">
              <div className="banner-content">
                <h3>Giảm Đến 70%</h3>
                <h2>Sản Phẩm Thú Cưng Ưu Đãi</h2>
                <p>Thức ăn, đồ chơi, phụ kiện chất lượng cao với giá tốt nhất thị trường</p>
                <button className="banner-btn">Mua ngay</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home-1 Section */}
      <section className="home-1-section">
        <div className="container">
          <div className="home-1-content">
            <h2>Tại Sao Chọn FurEver Care?</h2>
            <div className="home-1-features">
              <div className="home-1-feature">
                <div className="feature-icon">🏆</div>
                <h3>Chất Lượng Hàng Đầu</h3>
                <p>Sản phẩm được kiểm định nghiêm ngặt, đảm bảo an toàn tuyệt đối cho thú cưng của bạn</p>
              </div>
              <div className="home-1-feature">
                <div className="feature-icon">👨‍⚕️</div>
                <h3>Đội Ngũ Chuyên Gia</h3>
                <p>Bác sĩ thú y giàu kinh nghiệm, tư vấn 24/7 cho mọi vấn đề sức khỏe của thú cưng</p>
              </div>
              <div className="home-1-feature">
                <div className="feature-icon">🚚</div>
                <h3>Giao Hàng Nhanh</h3>
                <p>Miễn phí giao hàng trong nội thành, đảm bảo sản phẩm tươi mới đến tay bạn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="trending-products">
        <div className="container">
          <div className="section-header">
            <h2>Sản Phẩm Nổi Bật</h2>
            <div className="product-tabs">
              <button 
                className={`tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
                onClick={() => setActiveTab('featured')}
              >
                Nổi Bật
              </button>
              <button 
                className={`tab-btn ${activeTab === 'newArrivals' ? 'active' : ''}`}
                onClick={() => setActiveTab('newArrivals')}
              >
                Mới Về
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bestSellers' ? 'active' : ''}`}
                onClick={() => setActiveTab('bestSellers')}
              >
                Bán Chạy
              </button>
            </div>
          </div>
          
          <div className="products-grid">
            {petProducts[activeTab].map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isSale && <span className="sale-badge">Sale</span>}
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    <span className="rating-text">Đánh giá <strong>{product.rating}</strong>/5 sao</span>
                  </div>
                  <h3 className="product-brand">{product.brand}</h3>
                  <div className="product-actions-row">
                    <button className="action-btn-small wishlist">Yêu thích</button>
                    <button className="action-btn-small compare">So sánh</button>
                    <button className="action-btn-small quick-view">Xem nhanh</button>
                  </div>
                  <div className="product-price">
                    <span className="current-price">{product.price.toLocaleString('vi-VN')}₫</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleBuyNow(product)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Sale Banner */}
      <section className="big-sale-banner">
        <div className="container">
          <div className="sale-content">
            <h2>Đại Sale Sản Phẩm Thú Cưng</h2>
            <p>Tiết Kiệm Đến 30% Tất Cả Sản Phẩm</p>
            <button className="sale-btn">Mua ngay</button>
          </div>
        </div>
      </section>

      {/* Special Products Section */}
      <section className="special-products">
        <div className="container">
          <div className="section-header">
            <h2>Ưu Đãi Tốt Nhất Tuần Này!</h2>
          </div>
          <div className="special-products-grid">
            {specialProducts.map((product) => (
              <div key={product.id} className="special-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="sale-badge">Sale</span>
                </div>
                <div className="product-details">
                  <h3 className="product-brand">{product.brand}</h3>
                  <h4 className="product-name">{product.name}</h4>
                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-text">Đánh giá {product.rating}/5 sao</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">{product.price.toLocaleString('vi-VN')}₫</span>
                    <span className="original-price">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <button className="add-to-cart-btn">Thêm vào giỏ</button>
                    <button className="quick-view-btn">Xem nhanh</button>
                    <button className="wishlist-btn">♡</button>
                    <button className="compare-btn">⚖</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Khách Hàng Nói Gì Về Chúng Tôi!</h2>
            <p>Những chia sẻ chân thực từ các khách hàng đã tin tưởng FurEver Care</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Featured Products */}
      <section className="best-featured">
        <div className="container">
          <div className="section-header">
            <h2>Sản Phẩm Nổi Bật Nhất</h2>
            <p>Những sản phẩm được yêu thích nhất từ khách hàng</p>
          </div>
          <div className="featured-products-grid">
            {petProducts.featured.slice(0, 2).map((product) => (
              <div key={product.id} className="featured-product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isSale && <span className="sale-badge">Sale</span>}
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-text">Đánh giá {product.rating}/5 sao</span>
                  </div>
                  <h3 className="product-brand">{product.brand}</h3>
                  <h4 className="product-name">{product.name}</h4>
                  <div className="product-price">
                    <span className="current-price">{product.price.toLocaleString('vi-VN')}₫</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleBuyNow(product)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="latest-news">
        <div className="container">
          <div className="section-header">
            <h2>Tin Tức Mới Nhất</h2>
            <p>Cập nhật những thông tin hữu ích về chăm sóc thú cưng</p>
          </div>
          <div className="news-grid">
            {newsArticles.map((article) => (
              <div key={article.id} className="news-card">
                <div className="news-image">
                  <img src={article.image} alt={article.title} />
                  <div className="news-date">
                    <span>{article.date}</span>
                  </div>
                </div>
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <div className="news-meta">
                    <span>Đăng ngày {article.date}</span>
                    <span>Tác giả: {article.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      {showPetProfile && (
        <PetProfile 
          onClose={() => setShowPetProfile(false)}
          userData={userData}
          userName={userName}
        />
      )}
    </div>
  );
};

export default PetOwnerPageFrizty;
