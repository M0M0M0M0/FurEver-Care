import React, { useState, useEffect } from 'react';
import PetOwnerHeader from '../components/PetOwnerHeader';
import Footer from '../components/Footer';
import PetProfile from '../components/PetProfile';
import ScrollingInfoBar from '../components/ScrollingInfoBar';
import { useCart } from '../contexts/CartContext';
import './Home.css';

const Home = ({ userData, userName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Ho Chi Minh City, Vietnam');
  const [showPetProfile, setShowPetProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();

  // Debug logging
  console.log('Home component rendered with:', { userData, userName });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load products from JSON
  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    fetch(`${base}json/pet-products.json`)
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  // Filter products based on active tab
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [];
      switch (activeTab) {
        case 'featured':
          // Use first 6 products for featured
          filtered = products.slice(0, 6);
          break;
        case 'bestSellers':
          filtered = products.filter(product => product.bestSeller).slice(0, 6);
          break;
        default:
          filtered = products.slice(0, 6);
      }
      setFilteredProducts(filtered);
    }
  }, [products, activeTab]);


  const specialProducts = [
    {
      id: 8,
      name: 'Premium Pet Bed',
      brand: 'PetSafe',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
      price: "$52.00",
      originalPrice: "$62.00",
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
    addToCart(product, 1);
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

  try {
    return (
      <div className="home-page">
        <ScrollingInfoBar />
        <PetOwnerHeader userName={userName} userData={userData} />
      
      {/* Hero Banner Section */}
      <section className="home-hero-banner">
        <div className="home-container">
          <div className="home-hero-content">
            <div className="home-hero-text">
              <h1>FurEver Care Where Love Begins! 🐾</h1>
            </div>
          </div>
        </div>
      </section>
      {/* introduce Banner Section */}
      <section className="home-introduce-banners">
        <div className="home-container">
          <div className="home-introduce-content">
            <div className="home-introduce-text">
              <h3>Professional pet care with high-quality products, expert services and a loving community.</h3>
              <div className="home-introduce-features">
                <div className="feature-item">
                  <div className="feature-icon">🍽️</div>
                  <span>Premium Pet Food</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏥</div>
                  <span>Expert Vet Care</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🛍️</div>
                  <span>Quality Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="home-promo-banners">
        <div className="home-container">
          <div className="banner-grid">
            <div className="home-banner-card boarding">
              <div className="home-banner-content">
                <h3>New</h3>
                <h2>Pet Care Services</h2>
                <p>Professional pet care center with experienced veterinary team</p>
                <button className="home-banner-btn">Learn More</button>
              </div>
            </div>
            <div className="home-banner-card discount">
              <div className="home-banner-content">
                <h3>Up to 70% Off</h3>
                <h2>Pet Products Sale</h2>
                <p>High-quality food, toys, accessories at the best market prices</p>
                <button className="home-banner-btn">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose FurEver Care Section */}
      <section className="home-why-choose-section">
        <div className="home-container">
          <div className="home-section-header">
            <h2>Why Choose FurEver Care?</h2>
            <div className="home-why-choose-features">
              <div className="home-why-choose-feature">
                <div className="feature-icon">🏆</div>
                <h3>Premium Quality</h3>
                <p>All products are carefully selected and tested to ensure the highest quality and safety for your pets</p>
              </div>
              <div className="home-why-choose-feature">
                <div className="feature-icon">👨‍⚕️</div>
                <h3>Expert Care</h3>
                <p>Our team of veterinarians and pet care experts provide professional advice and 24/7 support</p>
              </div>
              <div className="home-why-choose-feature">
                <div className="feature-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Quick and reliable delivery service to bring happiness to your pets as soon as possible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="trending-products">
        <div className="home-container">
          <div className="home-section-header">
            <h2>Featured Products</h2>
             <div className="product-tabs">
               <button 
                 className={`tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
                 onClick={() => setActiveTab('featured')}
               >
                 Featured
               </button>
               <button 
                 className={`tab-btn ${activeTab === 'bestSellers' ? 'active' : ''}`}
                 onClick={() => setActiveTab('bestSellers')}
               >
                 Best Sellers
               </button>
             </div>
          </div>
          
           <div className="home-products-grid">
             {filteredProducts.map((product) => (
               <div key={product.id} className="home-product-card">
                 <div className="home-product-image">
                   <img src={product.images[0]} alt={product.name} />
                   {product.isSale && <span className="sale-badge">Sale</span>}
                 </div>
                 <div className="home-product-info">
                   <div className="product-rating">
                     <span className="rating-text">Rated <strong>{product.rating}</strong>/5 stars</span>
                   </div>
                   <h3 className="product-brand">{product.brand}</h3>
                   <div className="home-product-price">
                     <span className="home-current-price">{product.price}</span>
                     {product.originalPrice && product.originalPrice !== product.price && (
                       <span className="original-price">{product.originalPrice}</span>
                     )}
                   </div>
                   <button 
                     className="home-add-to-cart-btn"
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


      {/* Customer Reviews */}
      <section className="home-best-featured">
        <div className="home-container">
          <div className="home-section-header">
            <h2>Customer Reviews</h2>
            <p>What our customers say about our services</p>
          </div>
          
          {/* Testimonials */}
          <div className="testimonials-grid" style={{ marginBottom: '40px' }}>
            {testimonials.slice(0, 3).map((testimonial) => (
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

      {/* Latest News Section */}
      <section className="home-latest-news">
        <div className="home-container">
          <div className="home-section-header">
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
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <div className="home-page">
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Error Loading Page</h1>
          <p>Something went wrong. Please refresh the page.</p>
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }
};

export default Home;