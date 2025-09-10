import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePopup from './components/WelcomePopup'
import PetOwnerForm from './components/PetOwnerForm'
import VeterinarianForm from './components/VeterinarianForm'
import ShelterVolunteerForm from './components/ShelterVolunteerForm'
import Header from './components/Header'
import Footer from './components/Footer'
import PetOwnerPage from './pages/PetOwnerPage'
import PetCarePage from './pages/PetCarePage'
import VeterinarianDashboard from './pages/VeterinarianDashboard'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import { CartProvider } from './contexts/CartContext'
import './App.css'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [userType, setUserType] = useState(null)
  const [userName, setUserName] = useState('')
  const [userData, setUserData] = useState(null)


  const handleUserTypeSelect = (type, name) => {
    setUserType(type)
    setUserName(name)
    setShowWelcome(false)
  }

  const handleFormComplete = (type, data) => {
    setUserData(data)
    // Here you would typically save the data to a backend
    console.log('User registration completed:', { type, data })
    // For now, we'll just show a success message
    alert('Registration successful! Welcome to FurEver Care!')
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
        {userType === 'shelter-volunteer' && (
          <ShelterVolunteerForm 
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
      <Router basename={import.meta.env.BASE_URL}>
        <div className="App">
          {userType === 'pet-owner' ? (
            <Routes>
              <Route path="/" element={<Home userData={userData || {}} userName={userName || ''} />} />
              <Route path="/pet-care" element={<PetCarePage userData={userData} userName={userName} />} />
              <Route path="/pet-profile" element={<PetOwnerPage userData={userData || {}} userName={userName || ''} />} />
            </Routes>
          ) : userType === 'veterinarian' ? (
            <Routes>
              <Route path="/" element={<VeterinarianDashboard userData={userData || {}} userName={userName || ''} />} />
            </Routes>
          ) : (
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
