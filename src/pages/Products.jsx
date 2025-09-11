import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PetOwnerHeader from '../components/PetOwnerHeader'
import './Products.css'

const CATEGORIES = ['all', 'dog-food', 'cat-food', 'toys', 'grooming', 'bedding', 'supplements']

export default function Products() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  // Read category from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setCategory(categoryFromUrl)
    }
  }, [searchParams])

  // Update URL when category changes
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    setSearchParams({ category: newCategory })
  }

  useEffect(() => {
    fetch('./json/pet-products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        console.log('Loaded data:', data) // Debug log
        // Handle both array and object with products property
        const productsArray = Array.isArray(data) ? data : (data.products || [])
        console.log('Products array:', productsArray) // Debug log
        setProducts(productsArray)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading products:', error)
        // Set empty array as fallback
        setProducts([])
        setLoading(false)
      })
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product)
    alert(`Added ${product.name} to cart!`)
  }

  // Loading state
  if (loading) {
    return (
      <>
        <PetOwnerHeader />
        <main className="section main layout-section">
          <section className="products-hero">
            <div>
              <h1>Pet Products</h1>
              <p>Loading products...</p>
            </div>
          </section>
          <section className="product-section">
            <div className="container">
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🔄</div>
                <p>Loading products...</p>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <PetOwnerHeader />
      <main className="section main layout-section">
      <section className="products-hero">
        <div>
          <h1>Pet Products</h1>
          <p>High-quality products for your beloved pets</p>
        </div>
      </section>
      
      <section className="product-section">
        <div className="container">
          {/* Search Bar */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filters */}
          <div className="filters home-filters">
            {CATEGORIES.map(c => (
              <button 
                key={c} 
                className={category === c ? 'active' : ''} 
                onClick={() => handleCategoryChange(c)}
              >
                {c.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div id="productGrid" className="product-grid home-product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(p => (
                <div key={p.id} className="product-card home-product-card">
                  <Link to={`/product/${p.id}`} className="product-image-link">
                    <img 
                      src={p.images && p.images[0] ? p.images[0] : './img-pet-product/default.jpg'} 
                      alt={p.name}
                      onError={(e) => {
                        if (e.target.src !== 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==') {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                        }
                      }}
                    />
                  </Link>
                <div className="product-info">
                  <div className="product-content">
                    <Link to={`/product/${p.id}`} className="product-title-link">
                      <h4>{p.name}</h4>
                    </Link>
                    <p className="product-description">{p.description}</p>
                    <div className="product-price">
                      <span className="current-price">${p.price}</span>
                      {p.brand && <span className="product-brand">by {p.brand}</span>}
                    </div>
                  </div>
                  <div className="product-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(p)}
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                  </div>
                </div>
                </div>
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '50px',
                color: '#666'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🐾</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or category filter</p>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                  Debug: {products.length} products loaded
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      </main>
    </>
  )
}
