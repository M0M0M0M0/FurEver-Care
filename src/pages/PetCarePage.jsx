import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import PetOwnerHeader from '../components/PetOwnerHeader';
import './PetCarePage.css';

const PetCarePage = ({ userData: propUserData, userName: propUserName }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState('Ho Chi Minh City, Vietnam');
  const [petName, setPetName] = useState('Pet');
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
        setUserName(user.name || 'User');
      }
    }
  }, [propUserData, propUserName]);

  // Handle hash navigation to scroll to specific sections
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location.hash]);

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
      title: 'Basic Grooming',
      description: 'Proper grooming guide for dogs and cats',
      thumbnail: 'https://img.youtube.com/vi/YpzjiS5M8V0/maxresdefault.jpg',
      videoId: 'YpzjiS5M8V0'
    },
    {
      id: 2,
      title: 'Safe Bathing',
      description: 'How to bathe your pet safely and effectively',
      thumbnail: 'https://img.youtube.com/vi/C7UyYQp4OJ8/maxresdefault.jpg',
      videoId: 'C7UyYQp4OJ8'
    },
    {
      id: 3,
      title: 'Nail Trimming',
      description: 'Guide to trimming your pet\'s nails',
      thumbnail: 'https://img.youtube.com/vi/ThIfSjfjr_8/maxresdefault.jpg',
      videoId: 'ThIfSjfjr_8'
    }
  ];

  // Sample data for health tips with audio
  const healthTips = [
    {
      id: 1,
      title: 'Dental Care',
      description: "Brush your pet's teeth 2-3 times a week to prevent gum disease",
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      icon: '🦷'
    },
    {
      id: 2,
      title: 'Weight Management',
      description: 'Monitor weight regularly and adjust diet accordingly',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      icon: '⚖️'
    },
    {
      id: 3,
      title: 'Common Conditions',
      description: 'Recognize common signs of illness in pets',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      icon: '🏥'
    }
  ];

  // Sample data for training tips
  const trainingTips = [
    {
      id: 1,
      title: 'Basic Training',
      description: 'Teach your pet basic commands like sit, down, come',
      audioText: 'Step 1: Prepare treats. Step 2: Give "sit" command and gently push pet\'s bottom down. Step 3: Reward immediately when pet sits correctly.',
      icon: '🎯'
    },
    {
      id: 2,
      title: 'Behavior Training',
      description: 'Correct unwanted behaviors',
      audioText: 'When your pet has bad behavior, say "no" firmly and guide to correct behavior. Always reward when your pet does right.',
      icon: '🚫'
    },
    {
      id: 3,
      title: 'Advanced Training',
      description: 'Special skills and intelligent games',
      audioText: 'Teach your pet brain games like finding objects, obstacle courses. This helps develop your pet\'s brain and reduce stress.',
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
              ← Back
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

              <h2>📋Pet Profile</h2>
            </div>
            <div className="section-content">
              <div className="profile-grid">
                <div className="profile-card">
                  <h3>Basic Information</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="label">Species:</span>
                      <span className="value">{petData?.species || 'Not updated'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Breed:</span>
                      <span className="value">{petData?.breed || 'Not updated'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Age:</span>
                      <span className="value">{petData?.age || 'Not updated'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Gender:</span>
                      <span className="value">{petData?.gender || 'Not updated'}</span>
                    </div>
                  </div>
                </div>
                <div className="profile-card">
                  <h3>Health Information</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="label">Weight:</span>
                      <span className="value">{petData?.weight ? `${petData.weight} kg` : 'Not updated'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Vaccinations:</span>
                      <span className="value">{petData?.vaccinations || 'Not updated'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Allergies:</span>
                      <span className="value">{petData?.allergies || 'None'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Current Medications:</span>
                      <span className="value">{petData?.medications || 'None'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-actions">
                <button className="action-btn" onClick={() => window.location.href = '/pet-profile'}>
                  View Detailed Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feeding Guide Section */}
        <section id="feeding-guide" className="care-section-full feeding-section">
          <div className="container">
            <div className="section-header">
              <h2>🍽️Feeding Guide</h2>
            </div>
            <div className="section-content">
              <div className="feeding-charts-grid">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>🐕 Puppy (0-12 months)</h3>
                    <span className="chart-value">4-5 meals/day</span>
                  </div>
                  <div className="chart">
                    <div className="chart-bar" style={{width: '80%'}}>
                      <span>80%</span>
                    </div>
                  </div>
                  <p className="chart-description">Puppies need multiple small meals for proper development</p>
                </div>
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>🐕 Adult Dog (1-7 years)</h3>
                    <span className="chart-value">2-3 meals/day</span>
                  </div>
                  <div className="chart">
                    <div className="chart-bar" style={{width: '60%'}}>
                      <span>60%</span>
                    </div>
                  </div>
                  <p className="chart-description">Adult dogs need a balanced diet</p>
                </div>
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>🐱 Cat</h3>
                    <span className="chart-value">3-4 meals/day</span>
                  </div>
                  <div className="chart">
                    <div className="chart-bar" style={{width: '70%'}}>
                      <span>70%</span>
                    </div>
                  </div>
                  <p className="chart-description">Cats prefer multiple small meals throughout the day</p>
                </div>
              </div>
              <div className="section-actions">
                <button className="action-btn">View Detailed Chart</button>
              </div>
            </div>
          </div>
        </section>

        {/* Grooming Videos Section */}
        <section id="grooming-videos" className="care-section-full grooming-section">
          <div className="container">
            <div className="section-header">
              <h2>🛁Grooming Videos</h2>
              
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
                <button className="action-btn">View All Videos</button>
              </div>
            </div>
          </div>
        </section>

        {/* Health Tips Section */}
        <section id="health-tips" className="care-section-full health-section">
          <div className="container">
            <div className="section-header">
              <h2>💊Health Tips</h2>
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
                        {playingAudio === tip.id ? '🔊 Playing...' : '🔊 Listen to tip'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-actions">
                <button className="action-btn">View All Health Tips</button>
              </div>
            </div>
          </div>
        </section>

        {/* Training Tips Section */}
        <section id="training-tips" className="care-section-full training-section">
          <div className="container">
            <div className="section-header">
              <h2>🎾Training Tips</h2>
              
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
                        <h4>Detailed Guide:</h4>
                        <p>{tip.audioText}</p>
                      </div>
                      <div className="training-actions">
                        <button 
                          className="audio-btn"
                          onClick={() => handleTextToSpeech(tip.audioText)}
                        >
                          🔊 Listen to guide
                        </button>
                        <button 
                          className="text-btn"
                          onClick={() => navigator.clipboard.writeText(tip.audioText)}
                        >
                          📋 Copy text
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-actions">
                <button className="action-btn">View All Training Tips</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PetCarePage;
