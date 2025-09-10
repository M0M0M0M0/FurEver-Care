import React, { useState } from 'react'
import { Heart, User, Mail, Phone, MapPin, Camera, Upload } from 'lucide-react'
import './UserForm.css'

const PetOwnerForm = ({ userName, onComplete }) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: '',
    phone: '',
    address: '',
    petName: '',
    petType: '',
    petBreed: '',
    petAge: '',
    petGender: '',
    petDescription: '',
    profileImage: null
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) newErrors.email = 'Email là bắt buộc'
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc'
    if (!formData.petName) newErrors.petName = 'Tên thú cưng là bắt buộc'
    if (!formData.petType) newErrors.petType = 'Loại thú cưng là bắt buộc'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete('pet-owner', formData)
    }
  }

  return (
    <div className="user-form-container">
      <div className="form-header">
        <div className="form-icon">
          <Heart size={40} />
        </div>
        <h1>Pet Owner Registration</h1>
        <p>Chào mừng {userName}! Hãy hoàn thiện thông tin để bắt đầu hành trình chăm sóc thú cưng của bạn.</p>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        {/* Personal Information */}
        <div className="form-section">
          <h2>Thông tin cá nhân</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">
                <User size={16} />
                Họ và tên *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={16} />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <Phone size={16} />
                Số điện thoại *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">
                <MapPin size={16} />
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ của bạn"
              />
            </div>
          </div>
        </div>

        {/* Pet Information */}
        <div className="form-section">
          <h2>Thông tin thú cưng</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="petName">
                <Heart size={16} />
                Tên thú cưng *
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
              />
              {errors.petName && <span className="error">{errors.petName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petType">Loại thú cưng *</label>
              <select
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              >
                <option value="">Chọn loại thú cưng</option>
                <option value="dog">Chó</option>
                <option value="cat">Mèo</option>
                <option value="bird">Chim</option>
                <option value="fish">Cá</option>
                <option value="rabbit">Thỏ</option>
                <option value="hamster">Hamster</option>
                <option value="other">Khác</option>
              </select>
              {errors.petType && <span className="error">{errors.petType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="petBreed">Giống</label>
              <input
                type="text"
                id="petBreed"
                name="petBreed"
                value={formData.petBreed}
                onChange={handleChange}
                placeholder="Ví dụ: Golden Retriever, Persian..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="petAge">Tuổi</label>
              <input
                type="text"
                id="petAge"
                name="petAge"
                value={formData.petAge}
                onChange={handleChange}
                placeholder="Ví dụ: 2 tuổi, 6 tháng..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="petGender">Giới tính</label>
              <select
                id="petGender"
                name="petGender"
                value={formData.petGender}
                onChange={handleChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Đực</option>
                <option value="female">Cái</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="petDescription">Mô tả thú cưng</label>
              <textarea
                id="petDescription"
                name="petDescription"
                value={formData.petDescription}
                onChange={handleChange}
                rows="4"
                placeholder="Mô tả về tính cách, sở thích, tình trạng sức khỏe của thú cưng..."
              />
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="form-section">
          <h2>Ảnh đại diện</h2>
          <div className="image-upload">
            <div className="upload-area">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="profileImage" className="upload-label">
                <Upload size={24} />
                <span>Tải lên ảnh thú cưng</span>
              </label>
              {formData.profileImage && (
                <p className="file-name">{formData.profileImage.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="skip-btn" onClick={() => onComplete('pet-owner', { name: userName, skip: true })}>
            Bỏ qua (Skip)
          </button>
          <button type="submit" className="submit-btn">
            Hoàn thành đăng ký
          </button>
        </div>
      </form>
    </div>
  )
}

export default PetOwnerForm
