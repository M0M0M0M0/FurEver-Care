import React, { useState, useEffect } from 'react';
import PetOwnerHeader from '../components/PetOwnerHeader';
import Footer from '../components/Footer';
import PetProfile from '../components/PetProfile';
import './Home.css';

const Home = ({ userData, userName }) => {
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
        name: 'Royal Canin Dog Food',
        brand: 'Royal Canin',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
        price: 520000,
        originalPrice: 620000,
        rating: 5.0,
        isSale: true,
        description: 'Premium nutrition for adult dogs, rich in protein and vitamins'
      },
      {
        id: 2,
        name: 'Tidy Cats Cat Litter',
        brand: 'Tidy Cats',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop',
        price: 102000,
        originalPrice: 112000,
        rating: 4.0,
        isSale: true,
        description: 'Effective odor control litter, easy to clean and environmentally friendly'
      },
      {
        id: 3,
        name: 'Kong Dog Toy Set',
        brand: 'Kong',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
        price: 220000,
        originalPrice: 257000,
        rating: 5.0,
        isSale: true,
        description: 'Interactive toys that stimulate intelligence and reduce stress for dogs'
      },
      {
        id: 4,
        name: 'Catit Cat Scratching Post',
        brand: 'Catit',
        image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop',
        price: 130000,
        originalPrice: 150000,
        rating: 4.5,
        isSale: true,
        description: 'Durable scratching post for cats, helps nail trimming and stress relief'
      }
    ],
    newArrivals: [
      {
        id: 5,
        name: 'Pet Carrier Bag',
        brand: 'PetSafe',
        image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=300&fit=crop',
        price: 650000,
        originalPrice: null,
        rating: 4.5,
        isSale: false,
        description: 'Safe and comfortable carrier bag for pets during travel'
      },
      {
        id: 6,
        name: 'Dog Training Treats',
        brand: 'Pedigree',
        image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop',
        price: 97000,
        originalPrice: null,
        rating: 4.0,
        isSale: false,
        description: 'Nutritious treats for dog training, rich in protein'
      }
    ],
    bestSellers: [
      {
        id: 7,
        name: 'Professional Grooming Kit',
        brand: 'Furminator',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
        price: 399000,
        originalPrice: null,
        rating: 4.8,
        isSale: false,
        description: 'Professional grooming tools for dogs and cats'
      }
    ]
  };

  const specialProducts = [
    {
      id: 8,
      name: 'Premium Pet Bed',
      brand: 'PetSafe',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
      price: 520000,
      originalPrice: 620000,
      rating: 5.0,
      isSale: true,
      description: 'Ultra-comfortable pet bed with memory foam. Perfect for dogs and cats of all sizes. Features removable cover, machine washable and non-slip base.',
      features: [
        'Premium memory foam mattress',
        'Removable cover',
        'Machine washable',
        'Non-slip base',
        'Multiple sizes available'
      ]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Nguyen Thi Lan',
      position: 'Golden Retriever Owner',
      content: 'FurEver Care has helped me take perfect care of my dog. High-quality products and very professional consulting service!',
      rating: 5
    },
    {
      id: 2,
      name: 'Tran Van Minh',
      position: 'British Shorthair Cat Owner',
      content: 'Since using FurEver Care services, my cat has become much healthier. The food and accessories are all excellent!',
      rating: 5
    },
    {
      id: 3,
      name: 'Le Thi Huong',
      position: 'Poodle Owner',
      content: 'The veterinary team is very dedicated, 24/7 consultation helps me feel confident in pet care. Fast delivery and careful packaging.',
      rating: 5
    },
    {
      id: 4,
      name: 'Pham Duc Thanh',
      position: 'Persian Cat Owner',
      content: 'Diverse products, reasonable prices and quality beyond expectations. FurEver Care is truly a trusted place for pets!',
      rating: 5
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: '10 Signs Your Pet Needs Immediate Veterinary Care',
      date: 'December 15, 2024',
      author: 'Dr. Nguyen Van An',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Guide to Choosing Age-Appropriate Pet Food',
      date: 'December 12, 2024',
      author: 'MSc. Le Thi Binh',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'How to Care for Pets in Cold Winter',
      date: 'December 10, 2024',
      author: 'Dr. Tran Minh Cuong',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=250&fit=crop'
    }
  ];

  const handleBuyNow = (product) => {
    alert(`Buy Now clicked for ${product.name}`);
  };

  const handleCareAction = (action) => {
    switch(action) {
      case 'feeding':
        alert('Feeding Guide feature will be developed soon!');
        break;
      case 'grooming':
        alert('Grooming Videos feature will be developed soon!');
        break;
      case 'health':
        alert('Health Tips feature will be developed soon!');
        break;
      case 'training':
        alert('Training Tips feature will be developed soon!');
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-page">
      <PetOwnerHeader userName={userName} userData={userData} />
      
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Best Pet Care<br />For Your Family<br />FurEver Care - Where Love Begins! 🐾</h1>
              <div className="hero-images-inline">
                <div className="hero-icon">🐕</div>
                <div className="hero-icon">🐱</div>
                <div className="hero-icon">🐰</div>
              </div>
              <p>Discover the world of professional pet care with high-quality products, expert consulting services and a loving animal community.</p>
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">🍽️</div>
                  <span>High Quality Food - Optimal Nutrition for Your Pet</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏥</div>
                  <span>Medical Care Services - 24/7 Veterinary Consultation</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎉</div>
                  <span>30% Off - Special Offer for New Customers</span>
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
                <h3>New</h3>
                <h2>Pet Care Services</h2>
                <p>Professional pet care center with experienced veterinary team</p>
                <button className="banner-btn">Learn More</button>
              </div>
            </div>
            <div className="banner-card discount">
              <div className="banner-content">
                <h3>Up to 70% Off</h3>
                <h2>Pet Products Sale</h2>
                <p>High-quality food, toys, accessories at the best market prices</p>
                <button className="banner-btn">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home-1 Section */}
      <section className="home-1-section">
        <div className="container">
          <div className="home-1-content">
            <h2>Why Choose FurEver Care?</h2>
            <div className="home-1-features">
              <div className="home-1-feature">
                <div className="feature-icon">🏆</div>
                <h3>Top Quality</h3>
                <p>Products are strictly tested, ensuring absolute safety for your pets</p>
              </div>
              <div className="home-1-feature">
                <div className="feature-icon">👨‍⚕️</div>
                <h3>Expert Team</h3>
                <p>Experienced veterinarians, 24/7 consultation for all pet health issues</p>
              </div>
              <div className="home-1-feature">
                <div className="feature-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Free delivery within the city, ensuring fresh products reach you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="trending-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <div className="product-tabs">
              <button 
                className={`tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </button>
              <button 
                className={`tab-btn ${activeTab === 'newArrivals' ? 'active' : ''}`}
                onClick={() => setActiveTab('newArrivals')}
              >
                New Arrivals
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bestSellers' ? 'active' : ''}`}
                onClick={() => setActiveTab('bestSellers')}
              >
                Best Sellers
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
                    <span className="rating-text">Rated <strong>{product.rating}</strong>/5 stars</span>
                  </div>
                  <h3 className="product-brand">{product.brand}</h3>
                  <div className="product-actions-row">
                    <button className="action-btn-small wishlist">Wishlist</button>
                    <button className="action-btn-small compare">Compare</button>
                    <button className="action-btn-small quick-view">Quick View</button>
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
                    Add to Cart
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
            <h2>Big Pet Products Sale</h2>
            <p>Save Up to 30% on All Products</p>
            <button className="sale-btn">Buy Now</button>
          </div>
        </div>
      </section>

      {/* Special Products Section */}
      <section className="special-products">
        <div className="container">
          <div className="section-header">
            <h2>Best Deals This Week!</h2>
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
                    <span className="rating-text">Rated {product.rating}/5 stars</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">{product.price.toLocaleString('vi-VN')}₫</span>
                    <span className="original-price">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="quick-view-btn">Quick View</button>
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
            <h2>What Our Customers Say!</h2>
            <p>Genuine feedback from customers who trust FurEver Care</p>
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
            <h2>Most Featured Products</h2>
            <p>Most loved products from our customers</p>
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
                    <span className="rating-text">Rated {product.rating}/5 stars</span>
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
                    Add to Cart
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
            <h2>Latest News</h2>
            <p>Stay updated with useful pet care information</p>
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
                    <span>Posted on {article.date}</span>
                    <span>Author: {article.author}</span>
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

export default Home;