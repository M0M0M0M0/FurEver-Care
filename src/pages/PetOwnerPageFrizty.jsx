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
        name: 'Premium Dog Food',
        brand: 'Mars Petcare Inc',
        image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Dog+Food',
        price: 520.00,
        originalPrice: 620.00,
        rating: 5.0,
        isSale: true,
        description: 'High-quality nutrition for adult dogs'
      },
      {
        id: 2,
        name: 'Cat Litter Premium',
        brand: 'Nestle Purina Petcare',
        image: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=Cat+Litter',
        price: 102.00,
        originalPrice: 112.00,
        rating: 4.0,
        isSale: true,
        description: 'Odor control and easy cleaning'
      },
      {
        id: 3,
        name: 'Dog Toys Set',
        brand: "Hill's Pet Nutrition",
        image: 'https://via.placeholder.com/300x300/4facfe/ffffff?text=Dog+Toys',
        price: 220.00,
        originalPrice: 257.00,
        rating: 5.0,
        isSale: true,
        description: 'Interactive toys for mental stimulation'
      },
      {
        id: 4,
        name: 'Cat Scratching Post',
        brand: 'Diamond Pet Foods',
        image: 'https://via.placeholder.com/300x300/43e97b/ffffff?text=Scratch+Post',
        price: 130.00,
        originalPrice: 150.00,
        rating: 2.0,
        isSale: true,
        description: 'Durable scratching post for cats'
      }
    ],
    newArrivals: [
      {
        id: 5,
        name: 'Pet Carrier Bag',
        brand: 'Natural Balance Pet Foods',
        image: 'https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Carrier',
        price: 65.00,
        originalPrice: null,
        rating: 3.0,
        isSale: false,
        description: 'Comfortable pet carrier for travel'
      },
      {
        id: 6,
        name: 'Dog Training Treats',
        brand: 'Pedigree Petfoods',
        image: 'https://via.placeholder.com/300x300/4ecdc4/ffffff?text=Treats',
        price: 97.00,
        originalPrice: null,
        rating: 4.0,
        isSale: false,
        description: 'Healthy training treats for dogs'
      }
    ],
    bestSellers: [
      {
        id: 7,
        name: 'Pet Grooming Kit',
        brand: 'J M Smucker',
        image: 'https://via.placeholder.com/300x300/45b7d1/ffffff?text=Grooming',
        price: 399.00,
        originalPrice: null,
        rating: 4.0,
        isSale: false,
        description: 'Complete grooming kit for pets'
      }
    ]
  };

  const specialProducts = [
    {
      id: 8,
      name: 'Premium Pet Bed',
      brand: 'Mars Petcare Inc',
      image: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Pet+Bed',
      price: 520.00,
      originalPrice: 620.00,
      rating: 5.0,
      isSale: true,
      description: 'Ultra-comfortable pet bed with memory foam. Perfect for dogs and cats of all sizes. Features removable, machine-washable cover and non-slip bottom.',
      features: [
        'Memory foam mattress',
        'Removable cover',
        'Machine washable',
        'Non-slip bottom',
        'Available in multiple sizes'
      ]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Len Rosy Jacbos',
      position: 'CEO At Kidico',
      content: 'Perfect Themes and the best of all that you have many module options to choose! Best Supporting team ever!',
      rating: 5
    },
    {
      id: 2,
      name: 'Rosy S Natalie',
      position: 'Customer',
      content: 'It has survived not only five Lorem Ipsum is simply dummy text of tled it tes pec centuries Satisfied customer.',
      rating: 4
    },
    {
      id: 3,
      name: 'John Kennedy',
      position: 'Customer',
      content: "I'm one of those custom satisfied, Satisfied customer is the best source of advertise ment It has survived.",
      rating: 5
    },
    {
      id: 4,
      name: 'Jacbos Len Rosy',
      position: 'Certified Buyer',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.',
      rating: 4
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'Reprehenderit qui in ea voluptate velit esse',
      date: '22 Jan, 2021',
      author: 'Alex Sam Martine',
      image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=News+1'
    },
    {
      id: 2,
      title: 'Velillum qui dolorem eum fugiat voluptas',
      date: '18 Jan, 2021',
      author: 'Alex Sam Martine',
      image: 'https://via.placeholder.com/400x250/f093fb/ffffff?text=News+2'
    },
    {
      id: 3,
      title: 'Perspiciatis undeomnis iste natus error siter',
      date: '10 Jan, 2021',
      author: 'Alex Sam Martine',
      image: 'https://via.placeholder.com/400x250/4facfe/ffffff?text=News+3'
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
              <h1>We make pets Happy!<br />We Provide Best Food<br />For Your Pet Shop Now!</h1>
              <div className="hero-images-inline">
                <img src="https://via.placeholder.com/100x100/667eea/ffffff?text=Pet+1" alt="Pet 1" />
                <img src="https://via.placeholder.com/100x100/f093fb/ffffff?text=Pet+2" alt="Pet 2" />
                <img src="https://via.placeholder.com/100x100/4facfe/ffffff?text=Pet+3" alt="Pet 3" />
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="hero-features">
                <div className="feature-item">
                  <img src="https://via.placeholder.com/80x80/ff6b6b/ffffff?text=Food" alt="Food" />
                  <span>The Right Diet For Your Pet. Shop now! For online order</span>
                </div>
                <div className="feature-item">
                  <img src="https://via.placeholder.com/80x80/4facfe/ffffff?text=Care" alt="Care" />
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                </div>
                <div className="feature-item">
                  <img src="https://via.placeholder.com/80x80/43e97b/ffffff?text=Sale" alt="Sale" />
                  <span>30% Off</span>
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
                <h2>Pet Boarding & Daycare</h2>
                <p>Lorem ipsum dolor sit dolor sit amet, consectetur anas</p>
                <button className="banner-btn">Shop now</button>
              </div>
            </div>
            <div className="banner-card discount">
              <div className="banner-content">
                <h3>Up To 70% Off</h3>
                <h2>Discount Pet Products</h2>
                <p>Lorem ipsum dolor sit dolor sit amet, consectetur anas</p>
                <button className="banner-btn">shop now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home-1 Section */}
      <section className="home-1-section">
        <div className="container">
          <div className="home-1-content">
            <h2>Home-1</h2>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="trending-products">
        <div className="container">
          <div className="section-header">
            <h2>Trending Products</h2>
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
                    <span className="rating-text">Rated <strong>{product.rating}</strong> out of 5</span>
                  </div>
                  <h3 className="product-brand">{product.brand}</h3>
                  <div className="product-actions-row">
                    <button className="action-btn-small wishlist">Add to wishlist</button>
                    <button className="action-btn-small compare">Compare</button>
                    <button className="action-btn-small quick-view">Quick View</button>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleBuyNow(product)}
                  >
                    Add to cart
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
            <h2>Big Sale Pets All Product</h2>
            <p>Save Up To 30% All Product</p>
            <button className="sale-btn">shop now</button>
          </div>
        </div>
      </section>

      {/* Special Products Section */}
      <section className="special-products">
        <div className="container">
          <div className="section-header">
            <h2>Best Deals Of The Week!</h2>
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
                    <span className="rating-text">Rated {product.rating} out of 5</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <button className="add-to-cart-btn">Add to cart</button>
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
            <h2>What Our Clients Say!</h2>
            <p>Lorem Ipsum is simply dummy text of the printing</p>
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
            <h2>Best Featured Products</h2>
            <p>Lorem Ipsum is simply dummy text of the printing</p>
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
                    <span className="rating-text">Rated {product.rating} out of 5</span>
                  </div>
                  <h3 className="product-brand">{product.brand}</h3>
                  <h4 className="product-name">{product.name}</h4>
                  <div className="product-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleBuyNow(product)}
                  >
                    Add to cart
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
            <h2>Read Our Latest News</h2>
            <p>Lorem Ipsum is simply dummy text of the printing</p>
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
                    <span>Author {article.author}</span>
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
