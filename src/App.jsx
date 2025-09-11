import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import WelcomePopup from './components/WelcomePopup'
import PetOwnerForm from './components/PetOwnerForm'
import VeterinarianForm from './components/VeterinarianForm'
import PetOwnerPage from './pages/PetOwnerPage'
import PetProfilePage from './pages/PetProfilePage'
import PetCarePage from './pages/PetCarePage'
import VeterinarianDashboard from './pages/VeterinarianDashboard'
import PetAdoptionPage from './pages/PetAdoptionPage'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import PetOwnerFeedback from './pages/PetOwnerFeedback'
import BackToTop from './components/BackToTop'
import { CartProvider } from './contexts/CartContext'
import './App.css'

// Main App Component with Router
function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  )
}

// App Content Component that can use hooks
function AppContent() {
  const navigate = useNavigate()
  const [showWelcome, setShowWelcome] = useState(true)
  const [userType, setUserType] = useState(null)
  const [userName, setUserName] = useState('')
  const [userData, setUserData] = useState(null)

  // Scroll to top when userData changes (after form completion)
  useEffect(() => {
    if (userData) {
      // Small delay to ensure navigation is complete
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }
  }, [userData])

  const handleUserTypeSelect = (type, name) => {
    setUserType(type)
    setUserName(name)
    setShowWelcome(false)
    
    // For shelter, set userData immediately since no form is needed
    if (type === 'shelter') {
      setUserData({ name: name, type: 'shelter' })
      // Navigate to home page for shelter
      navigate('/')
    }
  }

  const handleFormComplete = (type, data) => {
    setUserData(data)
    // Here you would typically save the data to a backend
    console.log('User registration completed:', { type, data })
    // Show success message
    alert('Registration successful! Welcome to FurEver Care!')
    // Navigate to home page
    navigate('/')
  }

  const handleBackToWelcome = () => {
    setShowWelcome(true)
    setUserType(null)
    setUserName('')
    setUserData(null)
  }

  // Show welcome popup first
  if (showWelcome) {
    return <WelcomePopup onUserTypeSelect={handleUserTypeSelect} />
  }

  // Show appropriate form based on user type
  if (userType && !userData) {
    return (
      <div className="App">
        {userType === 'pet-owner' && (
          <PetOwnerForm 
            userName={userName} 
            onComplete={handleFormComplete}
            onBack={handleBackToWelcome}
          />
        )}
        {userType === 'veterinarian' && (
          <VeterinarianForm 
            userName={userName} 
            onComplete={handleFormComplete}
            onBack={handleBackToWelcome}
          />
        )}
      </div>
    )
  }

  // Show main application after registration
  return (
    <CartProvider>
      <div className="App">
        {userType === 'pet-owner' ? (
          <Routes>
            <Route path="/" element={<Home userData={userData || {}} userName={userName || ''} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart userData={userData} userName={userName} />} />
            <Route path="/pet-care" element={<PetCarePage userData={userData} userName={userName} />} />
            <Route path="/pet-profile" element={<PetProfilePage userData={userData || {}} userName={userName || ''} />} />
            <Route path="/contact" element={<Contact userType={userType} userData={userData} userName={userName} />}/>
            <Route path="/feedback" element={<PetOwnerFeedback userName={userName || ''} />} />
          </Routes>
        ) : userType === 'veterinarian' ? (
          <Routes>
            <Route path="/" element={<VeterinarianDashboard userData={userData || {}} userName={userName || ''} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart userData={userData} userName={userName} />} />
          </Routes>
        ) : userType === 'shelter' ? (
          <Routes>
            <Route path="/" element={<PetAdoptionPage userData={userData || {}} userName={userName || ''} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart userData={userData} userName={userName} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart userData={userData} userName={userName} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        )}
        <BackToTop />
      </div>
    </CartProvider>
  )
}

export default App
