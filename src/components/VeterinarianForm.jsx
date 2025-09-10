import React, { useState } from 'react'
import { Stethoscope, User, Mail, Phone, MapPin, Award, Calendar, Upload } from 'lucide-react'
import './UserForm.css'

const VeterinarianForm = ({ userName, onComplete }) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: 'dr.smith@vetclinic.com',
    phone: '0987654321',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    licenseNumber: 'VET-2023-001',
    specialization: 'Phẫu thuật thú y',
    experience: '5 năm',
    clinicName: 'Phòng khám thú y ABC',
    clinicAddress: '789 Đường DEF, Quận 7, TP.HCM',
    workingHours: '8:00 - 17:00 (Thứ 2 - Thứ 6)',
    services: ['Khám tổng quát', 'Phẫu thuật', 'Tiêm chủng'],
    education: 'Thạc sĩ Thú y - Đại học Nông Lâm TP.HCM',
    certifications: 'Chứng chỉ phẫu thuật nâng cao, Chứng chỉ siêu âm',
    profileImage: null
  })

  const [errors, setErrors] = useState({})

  const serviceOptions = [
    'Khám tổng quát',
    'Phẫu thuật',
    'Tiêm chủng',
    'Xét nghiệm',
    'Chụp X-quang',
    'Siêu âm',
    'Nha khoa thú y',
    'Vật lý trị liệu',
    'Cấp cứu 24/7',
    'Tư vấn dinh dưỡng'
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

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
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
    if (!formData.licenseNumber) newErrors.licenseNumber = 'Số giấy phép hành nghề là bắt buộc'
    if (!formData.specialization) newErrors.specialization = 'Chuyên khoa là bắt buộc'
    if (!formData.clinicName) newErrors.clinicName = 'Tên phòng khám là bắt buộc'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete('veterinarian', formData)
    }
  }

  return (
    <div className="user-form-container">
      <div className="form-header">
        <div className="form-icon veterinarian">
          <Stethoscope size={40} />
        </div>
        <h1>Veterinarian Registration</h1>
        <p>Chào mừng {userName}! Hãy hoàn thiện thông tin để tham gia mạng lưới bác sĩ thú y của chúng tôi.</p>
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

        {/* Professional Information */}
        <div className="form-section">
          <h2>Thông tin chuyên môn</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="licenseNumber">
                <Award size={16} />
                Số giấy phép hành nghề *
              </label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
              {errors.licenseNumber && <span className="error">{errors.licenseNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Chuyên khoa *</label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <option value="">Chọn chuyên khoa</option>
                <option value="general">Thú y tổng quát</option>
                <option value="surgery">Phẫu thuật</option>
                <option value="dermatology">Da liễu</option>
                <option value="cardiology">Tim mạch</option>
                <option value="oncology">Ung thư</option>
                <option value="orthopedics">Chỉnh hình</option>
                <option value="ophthalmology">Mắt</option>
                <option value="dentistry">Nha khoa</option>
                <option value="emergency">Cấp cứu</option>
                <option value="other">Khác</option>
              </select>
              {errors.specialization && <span className="error">{errors.specialization}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="experience">Kinh nghiệm (năm)</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                placeholder="Số năm kinh nghiệm"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="education">Học vấn</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows="3"
                placeholder="Trường đại học, bằng cấp, chứng chỉ..."
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="certifications">Chứng chỉ chuyên môn</label>
              <textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                rows="3"
                placeholder="Các chứng chỉ, khóa học đã tham gia..."
              />
            </div>
          </div>
        </div>

        {/* Clinic Information */}
        <div className="form-section">
          <h2>Thông tin phòng khám</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="clinicName">Tên phòng khám *</label>
              <input
                type="text"
                id="clinicName"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                required
              />
              {errors.clinicName && <span className="error">{errors.clinicName}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="clinicAddress">Địa chỉ phòng khám</label>
              <input
                type="text"
                id="clinicAddress"
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleChange}
                placeholder="Địa chỉ phòng khám"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="workingHours">
                <Calendar size={16} />
                Giờ làm việc
              </label>
              <input
                type="text"
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                placeholder="Ví dụ: Thứ 2-6: 8:00-17:00, Thứ 7: 8:00-12:00"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="form-section">
          <h2>Dịch vụ cung cấp</h2>
          <div className="services-grid">
            {serviceOptions.map((service) => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceChange(service)}
                />
                <span className="checkmark"></span>
                {service}
              </label>
            ))}
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
                <span>Tải lên ảnh chuyên nghiệp</span>
              </label>
              {formData.profileImage && (
                <p className="file-name">{formData.profileImage.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="skip-btn" onClick={() => onComplete('veterinarian', { name: userName, skip: true })}>
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

export default VeterinarianForm
