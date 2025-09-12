import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PetOwnerHeader from '../components/PetOwnerHeader'
import { useCart } from '../contexts/CartContext'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [otherProducts, setOtherProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Fetch product data
    fetch('./json/pet-products.json')
      .then(r => r.json())
      .then(data => {
        const foundProduct = data.products.find(p => p.id === parseInt(id))
        setProduct(foundProduct)
        
        // Get random other products (exclude current product)
        const otherProductsList = data.products
          .filter(p => p.id !== foundProduct.id)
          .sort(() => Math.random() - 0.5) // Shuffle array
          .slice(0, 4) // Get 4 random products
        setOtherProducts(otherProductsList)
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    if (!product) return 0
    return product.price * quantity
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    // Check if quantity is large and show confirmation
    if (quantity > 10) {
      const confirmed = window.confirm(
        `Are you sure you want to buy ${quantity} ${product.name} for a total of $${calculateTotalPrice().toFixed(2)}?`
      )
      if (!confirmed) return
    }
    
    console.log('Buying now:', { product, quantity })
    alert(`Proceeding to checkout with ${quantity} ${product.name} - Total: $${calculateTotalPrice().toFixed(2)}!`)
  }

  if (loading) {
    return (
      <>
        <PetOwnerHeader />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #2d5016 0%, #7fb069 100%)',
          color: 'white',
          fontFamily: 'Playfair Display, serif'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Loading...</h2>
          </div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <PetOwnerHeader />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #2d5016 0%, #7fb069 100%)',
          color: 'white',
          fontFamily: 'Playfair Display, serif'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Product not found</h2>
            <Link to="/products" style={{ color: 'white', textDecoration: 'underline' }}>
              Back to Products
            </Link>
          </div>
        </div>
      </>
    )
  }

  // Generate multiple images for the product (simulating image gallery)
  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
  
  const productImages = [
    product.images && product.images[0] ? product.images[0] : defaultImage,
    product.images && product.images[1] ? product.images[1] : defaultImage,
    product.images && product.images[2] ? product.images[2] : defaultImage,
    product.images && product.images[3] ? product.images[3] : defaultImage
  ]

  return (
    <>
      <PetOwnerHeader />
      <main className="section main layout-section">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-section">
          <Link to="/products" className="back-link">
            <i className="fas fa-arrow-left"></i> {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
          </Link>
        </div>

        {/* Product Detail Section */}
        <div className="product-detail product-detail-container">
          {/* Left Column - Product Images & Info */}
          <div className="product-images-section">
            {/* Main Product Image */}
            <div className="main-image-container">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="main-product-image"
                onError={(e) => {
                  if (e.target.src !== defaultImage) {
                    e.target.src = defaultImage
                  }
                }}
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail-item ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  title={`${product.name} - Image ${index + 1}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="thumbnail-image"
                    onError={(e) => {
                      if (e.target.src !== defaultImage) {
                        e.target.src = defaultImage
                      }
                    }}
                  />
                  <div className="thumbnail-number">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Product Information */}
            <div className="product-information">
              <h3>Product Information</h3>
              
              <div className="info-section">
                <h4>Brand</h4>
                <p>{product.brand}</p>
              </div>

              <div className="info-section">
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>

              <div className="info-section">
                <h4>Flavor</h4>
                <p>{product.flavor}</p>
              </div>

              <div className="info-section">
                <h4>Product Benefits</h4>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <i className="fas fa-heart"></i>
                    <span>High-quality ingredients</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>Safe for pets</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-star"></i>
                    <span>Premium quality</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Veterinarian recommended</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h4>Usage Instructions</h4>
                <ul className="usage-list">
                  <li>Follow feeding guidelines on package</li>
                  <li>Store in cool, dry place</li>
                  <li>Keep out of reach of children</li>
                  <li>Consult veterinarian if needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Purchase */}
          <div className="product-info-section">
            {/* Product Name & Share */}
            <div className="product-header">
              <h1 className="product-title">
                {product.name}
              </h1>
              <button className="share-btn">
                <i className="fas fa-share-alt"></i> Share Link
              </button>
            </div>

            {/* Price Section */}
            <div className="price-section">
              <div className="price-info">
                <div className="unit-price">
                  <span className="price-label">Unit Price:</span>
                  <span className="current-price">${product.price}</span>
                </div>
                <div className="total-price">
                  <span className="price-label">Total Price ({quantity} {quantity === 1 ? 'item' : 'items'}):</span>
                  <span className="total-price-amount">${calculateTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Quantity & Purchase Buttons */}
            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <div className="quantity-display">
                    {quantity}
                  </div>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  BUY NOW
                </button>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>

            {/* Other Products */}
            <div className="buy-more-section">
              <h3>Other Products</h3>
              <div className="combo-products">
                {otherProducts.map((otherProduct) => (
                  <div key={otherProduct.id} className="combo-item">
                    <Link to={`/product/${otherProduct.id}`} className="combo-image-link">
                      <img 
                        src={otherProduct.images && otherProduct.images[0] ? otherProduct.images[0] : defaultImage}
                        alt={otherProduct.name}
                        className="combo-image"
                        onError={(e) => {
                          if (e.target.src !== defaultImage) {
                            e.target.src = defaultImage
                          }
                        }}
                      />
                    </Link>
                    <div className="combo-info">
                      <Link to={`/product/${otherProduct.id}`} className="combo-name-link">
                        <div className="combo-name">{otherProduct.name}</div>
                      </Link>
                      <div className="combo-price">
                        ${otherProduct.price}
                      </div>
                    </div>
                    <Link to={`/product/${otherProduct.id}`}>
                      <button className="combo-buy-btn">Buy</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Quality Info */}
            <div className="info-boxes">
              <div className="delivery-info">
                <i className="fas fa-truck"></i>
                Free shipping on orders over $50
              </div>
              <div className="quality-guarantee">
                <i className="fas fa-question-circle"></i>
                NOT SATISFIED? 30-DAY RETURN POLICY
              </div>
            </div>
          </div>
        </div>                
      </div>
      </main>
    </>
  )
}
