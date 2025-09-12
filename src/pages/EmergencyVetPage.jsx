import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PetOwnerHeader from '../components/PetOwnerHeader';
import ScrollingInfoBar from '../components/ScrollingInfoBar';
import './EmergencyVetPage.css';

// Move static data outside component to prevent recreation on every render
const veterinaryContacts = [
  {
    id: 1,
    name: "PetCare Veterinary Hospital HCM",
    phone: "028 3822 1234",
    address: "123 Nguyen Hue, District 1, HCMC",
    services: "24/7 Emergency, Surgery, General Care",
    rating: "4.8/5",
    distance: "2.5 km"
  },
  {
    id: 2,
    name: "Happy Pet Veterinary Clinic",
    phone: "028 3845 6789",
    address: "456 Le Loi, District 3, HCMC",
    services: "Emergency, Vaccination, Grooming",
    rating: "4.6/5",
    distance: "3.2 km"
  },
  {
    id: 3,
    name: "PetLife Veterinary Hospital",
    phone: "028 3876 5432",
    address: "789 Dien Bien Phu, Binh Thanh District, HCMC",
    services: "24/7 Emergency, ICU, Specialist Care",
    rating: "4.9/5",
    distance: "4.1 km"
  },
  {
    id: 4,
    name: "Family Pet Veterinary Clinic",
    phone: "028 3811 9876",
    address: "321 Cach Mang Thang 8, District 10, HCMC",
    services: "General Care, Dental, Surgery",
    rating: "4.5/5",
    distance: "5.3 km"
  },
  {
    id: 5,
    name: "PetHealth Veterinary Hospital",
    phone: "028 3855 2468",
    address: "654 Nguyen Van Cu, District 5, HCMC",
    services: "24/7 Emergency, Oncology, Cardiology",
    rating: "4.7/5",
    distance: "6.8 km"
  }
];

const emergencyHotlines = [
  {
    id: 1,
    name: "Pet Poison Control Hotline",
    phone: "1900 1234",
    description: "Emergency consultation for food poisoning, chemical poisoning",
    available: "24/7",
    icon: "☠️"
  },
  {
    id: 2,
    name: "Animal Rescue Center",
    phone: "1900 5678",
    description: "Rescue injured and abandoned animals",
    available: "24/7",
    icon: "🚑"
  },
  {
    id: 3,
    name: "Emergency Veterinary Consultation",
    phone: "1900 9999",
    description: "Emergency medical consultation for pets",
    available: "24/7",
    icon: "🏥"
  },
  {
    id: 4,
    name: "Environmental Police",
    phone: "113",
    description: "Report animal abuse cases",
    available: "24/7",
    icon: "👮"
  }
];

const emergencyTips = [
  {
    id: 1,
    title: "Food Poisoning",
    steps: [
      "Don't give your pet anything else to eat",
      "Call the poison control hotline immediately",
      "Keep samples of suspected food",
      "Take to veterinarian immediately"
    ],
    icon: "🍫"
  },
  {
    id: 2,
    title: "Injury",
    steps: [
      "Stay calm, don't move your pet",
      "Check breathing and pulse",
      "Bandage wounds if present",
      "Call emergency veterinarian"
    ],
    icon: "🩹"
  },
  {
    id: 3,
    title: "Breathing Difficulty",
    steps: [
      "Check if airway is blocked",
      "Perform CPR if needed",
      "Call emergency veterinary immediately",
      "Keep pet in comfortable position"
    ],
    icon: "🫁"
  },
  {
    id: 4,
    title: "Seizures",
    steps: [
      "Don't try to restrain your pet",
      "Move dangerous objects around",
      "Record time and frequency of seizures",
      "Call veterinarian immediately after seizure"
    ],
    icon: "⚡"
  }
];

const contactInfo = {
  location: "123 Nguyen Hue, District 1, Ho Chi Minh City",
  email: "support@furvercare.com",
  phone: "028 3822 1234",
  workingHours: "Monday - Sunday: 8:00 AM - 8:00 PM",
  emergencyHours: "24/7 for emergency cases"
};

const EmergencyVetPage = ({ userData: propUserData, userName: propUserName }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('');
  const [showAllTips, setShowAllTips] = useState(false);
  // Load user data from props or localStorage - optimized with useMemo
  const memoizedUserData = useMemo(() => {
    if (propUserData && propUserName) {
      return { userData: propUserData, userName: propUserName };
    } else {
      const savedUserData = localStorage.getItem('userRegistrationData');
      if (savedUserData) {
        const user = JSON.parse(savedUserData);
        return { userData: user, userName: user.name || 'User' };
      }
    }
    return { userData: null, userName: '' };
  }, [propUserData, propUserName]);

  useEffect(() => {
    setUserData(memoizedUserData.userData);
    setUserName(memoizedUserData.userName);
  }, [memoizedUserData]);


  // Memoize event handlers to prevent recreation on every render
  const handleCall = useCallback((phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  }, []);

  const handleEmail = useCallback((email) => {
    window.open(`mailto:${email}`);
  }, []);

  const handleDirections = useCallback((address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
  }, []);

  return (
    <div className="emergency-vet-page">
      <ScrollingInfoBar />
      <div style={{ paddingTop: '30px' }}></div>
      <PetOwnerHeader userName={userName} userData={userData} />
      
      {/* Quick Actions - Full Width Horizontal Bar */}
      <div className="quick-actions-bar">
        <div className="quick-actions-container">
          <button 
            className="quick-action-btn emergency"
            onClick={() => handleCall('1900 1234')}
          >
            🚨 Emergency Call
          </button>
          <button 
            className="quick-action-btn poison"
            onClick={() => handleCall('1900 1234')}
          >
            ☠️ Poison Control
          </button>
          <button 
            className="quick-action-btn nearest"
            onClick={() => handleCall(veterinaryContacts[0].phone)}
          >
            🏥 Nearest Vet
          </button>
          <button 
            className="quick-action-btn rescue"
            onClick={() => handleCall('1900 5678')}
          >
            🚑 Animal Rescue
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="emergency-content">

        {/* Emergency Hotlines Section */}
        <section className="emergency-section emergency-hotlines">
          <div className="emergency-container">
            <div className="section-header">
              <h2>📞 Emergency Hotlines</h2>
              <p>24/7 Emergency hotlines</p>
            </div>
            <div className="hotlines-grid">
              {emergencyHotlines.map((hotline) => (
                <div key={hotline.id} className="hotline-card">
                  <div className="hotline-header">
                    <div className="hotline-icon">{hotline.icon}</div>
                    <div className="hotline-info">
                      <h3>{hotline.name}</h3>
                      <p className="hotline-description">{hotline.description}</p>
                    </div>
                  </div>
                  <div className="hotline-actions">
                    <button 
                      className="call-btn"
                      onClick={() => handleCall(hotline.phone)}
                    >
                      📞 {hotline.phone}
                    </button>
                    <span className="availability">{hotline.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Veterinary Contacts Section */}
        <section className="emergency-section veterinary-contacts">
          <div className="emergency-container">
            <div className="section-header">
              <h2>🏥 Veterinary Contacts</h2>
              <p>List of veterinarians and clinics</p>
            </div>
            <div className="veterinary-grid">
              {veterinaryContacts.map((vet) => (
                <div key={vet.id} className="vet-card">
                  <div className="vet-header">
                    <h3>{vet.name}</h3>
                    <div className="vet-rating">
                      <span className="rating">⭐ {vet.rating}</span>
                      <span className="distance">📍 {vet.distance}</span>
                    </div>
                  </div>
                  <div className="vet-info">
                    <p className="vet-address">📍 {vet.address}</p>
                    <p className="vet-services">🩺 {vet.services}</p>
                  </div>
                  <div className="vet-actions">
                    <button 
                      className="call-btn"
                      onClick={() => handleCall(vet.phone)}
                    >
                      📞 {vet.phone}
                    </button>
                    <button 
                      className="directions-btn"
                      onClick={() => handleDirections(vet.address)}
                    >
                      🗺️ Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Tips Section */}
        <section className="emergency-section emergency-tips">
          <div className="emergency-container">
            <div className="section-header">
              <h2>⚡ Emergency Tips</h2>
              <p>Essential emergency situation handling guide</p>
            </div>
            <div className="tips-grid">
              {(showAllTips ? emergencyTips : emergencyTips.slice(0, 2)).map((tip) => (
                <div key={tip.id} className="tip-card">
                  <div className="tip-header">
                    <div className="tip-icon">{tip.icon}</div>
                    <h3>{tip.title}</h3>
                  </div>
                  <div className="tip-steps">
                    {tip.steps.map((step, index) => (
                      <div key={index} className="step-item">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {!showAllTips && (
              <div className="tips-toggle">
                <button 
                  className="show-more-btn"
                  onClick={() => setShowAllTips(true)}
                >
                  Show More Tips ({emergencyTips.length - 2} more)
                </button>
              </div>
            )}
            {showAllTips && (
              <div className="tips-toggle">
                <button 
                  className="show-less-btn"
                  onClick={() => setShowAllTips(false)}
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="emergency-section contact-us">
          <div className="emergency-container">
            <div className="section-header">
              <h2>📞 Contact Us</h2>
              <p>Get in touch with us</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-content">
                    <h4>Address</h4>
                    <p>{contactInfo.location}</p>
                    <button 
                      className="action-btn"
                      onClick={() => handleDirections(contactInfo.location)}
                    >
                      🗺️ Get Directions
                    </button>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-content">
                    <h4>Email</h4>
                    <p>{contactInfo.email}</p>
                    <button 
                      className="action-btn"
                      onClick={() => handleEmail(contactInfo.email)}
                    >
                      📧 Send Email
                    </button>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-content">
                    <h4>Phone</h4>
                    <p>{contactInfo.phone}</p>
                    <button 
                      className="action-btn"
                      onClick={() => handleCall(contactInfo.phone)}
                    >
                      📞 Call Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="working-hours">
                <h4>🕒 Working Hours</h4>
                <p>{contactInfo.workingHours}</p>
                <p className="emergency-hours">{contactInfo.emergencyHours}</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EmergencyVetPage;
