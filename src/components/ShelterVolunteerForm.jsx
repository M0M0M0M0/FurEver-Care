import React, { useState } from 'react'
import { Home, User, Mail, Phone, MapPin, Heart, Users, Calendar, Upload } from 'lucide-react'
import './UserForm.css'

const ShelterVolunteerForm = ({ userName, onComplete }) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: '',
    phone: '',
    address: '',
    organizationName: '',
    organizationType: '',
    role: '',
    experience: '',
    availability: [],
    skills: [],
    motivation: '',
    emergencyContact: '',
    emergencyPhone: '',
    profileImage: null
  })

  const [errors, setErrors] = useState({})

  const availabilityOptions = [
    'Thứ 2',
    'Thứ 3', 
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
    'Chủ nhật',
    'Buổi sáng (6:00-12:00)',
    'Buổi chiều (12:00-18:00)',
    'Buổi tối (18:00-22:00)',
    'Cuối tuần',
    'Linh hoạt'
  ]

  const skillOptions = [
    'Chăm sóc động vật',
    'Huấn luyện cơ bản',
    'Sơ cứu thú y',
    'Tổ chức sự kiện',
    'Quản lý mạng xã hội',
    'Chụp ảnh/video',
    'Dịch thuật',
    'Tư vấn pháp lý',
    'Gây quỹ',
    'Vận chuyển động vật',
    'Dọn dẹp chuồng trại',
    'Tìm nhà cho thú cưng',
    'Khác'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
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
    if (!formData.organizationName) newErrors.organizationName = 'Tên tổ chức là bắt buộc'
    if (!formData.role) newErrors.role = 'Vai trò là bắt buộc'
    if (!formData.motivation) newErrors.motivation = 'Lý do tham gia là bắt buộc'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete('shelter-volunteer', formData)
    }
  }

  return (
    <div className="user-form-container">
      <div className="form-header">
        <div className="form-icon shelter">
          <Home size={40} />
        </div>
        <h1>Animal Shelter / Rescue Volunteer Registration</h1>
        <p>Chào mừng {userName}! Cảm ơn bạn đã quan tâm đến việc cứu hộ và chăm sóc động vật.</p>
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

        {/* Organization Information */}
        <div className="form-section">
          <h2>Thông tin tổ chức</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="organizationName">Tên tổ chức *</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
              />
              {errors.organizationName && <span className="error">{errors.organizationName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="organizationType">Loại tổ chức</label>
              <select
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
              >
                <option value="">Chọn loại tổ chức</option>
                <option value="shelter">Trại cứu hộ</option>
                <option value="rescue">Nhóm cứu hộ</option>
                <option value="foster">Nhà tạm trú</option>
                <option value="adoption">Trung tâm nhận nuôi</option>
                <option value="clinic">Phòng khám thú y</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Vai trò trong tổ chức *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Chọn vai trò</option>
                <option value="volunteer">Tình nguyện viên</option>
                <option value="coordinator">Điều phối viên</option>
                <option value="foster-parent">Cha mẹ nuôi tạm</option>
                <option value="fundraiser">Người gây quỹ</option>
                <option value="social-media">Quản lý mạng xã hội</option>
                <option value="transport">Vận chuyển</option>
                <option value="admin">Quản trị viên</option>
                <option value="other">Khác</option>
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Kinh nghiệm (tháng)</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                placeholder="Số tháng kinh nghiệm"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="form-section">
          <h2>
            <Calendar size={20} />
            Thời gian có thể tham gia
          </h2>
          <div className="checkbox-grid">
            {availabilityOptions.map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.availability.includes(option)}
                  onChange={() => handleArrayChange('availability', option)}
                />
                <span className="checkmark"></span>
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h2>
            <Heart size={20} />
            Kỹ năng và sở trường
          </h2>
          <div className="checkbox-grid">
            {skillOptions.map((skill) => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleArrayChange('skills', skill)}
                />
                <span className="checkmark"></span>
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="form-section">
          <h2>Lý do tham gia</h2>
          <div className="form-group">
            <label htmlFor="motivation">Tại sao bạn muốn tham gia hoạt động cứu hộ động vật? *</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows="5"
              placeholder="Chia sẻ động lực và mong muốn của bạn..."
              required
            />
            {errors.motivation && <span className="error">{errors.motivation}</span>}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="form-section">
          <h2>Liên hệ khẩn cấp</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="emergencyContact">Tên người liên hệ khẩn cấp</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Họ tên người thân"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyPhone">Số điện thoại liên hệ khẩn cấp</label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder="Số điện thoại"
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
                <span>Tải lên ảnh đại diện</span>
              </label>
              {formData.profileImage && (
                <p className="file-name">{formData.profileImage.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="skip-btn" onClick={() => onComplete('shelter-volunteer', { name: userName, skip: true })}>
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

export default ShelterVolunteerForm
