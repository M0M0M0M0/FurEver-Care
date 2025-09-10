import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import PetOwnerHeader from '../components/PetOwnerHeader';
import './PetCarePage.css';

const PetCarePage = ({ userData: propUserData, userName: propUserName }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState('Ho Chi Minh City, Vietnam');
  const [petName, setPetName] = useState('Thú cưng');
  const [petData, setPetData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('');

  // Get pet name and data from URL params, location state, or localStorage
  useEffect(() => {
    const urlPetName = searchParams.get('petName');
    if (urlPetName) {
      setPetName(decodeURIComponent(urlPetName));
    } else if (location.state?.petName) {
      setPetName(location.state.petName);
    } else {
      // Try to get from localStorage
      const savedPets = localStorage.getItem('petProfiles');
      if (savedPets) {
        const pets = JSON.parse(savedPets);
        if (pets.length > 0) {
          setPetName(pets[0].name);
          setPetData(pets[0]);
        }
      }
    }
  }, [searchParams, location.state]);

  // Load pet data from localStorage
  useEffect(() => {
    const savedPets = localStorage.getItem('petProfiles');
    if (savedPets) {
      const pets = JSON.parse(savedPets);
      const currentPet = pets.find(pet => pet.name === petName);
      if (currentPet) {
        setPetData(currentPet);
      }
    }
  }, [petName]);

  // Load user data from props or localStorage
  useEffect(() => {
    if (propUserData && propUserName) {
      setUserData(propUserData);
      setUserName(propUserName);
    } else {
      const savedUserData = localStorage.getItem('userRegistrationData');
      if (savedUserData) {
        const user = JSON.parse(savedUserData);
        setUserData(user);
        setUserName(user.name || 'Người dùng');
      }
    }
  }, [propUserData, propUserName]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode the coordinates
          setUserLocation('Ho Chi Minh City, Vietnam');
        },
        () => {
          setUserLocation('Ho Chi Minh City, Vietnam');
        }
      );
    }
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sample data for videos
  const groomingVideos = [
    {
      id: 1,
      title: 'Chải lông cơ bản',
      description: 'Hướng dẫn chải lông đúng cách cho chó và mèo',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Tắm rửa an toàn',
      description: 'Cách tắm cho thú cưng một cách an toàn và hiệu quả',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Cắt tỉa móng',
      description: 'Hướng dẫn cắt tỉa móng cho thú cưng',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ'
    }
  ];

  // Sample data for health tips with audio
  const healthTips = [
    {
      id: 1,
      title: 'Chăm sóc răng miệng',
      description: 'Đánh răng cho thú cưng 2-3 lần/tuần để tránh bệnh nướu răng',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      icon: '🦷'
    },
    {
      id: 2,
      title: 'Quản lý cân nặng',
      description: 'Theo dõi cân nặng thường xuyên và điều chỉnh chế độ ăn phù hợp',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      icon: '⚖️'
    },
    {
      id: 3,
      title: 'Các tình trạng phổ biến',
      description: 'Nhận biết các dấu hiệu bệnh thường gặp ở thú cưng',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      icon: '🏥'
    }
  ];

  // Sample data for training tips
  const trainingTips = [
    {
      id: 1,
      title: 'Huấn luyện cơ bản',
      description: 'Dạy thú cưng các lệnh cơ bản như ngồi, nằm, đến',
      audioText: 'Bước 1: Chuẩn bị thức ăn thưởng. Bước 2: Ra lệnh "ngồi" và đẩy nhẹ mông thú cưng xuống. Bước 3: Thưởng ngay khi thú cưng ngồi đúng tư thế.',
      icon: '🎯'
    },
    {
      id: 2,
      title: 'Huấn luyện hành vi',
      description: 'Điều chỉnh các hành vi không mong muốn',
      audioText: 'Khi thú cưng có hành vi xấu, hãy nói "không" một cách dứt khoát và hướng dẫn hành vi đúng. Luôn thưởng khi thú cưng làm đúng.',
      icon: '🚫'
    },
    {
      id: 3,
      title: 'Huấn luyện nâng cao',
      description: 'Các kỹ năng đặc biệt và trò chơi thông minh',
      audioText: 'Dạy thú cưng các trò chơi trí tuệ như tìm đồ vật, vượt chướng ngại vật. Điều này giúp thú cưng phát triển trí não và giảm stress.',
      icon: '🧠'
    }
  ];

  // Handle video selection
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Handle audio play
  const handleAudioPlay = (tipId) => {
    if (playingAudio === tipId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(tipId);
      // In a real app, you would play the actual audio here
      setTimeout(() => setPlayingAudio(null), 3000); // Simulate audio duration
    }
  };

  // Handle text-to-speech for training tips
  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="pet-care-page">
      <PetOwnerHeader userName={userName} userData={userData} />
      
      {/* Header */}
      <div className="pet-care-header">
        <div className="container">
          <div className="header-content">
            <div className="pet-info">
              <h1>🐾 {petName}</h1>
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
              ← Quay lại
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pet-care-content">
        {/* Pet Profile Section */}
        <section className="care-section-full">
          <div className="container">
            <div className="section-header">
              <div className="section-icon">📋</div>
              <h2>Hồ sơ thú cưng</h2>
              <p>Thông tin chi tiết về thú cưng của bạn</p>
            </div>
            <div className="section-content">
              <div className="profile-grid">
                <div className="profile-card">
                  <h3>Thông tin cơ bản</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="label">Loài:</span>
                      <span className="value">{petData?.species || 'Chưa cập nhật'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Giống:</span>
                      <span className="value">{petData?.breed || 'Chưa cập nhật'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Độ tuổi:</span>
                      <span className="value">{petData?.age || 'Chưa cập nhật'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Giới tính:</span>
                      <span className="value">{petData?.gender || 'Chưa cập nhật'}</span>
                    </div>
                  </div>
                </div>
                <div className="profile-card">
                  <h3>Thông tin sức khỏe</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="label">Cân nặng:</span>
                      <span className="value">{petData?.weight ? `${petData.weight} kg` : 'Chưa cập nhật'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Tiêm chủng:</span>
                      <span className="value">{petData?.vaccinations || 'Chưa cập nhật'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Dị ứng:</span>
                      <span className="value">{petData?.allergies || 'Không có'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Thuốc đang dùng:</span>
                      <span className="value">{petData?.medications || 'Không có'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-actions">
                <button className="action-btn" onClick={() => window.location.href = '/pet-profile'}>
                  Xem chi tiết hồ sơ
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feeding Guide Section */}
        <section className="care-section-full feeding-section">
          <div className="container">
            <div className="section-header">
              <div className="section-icon">🍽️</div>
              <h2>Hướng dẫn cho ăn</h2>
              <p>Biểu đồ khuyến nghị số bữa ăn theo độ tuổi và loài</p>
            </div>
            <div className="section-content">
              <div className="feeding-charts-grid">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>🐕 Chó con (0-12 tháng)</h3>
                    <span className="chart-value">4-5 bữa/ngày</span>
                  </div>
                  <div className="chart">
                    <div className="chart-bar" style={{width: '80%'}}>
                      <span>80%</span>
                    </div>
                  </div>
                  <p className="chart-description">Chó con cần ăn nhiều bữa nhỏ để phát triển tốt</p>
                </div>
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>🐕 Chó trưởng thành (1-7 tuổi)</h3>
                    <span className="chart-value">2-3 bữa/ngày</span>
                  </div>
                  <div className="chart">
                    <div className="chart-bar" style={{width: '60%'}}>
                      <span>60%</span>
                    </div>
                  </div>
                  <p className="chart-description">Chó trưởng thành cần chế độ ăn cân bằng</p>
                </div>
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>🐱 Mèo</h3>
                    <span className="chart-value">3-4 bữa/ngày</span>
                  </div>
                  <div className="chart">
                    <div className="chart-bar" style={{width: '70%'}}>
                      <span>70%</span>
                    </div>
                  </div>
                  <p className="chart-description">Mèo thích ăn nhiều bữa nhỏ trong ngày</p>
                </div>
              </div>
              <div className="section-actions">
                <button className="action-btn">Xem biểu đồ chi tiết</button>
              </div>
            </div>
          </div>
        </section>

        {/* Grooming Videos Section */}
        <section className="care-section-full grooming-section">
          <div className="container">
            <div className="section-header">
              <div className="section-icon">🛁</div>
              <h2>Video chải chuốt</h2>
              <p>Hướng dẫn chăm sóc và làm đẹp cho thú cưng</p>
            </div>
            <div className="section-content">
              <div className="videos-grid">
                {groomingVideos.map((video) => (
                  <div key={video.id} className="video-card" onClick={() => handleVideoSelect(video)}>
                    <div className="video-thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="play-overlay">
                        <div className="play-icon">▶️</div>
                      </div>
                    </div>
                    <div className="video-content">
                      <h3>{video.title}</h3>
                      <p>{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Video Modal */}
              {selectedVideo && (
                <div className="video-modal" onClick={() => setSelectedVideo(null)}>
                  <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-video" onClick={() => setSelectedVideo(null)}>×</button>
                    <div className="video-container">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{selectedVideo.title}</h3>
                    <p>{selectedVideo.description}</p>
                  </div>
                </div>
              )}
              
              <div className="section-actions">
                <button className="action-btn">Xem tất cả video</button>
              </div>
            </div>
          </div>
        </section>

        {/* Health Tips Section */}
        <section className="care-section-full health-section">
          <div className="container">
            <div className="section-header">
              <div className="section-icon">💊</div>
              <h2>Mẹo sức khỏe</h2>
              <p>Chăm sóc sức khỏe toàn diện cho thú cưng</p>
            </div>
            <div className="section-content">
              <div className="health-tips-grid">
                {healthTips.map((tip) => (
                  <div key={tip.id} className="health-tip-card">
                    <div className="tip-header">
                      <div className="tip-icon">{tip.icon}</div>
                      <h3>{tip.title}</h3>
                    </div>
                    <div className="tip-content">
                      <p>{tip.description}</p>
                      <button 
                        className={`audio-btn ${playingAudio === tip.id ? 'playing' : ''}`}
                        onClick={() => handleAudioPlay(tip.id)}
                      >
                        {playingAudio === tip.id ? '🔊 Đang phát...' : '🔊 Nghe mẹo'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-actions">
                <button className="action-btn">Xem tất cả mẹo sức khỏe</button>
              </div>
            </div>
          </div>
        </section>

        {/* Training Tips Section */}
        <section className="care-section-full training-section">
          <div className="container">
            <div className="section-header">
              <div className="section-icon">🎾</div>
              <h2>Mẹo đào tạo</h2>
              <p>Hướng dẫn huấn luyện và phát triển kỹ năng cho thú cưng</p>
            </div>
            <div className="section-content">
              <div className="training-tips-grid">
                {trainingTips.map((tip) => (
                  <div key={tip.id} className="training-tip-card">
                    <div className="training-header">
                      <div className="training-icon">{tip.icon}</div>
                      <div>
                        <h3>{tip.title}</h3>
                        <p>{tip.description}</p>
                      </div>
                    </div>
                    <div className="training-content">
                      <div className="audio-text">
                        <h4>Hướng dẫn chi tiết:</h4>
                        <p>{tip.audioText}</p>
                      </div>
                      <div className="training-actions">
                        <button 
                          className="audio-btn"
                          onClick={() => handleTextToSpeech(tip.audioText)}
                        >
                          🔊 Nghe hướng dẫn
                        </button>
                        <button 
                          className="text-btn"
                          onClick={() => navigator.clipboard.writeText(tip.audioText)}
                        >
                          📋 Sao chép văn bản
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-actions">
                <button className="action-btn">Xem tất cả mẹo đào tạo</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PetCarePage;
