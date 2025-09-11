import React, { useState, useEffect } from 'react';
import PetOwnerHeader from '../components/PetOwnerHeader';
import Footer from '../components/Footer';
import PetProfile from '../components/PetProfile';
import './PetOwnerPage.css';

const PetOwnerPage = ({ userData, userName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Ho Chi Minh City, Vietnam');
  const [showPetProfile, setShowPetProfile] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Emergency contacts data
  const emergencyContacts = [
    { name: 'Pet Emergency Hotline', number: '1900-1234', type: '24/7 Emergency' },
    { name: 'Vet Clinic Central', number: '028-1234-5678', type: 'Emergency Care' },
    { name: 'Animal Poison Control', number: '1900-5678', type: 'Poison Emergency' },
    { name: 'Pet Ambulance', number: '1900-9999', type: 'Transport Service' }
  ];

  // Sample pet products data
  const petProducts = [
    {
      id: 1,
      name: 'Premium Dog Food',
      image: './images/dog-food.jpg',
      description: 'High-quality nutrition for adult dogs',
      price: '$29.99',
      category: 'Dog Food'
    },
    {
      id: 2,
      name: 'Cat Litter Box',
      image: './images/cat-litter.jpg',
      description: 'Odor control and easy cleaning',
      price: '$19.99',
      category: 'Cat Accessories'
    },
    {
      id: 3,
      name: 'Dog Toys Set',
      image: './images/dog-toys.jpg',
      description: 'Interactive toys for mental stimulation',
      price: '$24.99',
      category: 'Toys'
    },
    {
      id: 4,
      name: 'Pet Grooming Kit',
      image: './images/grooming-kit.jpg',
      description: 'Complete grooming essentials',
      price: '$34.99',
      category: 'Grooming'
    },
    {
      id: 5,
      name: 'Pet Bed',
      image: './images/pet-bed.jpg',
      description: 'Comfortable orthopedic pet bed',
      price: '$49.99',
      category: 'Bedding'
    },
    {
      id: 6,
      name: 'Health Supplements',
      image: './images/supplements.jpg',
      description: 'Vitamins and minerals for pets',
      price: '$15.99',
      category: 'Health'
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
    <div className="pet-owner-page">
      <PetOwnerHeader userName={userName} userData={userData} />
      
      {/* Scrolling Ticker */}
      <div className="scrolling-ticker">
        <div className="ticker-content">
          <span className="ticker-item">📍 {location}</span>
          <span className="ticker-item">🕐 {currentTime.toLocaleTimeString()}</span>
          <span className="ticker-item">📅 {currentTime.toLocaleDateString()}</span>
          <span className="ticker-item">🐾 New pet products available!</span>
          <span className="ticker-item">🏥 Emergency vet services: 1900-1234</span>
        </div>
      </div>

      <main className="main-content">
        {/* About Us Section */}
        <section className="about-section">
          <div className="pet-owner-container">
            <h2>About Us</h2>
            <div className="about-content">
              <div className="about-text">
                <h3>About the Team</h3>
                <p>Our dedicated team of pet care professionals is committed to providing the best resources and support for pet owners. We understand the unique bond between pets and their families, and we're here to help you give your furry friends the care they deserve.</p>
                <p>With years of experience in veterinary care, pet nutrition, and animal behavior, our team brings expertise and passion to everything we do.</p>
              </div>
              <div className="about-image">
                <img src="./images/team-photo.jpg" alt="Our Team" />
              </div>
            </div>
          </div>
        </section>

        {/* Pet Care Sections */}
        <section className="pet-care-section">
          <div className="pet-owner-container">
            <h2>Pet Care Sections</h2>
            <div className="care-grid">
              <div className="care-card">
                <div className="care-icon">🐕</div>
                <h3>Pet Profile</h3>
                <p>Create and manage your pet's profile with health records, preferences, and care history.</p>
                <button className="care-btn" onClick={() => setShowPetProfile(true)}>Manage Profile</button>
              </div>
              <div className="care-card">
                <div className="care-icon">🍽️</div>
                <h3>Feeding Guide</h3>
                <p>Get personalized feeding recommendations based on your pet's age, breed, and health needs.</p>
                <button className="care-btn" onClick={() => handleCareAction('feeding')}>View Guide</button>
              </div>
              <div className="care-card">
                <div className="care-icon">🛁</div>
                <h3>Grooming Videos</h3>
                <p>Learn proper grooming techniques with step-by-step video tutorials from experts.</p>
                <button className="care-btn" onClick={() => handleCareAction('grooming')}>Watch Videos</button>
              </div>
              <div className="care-card">
                <div className="care-icon">💊</div>
                <h3>Health Tips</h3>
                <p>Stay informed with the latest health tips and preventive care advice for your pets.</p>
                <button className="care-btn" onClick={() => handleCareAction('health')}>Read Tips</button>
              </div>
              <div className="care-card">
                <div className="care-icon">🎾</div>
                <h3>Training Tips</h3>
                <p>Effective training methods and behavioral guidance to help your pet thrive.</p>
                <button className="care-btn" onClick={() => handleCareAction('training')}>Learn More</button>
              </div>
            </div>
          </div>
        </section>

        {/* Pet Product Showcase */}
        <section className="products-section">
          <div className="pet-owner-container">
            <h2>Pet Product Showcase</h2>
            <div className="products-grid">
              {petProducts.map(product => (
                <div key={product.id} className="pet-owner-product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">{product.price}</p>
                    <button 
                      className="buy-now-btn"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency and Vet Help */}
        <section className="emergency-section">
          <div className="pet-owner-container">
            <h2>Emergency and Vet Help</h2>
            <div className="emergency-content">
              <div className="emergency-info">
                <h3>Emergency Contact Numbers</h3>
                <p>Keep these numbers handy for pet emergencies. Our 24/7 emergency services are always available.</p>
              </div>
              <div className="emergency-table">
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Phone Number</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emergencyContacts.map((contact, index) => (
                      <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.number}</td>
                        <td>{contact.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Page */}
        <section className="feedback-section">
          <div className="pet-owner-container">
            <h2>Feedback Page</h2>
            <div className="feedback-content">
              <div className="feedback-form">
                <h3>Share Your Experience</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea id="feedback" name="feedback" rows="5" required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Submit Feedback</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="contact-section">
          <div className="pet-owner-container">
            <h2>Contact Us</h2>
            <div className="contact-content">
              <div className="contact-info">
                <h3>Static Team Contact Information</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <strong>Phone:</strong> +84 28 1234 5678
                  </div>
                  <div className="contact-item">
                    <strong>Email:</strong> info@furevercare.com
                  </div>
                  <div className="contact-item">
                    <strong>Address:</strong> 123 Pet Care Street, District 1, Ho Chi Minh City
                  </div>
                  <div className="contact-item">
                    <strong>Hours:</strong> Monday - Friday: 8:00 AM - 6:00 PM
                  </div>
                </div>
              </div>
              <div className="real-time-info">
                <h3>Real-time Information</h3>
                <div className="time-location">
                  <div className="info-card">
                    <h4>Current Time</h4>
                    <p className="time-display">{currentTime.toLocaleTimeString()}</p>
                  </div>
                  <div className="info-card">
                    <h4>Current Date</h4>
                    <p className="date-display">{currentTime.toLocaleDateString()}</p>
                  </div>
                  <div className="info-card">
                    <h4>Location</h4>
                    <p className="location-display">{location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Pet Profile Modal */}
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

export default PetOwnerPage;
