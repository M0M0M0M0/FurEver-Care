import React from 'react';
import { Link } from 'react-router-dom';
import PetOwnerHeader from '../components/PetOwnerHeader';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

export default function Cart({ userData, userName }) {
  console.log('Cart component rendering...');
  
  let cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount;
  
  try {
    const cartContext = useCart();
    cartItems = cartContext.cartItems;
    removeFromCart = cartContext.removeFromCart;
    updateQuantity = cartContext.updateQuantity;
    clearCart = cartContext.clearCart;
    getCartTotal = cartContext.getCartTotal;
    getCartItemsCount = cartContext.getCartItemsCount;
  } catch (error) {
    console.error('Error using cart context:', error);
    return (
      <div>
        <PetOwnerHeader userName={userName} userData={userData} />
        <div style={{ padding: '20px' }}>
          <h1>Cart Error</h1>
          <p>There was an error loading the cart. Please try again.</p>
        </div>
      </div>
    );
  }
  
  console.log('Cart items:', cartItems);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Checkout functionality will be implemented soon!');
  };

  return (
    <div className="cart-page">
      <PetOwnerHeader userName={userName} userData={userData} />
      
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{getCartItemsCount()} item(s) in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="200" height="200" fill="#f8f9fa"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d" font-family="Arial" font-size="14">
                              No Image
                            </text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-description">{item.description}</p>
                    <div className="item-price">${item.price}</div>
                  </div>
                  
                  <div className="item-quantity">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-total">
                    <div className="total-price">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-header">
                <h3>Order Summary</h3>
              </div>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Items ({getCartItemsCount()}):</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="cart-actions">
                <button onClick={clearCart} className="clear-cart-btn">
                  Clear Cart
                </button>
                <button onClick={handleCheckout} className="checkout-btn">
                  Proceed to Checkout
                </button>
              </div>
              
              <div className="continue-shopping">
                <Link to="/products">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
