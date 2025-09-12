import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PetOwnerHeader from '../components/PetOwnerHeader';
import './EmergencyVetPage.css';

const EmergencyVetPage = ({ userData: propUserData, userName: propUserName }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState('Ho Chi Minh City, Vietnam');

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

  // Update time every 5 seconds instead of every second to reduce re-renders
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Get user location - only once on mount
  useEffect(() => {
    // Skip geolocation API call to avoid delays, use static location
    setUserLocation('Ho Chi Minh City, Vietnam');
  }, []);

  // Memoize formatting functions to prevent recreation on every render
  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, []);

  const formatDate = useCallback((date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Static veterinary contact list
  const veterinaryContacts = [
    {
      id: 1,
      name: "Bệnh viện Thú y PetCare HCM",
      phone: "028 3822 1234",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      services: "24/7 Emergency, Surgery, General Care",
      rating: "4.8/5",
      distance: "2.5 km"
    },
    {
      id: 2,
      name: "Phòng khám Thú y Happy Pet",
      phone: "028 3845 6789",
      address: "456 Lê Lợi, Q3, TP.HCM",
      services: "Emergency, Vaccination, Grooming",
      rating: "4.6/5",
      distance: "3.2 km"
    },
    {
      id: 3,
      name: "Bệnh viện Thú y PetLife",
      phone: "028 3876 5432",
      address: "789 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
      services: "24/7 Emergency, ICU, Specialist Care",
      rating: "4.9/5",
      distance: "4.1 km"
    },
    {
      id: 4,
      name: "Phòng khám Thú y Family Pet",
      phone: "028 3811 9876",
      address: "321 Cách Mạng Tháng 8, Q10, TP.HCM",
      services: "General Care, Dental, Surgery",
      rating: "4.5/5",
      distance: "5.3 km"
    },
    {
      id: 5,
      name: "Bệnh viện Thú y PetHealth",
      phone: "028 3855 2468",
      address: "654 Nguyễn Văn Cừ, Q5, TP.HCM",
      services: "24/7 Emergency, Oncology, Cardiology",
      rating: "4.7/5",
      distance: "6.8 km"
    }
  ];

  // Emergency hotlines
  const emergencyHotlines = [
    {
      id: 1,
      name: "Đường dây nóng ngộ độc vật nuôi",
      phone: "1900 1234",
      description: "Tư vấn khẩn cấp về ngộ độc thực phẩm, hóa chất",
      available: "24/7",
      icon: "☠️"
    },
    {
      id: 2,
      name: "Trung tâm cứu hộ động vật",
      phone: "1900 5678",
      description: "Cứu hộ động vật bị thương, bị bỏ rơi",
      available: "24/7",
      icon: "🚑"
    },
    {
      id: 3,
      name: "Đường dây tư vấn thú y khẩn cấp",
      phone: "1900 9999",
      description: "Tư vấn y tế khẩn cấp cho thú cưng",
      available: "24/7",
      icon: "🏥"
    },
    {
      id: 4,
      name: "Cảnh sát môi trường",
      phone: "113",
      description: "Báo cáo hành vi ngược đãi động vật",
      available: "24/7",
      icon: "👮"
    }
  ];

  // Emergency tips
  const emergencyTips = [
    {
      id: 1,
      title: "Ngộ độc thực phẩm",
      steps: [
        "Không cho thú cưng ăn thêm gì",
        "Gọi ngay đường dây nóng ngộ độc",
        "Giữ lại mẫu thức ăn nghi ngờ",
        "Đưa đến bác sĩ thú y ngay lập tức"
      ],
      icon: "🍫"
    },
    {
      id: 2,
      title: "Chấn thương",
      steps: [
        "Giữ bình tĩnh, không di chuyển thú cưng",
        "Kiểm tra nhịp thở và mạch",
        "Băng bó vết thương nếu có",
        "Gọi bác sĩ thú y khẩn cấp"
      ],
      icon: "🩹"
    },
    {
      id: 3,
      title: "Khó thở",
      steps: [
        "Kiểm tra đường thở có bị tắc không",
        "Thực hiện hô hấp nhân tạo nếu cần",
        "Gọi cấp cứu thú y ngay lập tức",
        "Giữ thú cưng ở tư thế thoải mái"
      ],
      icon: "🫁"
    },
    {
      id: 4,
      title: "Co giật",
      steps: [
        "Không cố gắng giữ chặt thú cưng",
        "Di chuyển đồ vật nguy hiểm xung quanh",
        "Ghi lại thời gian và tần suất co giật",
        "Gọi bác sĩ thú y ngay sau khi co giật"
      ],
      icon: "⚡"
    }
  ];

  // Contact information
  const contactInfo = {
    location: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    email: "support@furvercare.com",
    phone: "028 3822 1234",
    workingHours: "Thứ 2 - Chủ nhật: 8:00 - 20:00",
    emergencyHours: "24/7 cho trường hợp khẩn cấp"
  };

  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  const handleDirections = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
  };

  return (
    <div className="emergency-vet-page">
      <PetOwnerHeader userName={userName} userData={userData} />
      
      {/* Header */}
      <div className="emergency-header">
        <div className="emergency-container">
          <div className="header-content">
            <div className="emergency-info">
              <h1>🚨 Emergency & Vet Help</h1>
              <div className="location-time">
                <span className="location">📍 {userLocation}</span>
                <span className="time">{formatTime(currentTime)}</span>
                <span className="date">{formatDate(currentTime)}</span>
              </div>
            </div>
            <button 
              className="back-btn"
              onClick={() => window.history.back()}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="emergency-content">
        {/* Emergency Hotlines Section */}
        <section className="emergency-section emergency-hotlines">
          <div className="emergency-container">
            <div className="section-header">
              <h2>📞 Emergency Hotlines</h2>
              <p>Đường dây nóng khẩn cấp 24/7</p>
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
              <p>Danh sách bác sĩ thú y và phòng khám</p>
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
              <p>Hướng dẫn xử lý tình huống khẩn cấp</p>
            </div>
            <div className="tips-grid">
              {emergencyTips.map((tip) => (
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
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="emergency-section contact-us">
          <div className="emergency-container">
            <div className="section-header">
              <h2>📞 Contact Us</h2>
              <p>Liên hệ với chúng tôi</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-content">
                    <h4>Địa chỉ</h4>
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
                    <h4>Điện thoại</h4>
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

        {/* Quick Actions Section */}
        <section className="emergency-section quick-actions">
          <div className="emergency-container">
            <div className="section-header">
              <h2>⚡ Quick Actions</h2>
              <p>Hành động nhanh trong tình huống khẩn cấp</p>
            </div>
            <div className="quick-actions-grid">
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
        </section>
      </div>
    </div>
  );
};

export default EmergencyVetPage;
