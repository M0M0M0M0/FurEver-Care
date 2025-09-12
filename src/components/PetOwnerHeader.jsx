import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import RippleButton from './RippleButton'
import RippleLink from './RippleLink'
import RippleAnchor from './RippleAnchor'
import AuthWrapper from './AuthWrapper'
import { useCart } from '../contexts/CartContext'
import './PetOwnerHeader.css'

export default function PetOwnerHeader({ userName, userData }) {
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState([]);
  const searchRef = useRef(null);

  // Load products from JSON file
  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    fetch(`${base}json/pet-products.json`)
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length >= 2) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        handleResultClick(searchResults[0]); // Select first result
      } else if (searchTerm.length >= 2) {
        // Perform search action
        console.log('Searching for:', searchTerm);
        setShowResults(false);
      }
    }
  };

  // Handle search result click
  const handleResultClick = (product) => {
    setSearchTerm(product.name);
    setShowResults(false);
    // Navigate to product page or add to cart
    navigate(`/product/${product.id}`);
  };

  // Handle category navigation
  const handleCategoryClick = (category, event) => {
    // Remove focus from clicked element to prevent stuck hover effect
    if (event && event.target) {
      event.target.blur();
    }
    
    // Check if it's an offers category
    const offersCategories = ['weekly', 'bogo', 'bundles', 'clearance', 'seasonal', 'gift'];
    if (offersCategories.includes(category)) {
      navigate(`/offers?category=${category}`);
    } else {
      navigate(`/products?category=${category}`);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light py-3 position-relative header-navbar">
        <div className="container-fluid">
          <RippleLink className="navbar-brand header-navbar-brand" to="/">
            <img src={`${import.meta.env.BASE_URL || '/'}img/logo/logo.svg`} alt="FurEver Care Logo" height="50" />
          </RippleLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center position-absolute top-50 start-50 translate-middle" id="mainNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <RippleLink className="nav-link header-nav-link" to="/">HOME</RippleLink>
              </li>
              <li className="nav-item dropdown">
                <RippleLink className="nav-link dropdown-toggle header-nav-link" to="/pet-care" id="petCareDropdown">PET CARE</RippleLink>
                <ul className="dropdown-menu header-dropdown-menu">
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/pet-profile'); }}>Pet Profile</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/pet-care#feeding-guide'); }}>Feeding Guide</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/pet-care#grooming-videos'); }}>Grooming Videos</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/pet-care#health-tips'); }}>Health Tips</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); navigate('/pet-care#training-tips'); }}>Training Tips</RippleAnchor></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <RippleLink className="nav-link dropdown-toggle header-nav-link" to="/products" id="productsDropdown">PRODUCTS</RippleLink>
                <ul className="dropdown-menu header-dropdown-menu">
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('dog-food', e); }}>Dog Food</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('cat-food', e); }}>Cat Food</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('toys', e); }}>Toys</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('grooming', e); }}>Grooming Essentials</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('bedding', e); }}>Bedding & Apparel</RippleAnchor></li>
                  <li><RippleAnchor className="dropdown-item header-dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('supplements', e); }}>Health Supplements</RippleAnchor></li>
                </ul>
              </li>
              <li className="nav-item">
                <RippleLink className="nav-link header-nav-link" to="/emergency-vet">EMERGENCY & VET HELP</RippleLink>
              </li>
              <li className="nav-item"><RippleLink className="nav-link header-nav-link" to="/feedback">FEEDBACK</RippleLink></li>
              <li className="nav-item"><RippleLink className="nav-link header-nav-link" to="/contact">CONTACT</RippleLink></li>
            </ul>
          </div>

          <div className="d-flex flex-column align-items-end ms-auto search-cart-container">
            <div className="d-flex align-items-center position-relative" ref={searchRef}>
              <div className="search-container position-relative me-3">
                <input 
                  className="form-control header-form-control" 
                  type="search" 
                  placeholder="Search pet products..." 
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                />
                <RippleButton 
                  className="header-btn search-btn position-absolute" 
                  type="button"
                  onClick={() => {
                    if (searchResults.length > 0) {
                      handleResultClick(searchResults[0]);
                    } else if (searchTerm.length >= 2) {
                      console.log('Searching for:', searchTerm);
                      setShowResults(false);
                    }
                  }}
                >
                  <i className="fas fa-search"></i>
                </RippleButton>
              </div>
              
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="search-result-item"
                      onClick={() => handleResultClick(product)}
                    >
                      <div className="search-result-image">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="image-placeholder"
                          style={{
                            display: 'none',
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '6px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: '#6c757d'
                          }}
                        >
                          {product.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="search-result-info">
                        <div className="search-result-name">{product.name}</div>
                        <div className="search-result-category">{product.category}</div>
                        <div className="search-result-price">{product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results Message */}
              {showResults && searchResults.length === 0 && searchTerm.length >= 2 && (
                <div className="search-results-dropdown">
                  <div className="no-results">No products found</div>
                </div>
              )}
              <RippleLink to="/cart" className="cart-link position-relative">
                <i className="fas fa-shopping-cart" style={{ fontSize: '1.5rem', color: 'rgb(222, 223, 224)' }}></i>
                <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill">
                  {getCartItemsCount()}
                </span>
              </RippleLink>
            </div>
            <div className="user-info">
              <div className="user-name">
                <i className="fas fa-user"></i>
                <span>{userName || 'User'}</span>
              </div>
              <div className="pet-name" onClick={() => {
                navigate('/pet-profile');
              }}>
                <i className="fas fa-paw"></i>
                <span>{userData?.petName || 'Pet'}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
