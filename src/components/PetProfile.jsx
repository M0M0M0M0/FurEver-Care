import React, { useState, useEffect } from 'react';
import { Heart, User, Calendar, Scale, Ruler, Stethoscope, Camera, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import './PetProfile.css';

const PetProfile = ({ onClose, userData, userName }) => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
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

  // Load pets from localStorage on component mount and create pet from userData
  useEffect(() => {
    const savedPets = localStorage.getItem('petProfiles');
    let existingPets = [];
    
    if (savedPets) {
      existingPets = JSON.parse(savedPets);
    }
    
    // If we have userData from registration form, create a pet profile
    if (userData && userData.petName && !existingPets.some(pet => pet.name === userData.petName)) {
      const newPet = {
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
      
      const updatedPets = [...existingPets, newPet];
      setPets(updatedPets);
      setSelectedPet(newPet);
    } else {
      setPets(existingPets);
    }
  }, [userData?.petName]); // Only depend on petName to avoid infinite loop

  // Save pets to localStorage whenever pets state changes
  useEffect(() => {
    localStorage.setItem('petProfiles', JSON.stringify(pets));
  }, [pets]);

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
      id: selectedPet ? selectedPet.id : Date.now(),
      lastUpdated: new Date().toISOString()
    };

    if (selectedPet && isEditing) {
      // Update existing pet
      setPets(prev => prev.map(pet => 
        pet.id === selectedPet.id ? petData : pet
      ));
      setSelectedPet(petData);
    } else {
      // Add new pet
      setPets(prev => [...prev, petData]);
      setSelectedPet(petData);
    }

    setIsEditing(false);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    setFormData(pet);
    setIsEditing(true);
  };

  const handleDeletePet = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet profile?')) {
      setPets(prev => prev.filter(pet => pet.id !== petId));
      if (selectedPet && selectedPet.id === petId) {
        setSelectedPet(null);
      }
    }
  };

  const handleAddNewPet = () => {
    resetForm();
    setSelectedPet(null);
    setIsEditing(false);
    setShowAddForm(true);
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
    <div className="pet-profile-overlay">
      <div className="pet-profile-container">
        <div className="pet-profile-header">
          <div>
            <h2>Pet Profile Management</h2>
            {userData && userData.petName && (
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
                Information from registration form has been automatically created
              </p>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="pet-profile-content">
          {/* Pet List Sidebar */}
          <div className="pet-list-sidebar">
            <div className="sidebar-header">
              <h3>Pet List</h3>
              <button className="add-pet-btn" onClick={handleAddNewPet}>
                <Plus size={20} />
                Add Pet
              </button>
            </div>
            
            <div className="pet-list">
              {pets.length === 0 ? (
                <div className="no-pets">
                  <Heart size={48} />
                  <p>No pets yet</p>
                  <p>Add your first pet!</p>
                </div>
              ) : (
                pets.map(pet => (
                  <div 
                    key={pet.id} 
                    className={`pet-item ${selectedPet?.id === pet.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div className="pet-avatar">
                      {pet.profileImage ? (
                        <img src={pet.profileImage} alt={pet.name} />
                      ) : (
                        <Heart size={24} />
                      )}
                    </div>
                    <div className="pet-info">
                      <h4>{pet.name}</h4>
                      <p>{pet.species} • {pet.breed}</p>
                    </div>
                    <div className="pet-actions">
                      <button 
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPet(pet);
                        }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePet(pet.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pet Details */}
          <div className="pet-details">
            {!selectedPet && !showAddForm ? (
              <div className="no-selection">
                <Heart size={64} />
                <h3>Select a pet to view details</h3>
                <p>Or add a new pet</p>
              </div>
            ) : (
              <div className="pet-detail-content">
                {isEditing || showAddForm ? (
                  // Edit/Add Form
                  <div className="pet-form">
                    <div className="form-header">
                      <h3>{showAddForm ? 'Add New Pet' : 'Edit Information'}</h3>
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
                        setShowAddForm(false);
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
                ) : (
                  // View Mode
                  <div className="pet-view">
                    <div className="pet-header">
                      <div className="pet-avatar-large">
                        {selectedPet.profileImage ? (
                          <img src={selectedPet.profileImage} alt={selectedPet.name} />
                        ) : (
                          <Heart size={48} />
                        )}
                      </div>
                      <div className="pet-basic-info">
                        <h2>{selectedPet.name}</h2>
                        <p>{selectedPet.species} • {selectedPet.breed}</p>
                        <p>{selectedPet.gender === 'male' ? 'Male' : 'Female'} • {selectedPet.color}</p>
                        {selectedPet.birthDate && (
                          <p>Age: {calculateAge(selectedPet.birthDate)}</p>
                        )}
                      </div>
                      <button className="edit-btn" onClick={() => handleEditPet(selectedPet)}>
                        <Edit3 size={20} />
                        Edit
                      </button>
                    </div>

                    <div className="pet-details-grid">
                      <div className="detail-section">
                        <h4>Basic Information</h4>
                        <div className="detail-list">
                          {selectedPet.weight && (
                            <div className="detail-item">
                              <Scale size={16} />
                              <span>Cân nặng: {selectedPet.weight} kg</span>
                            </div>
                          )}
                          {selectedPet.microchipId && (
                            <div className="detail-item">
                              <Stethoscope size={16} />
                              <span>Microchip: {selectedPet.microchipId}</span>
                            </div>
                          )}
                          {selectedPet.birthDate && (
                            <div className="detail-item">
                              <Calendar size={16} />
                              <span>Ngày sinh: {new Date(selectedPet.birthDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedPet.vetName && (
                        <div className="detail-section">
                          <h4>Thông tin bác sĩ</h4>
                          <div className="detail-list">
                            <div className="detail-item">
                              <User size={16} />
                              <span>Bác sĩ: {selectedPet.vetName}</span>
                            </div>
                            {selectedPet.vetPhone && (
                              <div className="detail-item">
                                <span>Điện thoại: {selectedPet.vetPhone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {selectedPet.allergies && (
                        <div className="detail-section">
                          <h4>Dị ứng</h4>
                          <p>{selectedPet.allergies}</p>
                        </div>
                      )}

                      {selectedPet.medications && (
                        <div className="detail-section">
                          <h4>Thuốc đang dùng</h4>
                          <p>{selectedPet.medications}</p>
                        </div>
                      )}

                      {selectedPet.specialNeeds && (
                        <div className="detail-section">
                          <h4>Nhu cầu đặc biệt</h4>
                          <p>{selectedPet.specialNeeds}</p>
                        </div>
                      )}

                      {selectedPet.personality && (
                        <div className="detail-section">
                          <h4>Tính cách</h4>
                          <p>{selectedPet.personality}</p>
                        </div>
                      )}

                      {selectedPet.favoriteFood && (
                        <div className="detail-section">
                          <h4>Thức ăn yêu thích</h4>
                          <p>{selectedPet.favoriteFood}</p>
                        </div>
                      )}

                      {selectedPet.favoriteActivities && (
                        <div className="detail-section">
                          <h4>Hoạt động yêu thích</h4>
                          <p>{selectedPet.favoriteActivities}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
