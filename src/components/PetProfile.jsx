import React, { useState, useEffect } from 'react';
import { Heart, User, Calendar, Scale, Stethoscope, Camera, Edit3, Save, X } from 'lucide-react';
import './PetProfile.css';

const PetProfile = ({ onClose, userData, userName, isPage = false }) => {
  const [pet, setPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    gender: '',
    color: '',
    microchipId: '',
    birthDate: '',
    adoptionDate: '',
    vetName: '',
    vetPhone: '',
    allergies: '',
    medications: '',
    specialNeeds: '',
    personality: '',
    favoriteFood: '',
    favoriteActivities: '',
    profileImage: null
  });

  // Load pet from localStorage on component mount and create pet from userData
  useEffect(() => {
    const savedPet = localStorage.getItem('currentPetProfile');
    let currentPet = null;
    
    if (savedPet) {
      currentPet = JSON.parse(savedPet);
    }
    
    // If we have userData from registration form, create a pet profile
    if (userData && userData.petName && !currentPet) {
      currentPet = {
        id: Date.now(),
        name: userData.petName || '',
        species: userData.petType || '',
        breed: userData.petBreed || '',
        age: userData.petAge || '',
        weight: '',
        gender: userData.petGender || '',
        color: '',
        microchipId: '',
        birthDate: '',
        adoptionDate: '',
        vetName: '',
        vetPhone: '',
        allergies: '',
        medications: '',
        specialNeeds: '',
        personality: userData.petDescription || '',
        favoriteFood: '',
        favoriteActivities: '',
        profileImage: userData.profileImage || null,
        lastUpdated: new Date().toISOString(),
        createdFromRegistration: true
      };
    }
    
    setPet(currentPet);
  }, [userData?.petName]);

  // Save pet to localStorage whenever pet state changes
  useEffect(() => {
    if (pet) {
      localStorage.setItem('currentPetProfile', JSON.stringify(pet));
    }
  }, [pet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePet = () => {
    if (!formData.name || !formData.species) {
      alert('Please fill in pet name and species');
      return;
    }

    const petData = {
      ...formData,
      id: pet ? pet.id : Date.now(),
      lastUpdated: new Date().toISOString()
    };

    setPet(petData);
    setIsEditing(false);
    resetForm();
  };

  const handleEditPet = () => {
    if (pet) {
      setFormData(pet);
    } else {
      resetForm();
    }
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      gender: '',
      color: '',
      microchipId: '',
      birthDate: '',
      adoptionDate: '',
      vetName: '',
      vetPhone: '',
      allergies: '',
      medications: '',
      specialNeeds: '',
      personality: '',
      favoriteFood: '',
      favoriteActivities: '',
      profileImage: null
    });
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} months`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} years ${months} months` : `${years} years`;
    }
  };

  return (
    <div className={isPage ? "pet-profile-page-container" : "pet-profile-overlay"}>
      <div className="pet-profile-container">
        <div className="pet-profile-header">
          <div>
            <h2>Pet Profile</h2>
            {userData && userData.petName && (
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
                Information from registration form has been automatically created
              </p>
            )}
          </div>
          {!isPage && (
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          )}
        </div>

        <div className="pet-profile-content">
          {/* Pet Details */}
          <div className="pet-details">
            {!pet && !isEditing ? (
              <div className="no-pet">
                <Heart size={64} />
                <h3>No pet profile found</h3>
                <p>Please create a pet profile first</p>
                <button className="create-pet-btn" onClick={() => setIsEditing(true)}>
                  <Edit3 size={20} />
                  Create Pet Profile
                </button>
              </div>
            ) : (
              <div className="pet-detail-content">
                {isEditing ? (
                  // Edit Form
                  <div className="pet-form">
                    <div className="form-header">
                      <h3>{pet ? 'Edit Pet Information' : 'Create Pet Profile'}</h3>
                    </div>

                    <div className="form-sections">
                      {/* Basic Information */}
                      <div className="form-section">
                        <h4>Basic Information</h4>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Pet Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter pet name"
                            />
                          </div>
                          <div className="form-group">
                            <label>Species *</label>
                            <select
                              name="species"
                              value={formData.species}
                              onChange={handleInputChange}
                            >
                              <option value="">Select species</option>
                              <option value="dog">Dog</option>
                              <option value="cat">Cat</option>
                              <option value="bird">Chim</option>
                              <option value="fish">Fish</option>
                              <option value="rabbit">Rabbit</option>
                              <option value="hamster">Hamster</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Breed</label>
                            <input
                              type="text"
                              name="breed"
                              value={formData.breed}
                              onChange={handleInputChange}
                              placeholder="e.g.: Golden Retriever"
                            />
                          </div>
                          <div className="form-group">
                            <label>Gender</label>
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                            >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Color</label>
                            <input
                              type="text"
                              name="color"
                              value={formData.color}
                              onChange={handleInputChange}
                              placeholder="Fur color, eye color..."
                            />
                          </div>
                          <div className="form-group">
                            <label>Birth Date</label>
                            <input
                              type="date"
                              name="birthDate"
                              value={formData.birthDate}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Physical Information */}
                      <div className="form-section">
                        <h4>Physical Information</h4>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Weight (kg)</label>
                            <input
                              type="number"
                              name="weight"
                              value={formData.weight}
                              onChange={handleInputChange}
                              placeholder="0.0"
                              step="0.1"
                            />
                          </div>
                          <div className="form-group">
                            <label>ID Microchip</label>
                            <input
                              type="text"
                              name="microchipId"
                              value={formData.microchipId}
                              onChange={handleInputChange}
                              placeholder="Microchip number"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Health Information */}
                      <div className="form-section">
                        <h4>Health Information</h4>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Veterinarian Name</label>
                            <input
                              type="text"
                              name="vetName"
                              value={formData.vetName}
                              onChange={handleInputChange}
                              placeholder="Doctor name"
                            />
                          </div>
                          <div className="form-group">
                            <label>Doctor Phone Number</label>
                            <input
                              type="tel"
                              name="vetPhone"
                              value={formData.vetPhone}
                              onChange={handleInputChange}
                              placeholder="Phone number"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Allergies</label>
                            <textarea
                              name="allergies"
                              value={formData.allergies}
                              onChange={handleInputChange}
                              placeholder="List allergies..."
                              rows="3"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Current Medications</label>
                            <textarea
                              name="medications"
                              value={formData.medications}
                              onChange={handleInputChange}
                              placeholder="List medications..."
                              rows="3"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Special Needs</label>
                            <textarea
                              name="specialNeeds"
                              value={formData.specialNeeds}
                              onChange={handleInputChange}
                              placeholder="Describe special needs..."
                              rows="3"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Personality & Preferences */}
                      <div className="form-section">
                        <h4>Personality & Preferences</h4>
                        <div className="form-grid">
                          <div className="form-group full-width">
                            <label>Personality</label>
                            <textarea
                              name="personality"
                              value={formData.personality}
                              onChange={handleInputChange}
                              placeholder="Describe personality..."
                              rows="3"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Favorite Food</label>
                            <textarea
                              name="favoriteFood"
                              value={formData.favoriteFood}
                              onChange={handleInputChange}
                              placeholder="List favorite foods..."
                              rows="2"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Favorite Activities</label>
                            <textarea
                              name="favoriteActivities"
                              value={formData.favoriteActivities}
                              onChange={handleInputChange}
                              placeholder="List favorite activities..."
                              rows="2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Profile Image */}
                      <div className="form-section">
                        <h4>Profile Image</h4>
                        <div className="image-upload">
                          <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor="profileImage" className="upload-label">
                            <Camera size={24} />
                            <span>Upload pet image</span>
                          </label>
                          {formData.profileImage && (
                            <div className="image-preview">
                              <img src={formData.profileImage} alt="Preview" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button className="cancel-btn" onClick={() => {
                        setIsEditing(false);
                        resetForm();
                      }}>
                        Cancel
                      </button>
                      <button className="save-btn" onClick={handleSavePet}>
                        <Save size={20} />
                        Save Information
                      </button>
                    </div>
                  </div>
                ) : pet ? (
                  // View Mode
                  <div className="pet-view">
                    <div className="pet-header">
                      <div className="pet-avatar-large">
                        {pet.profileImage ? (
                          <img src={pet.profileImage} alt={pet.name} />
                        ) : (
                          <Heart size={48} />
                        )}
                      </div>
                      <div className="pet-basic-info">
                        <h2>{pet.name}</h2>
                        <p>{pet.species} • {pet.breed}</p>
                        <p>{pet.gender === 'male' ? 'Male' : 'Female'} • {pet.color}</p>
                        {pet.birthDate && (
                          <p>Age: {calculateAge(pet.birthDate)}</p>
                        )}
                      </div>
                      <button className="edit-btn" onClick={handleEditPet}>
                        <Edit3 size={20} />
                        Edit
                      </button>
                    </div>

                    <div className="pet-details-grid">
                      <div className="detail-section">
                        <h4>Basic Information</h4>
                        <div className="detail-list">
                          {pet.weight && (
                            <div className="detail-item">
                              <Scale size={16} />
                              <span>Weight: {pet.weight} kg</span>
                            </div>
                          )}
                          {pet.microchipId && (
                            <div className="detail-item">
                              <Stethoscope size={16} />
                              <span>Microchip: {pet.microchipId}</span>
                            </div>
                          )}
                          {pet.birthDate && (
                            <div className="detail-item">
                              <Calendar size={16} />
                              <span>Birth Date: {new Date(pet.birthDate).toLocaleDateString('en-US')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {pet.vetName && (
                        <div className="detail-section">
                          <h4>Veterinarian Information</h4>
                          <div className="detail-list">
                            <div className="detail-item">
                              <User size={16} />
                              <span>Veterinarian: {pet.vetName}</span>
                            </div>
                            {pet.vetPhone && (
                              <div className="detail-item">
                                <span>Phone: {pet.vetPhone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {pet.allergies && (
                        <div className="detail-section">
                          <h4>Allergies</h4>
                          <p>{pet.allergies}</p>
                        </div>
                      )}

                      {pet.medications && (
                        <div className="detail-section">
                          <h4>Current Medications</h4>
                          <p>{pet.medications}</p>
                        </div>
                      )}

                      {pet.specialNeeds && (
                        <div className="detail-section">
                          <h4>Special Needs</h4>
                          <p>{pet.specialNeeds}</p>
                        </div>
                      )}

                      {pet.personality && (
                        <div className="detail-section">
                          <h4>Personality</h4>
                          <p>{pet.personality}</p>
                        </div>
                      )}

                      {pet.favoriteFood && (
                        <div className="detail-section">
                          <h4>Favorite Food</h4>
                          <p>{pet.favoriteFood}</p>
                        </div>
                      )}

                      {pet.favoriteActivities && (
                        <div className="detail-section">
                          <h4>Favorite Activities</h4>
                          <p>{pet.favoriteActivities}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
