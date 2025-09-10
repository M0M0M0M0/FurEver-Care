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
      alert('Vui lòng điền tên và loài thú cưng');
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
    if (window.confirm('Bạn có chắc chắn muốn xóa hồ sơ thú cưng này?')) {
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
      return `${ageInMonths} tháng`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} tuổi ${months} tháng` : `${years} tuổi`;
    }
  };

  return (
    <div className="pet-profile-overlay">
      <div className="pet-profile-container">
        <div className="pet-profile-header">
          <div>
            <h2>Quản lý hồ sơ thú cưng</h2>
            {userData && userData.petName && (
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
                Thông tin từ form đăng ký đã được tự động tạo
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
              <h3>Danh sách thú cưng</h3>
              <button className="add-pet-btn" onClick={handleAddNewPet}>
                <Plus size={20} />
                Thêm thú cưng
              </button>
            </div>
            
            <div className="pet-list">
              {pets.length === 0 ? (
                <div className="no-pets">
                  <Heart size={48} />
                  <p>Chưa có thú cưng nào</p>
                  <p>Hãy thêm thú cưng đầu tiên của bạn!</p>
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
                <h3>Chọn thú cưng để xem chi tiết</h3>
                <p>Hoặc thêm thú cưng mới</p>
              </div>
            ) : (
              <div className="pet-detail-content">
                {isEditing || showAddForm ? (
                  // Edit/Add Form
                  <div className="pet-form">
                    <div className="form-header">
                      <h3>{showAddForm ? 'Thêm thú cưng mới' : 'Chỉnh sửa thông tin'}</h3>
                    </div>

                    <div className="form-sections">
                      {/* Basic Information */}
                      <div className="form-section">
                        <h4>Thông tin cơ bản</h4>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Tên thú cưng *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Nhập tên thú cưng"
                            />
                          </div>
                          <div className="form-group">
                            <label>Loài *</label>
                            <select
                              name="species"
                              value={formData.species}
                              onChange={handleInputChange}
                            >
                              <option value="">Chọn loài</option>
                              <option value="dog">Chó</option>
                              <option value="cat">Mèo</option>
                              <option value="bird">Chim</option>
                              <option value="fish">Cá</option>
                              <option value="rabbit">Thỏ</option>
                              <option value="hamster">Hamster</option>
                              <option value="other">Khác</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Giống</label>
                            <input
                              type="text"
                              name="breed"
                              value={formData.breed}
                              onChange={handleInputChange}
                              placeholder="Ví dụ: Golden Retriever"
                            />
                          </div>
                          <div className="form-group">
                            <label>Giới tính</label>
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                            >
                              <option value="">Chọn giới tính</option>
                              <option value="male">Đực</option>
                              <option value="female">Cái</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Màu sắc</label>
                            <input
                              type="text"
                              name="color"
                              value={formData.color}
                              onChange={handleInputChange}
                              placeholder="Màu lông, mắt..."
                            />
                          </div>
                          <div className="form-group">
                            <label>Ngày sinh</label>
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
                        <h4>Thông tin thể chất</h4>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Cân nặng (kg)</label>
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
                              placeholder="Số microchip"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Health Information */}
                      <div className="form-section">
                        <h4>Thông tin sức khỏe</h4>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Tên bác sĩ thú y</label>
                            <input
                              type="text"
                              name="vetName"
                              value={formData.vetName}
                              onChange={handleInputChange}
                              placeholder="Tên bác sĩ"
                            />
                          </div>
                          <div className="form-group">
                            <label>Số điện thoại bác sĩ</label>
                            <input
                              type="tel"
                              name="vetPhone"
                              value={formData.vetPhone}
                              onChange={handleInputChange}
                              placeholder="Số điện thoại"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Dị ứng</label>
                            <textarea
                              name="allergies"
                              value={formData.allergies}
                              onChange={handleInputChange}
                              placeholder="Liệt kê các dị ứng..."
                              rows="3"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Thuốc đang dùng</label>
                            <textarea
                              name="medications"
                              value={formData.medications}
                              onChange={handleInputChange}
                              placeholder="Liệt kê các loại thuốc..."
                              rows="3"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Nhu cầu đặc biệt</label>
                            <textarea
                              name="specialNeeds"
                              value={formData.specialNeeds}
                              onChange={handleInputChange}
                              placeholder="Mô tả nhu cầu đặc biệt..."
                              rows="3"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Personality & Preferences */}
                      <div className="form-section">
                        <h4>Tính cách & Sở thích</h4>
                        <div className="form-grid">
                          <div className="form-group full-width">
                            <label>Tính cách</label>
                            <textarea
                              name="personality"
                              value={formData.personality}
                              onChange={handleInputChange}
                              placeholder="Mô tả tính cách..."
                              rows="3"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Thức ăn yêu thích</label>
                            <textarea
                              name="favoriteFood"
                              value={formData.favoriteFood}
                              onChange={handleInputChange}
                              placeholder="Liệt kê thức ăn yêu thích..."
                              rows="2"
                            />
                          </div>
                          <div className="form-group full-width">
                            <label>Hoạt động yêu thích</label>
                            <textarea
                              name="favoriteActivities"
                              value={formData.favoriteActivities}
                              onChange={handleInputChange}
                              placeholder="Liệt kê hoạt động yêu thích..."
                              rows="2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Profile Image */}
                      <div className="form-section">
                        <h4>Ảnh đại diện</h4>
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
                            <span>Tải lên ảnh thú cưng</span>
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
                        Hủy
                      </button>
                      <button className="save-btn" onClick={handleSavePet}>
                        <Save size={20} />
                        Lưu thông tin
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
                        <p>{selectedPet.gender === 'male' ? 'Đực' : 'Cái'} • {selectedPet.color}</p>
                        {selectedPet.birthDate && (
                          <p>Tuổi: {calculateAge(selectedPet.birthDate)}</p>
                        )}
                      </div>
                      <button className="edit-btn" onClick={() => handleEditPet(selectedPet)}>
                        <Edit3 size={20} />
                        Chỉnh sửa
                      </button>
                    </div>

                    <div className="pet-details-grid">
                      <div className="detail-section">
                        <h4>Thông tin cơ bản</h4>
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
