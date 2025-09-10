import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  FileText, 
  Activity,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Eye,
  Download,
  Plus
} from 'lucide-react'
import './VeterinarianDashboard.css'

const VeterinarianDashboard = ({ userData, userName }) => {
  const [activeTab, setActiveTab] = useState('appointments')
  const [appointments, setAppointments] = useState([])
  const [medicalHistory, setMedicalHistory] = useState([])
  const [treatmentRecords, setTreatmentRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - trong thực tế sẽ lấy từ API
  useEffect(() => {
    // Mock appointments data
    setAppointments([
      {
        id: 1,
        petName: 'Buddy',
        ownerName: 'Nguyễn Văn A',
        ownerPhone: '0987654321',
        appointmentTime: '2024-01-15 09:00',
        status: 'confirmed',
        reason: 'Khám định kỳ',
        petType: 'Chó',
        breed: 'Golden Retriever',
        age: '3 tuổi'
      },
      {
        id: 2,
        petName: 'Mimi',
        ownerName: 'Trần Thị B',
        ownerPhone: '0987654322',
        appointmentTime: '2024-01-15 10:30',
        status: 'pending',
        reason: 'Tiêm phòng',
        petType: 'Mèo',
        breed: 'Persian',
        age: '1 tuổi'
      },
      {
        id: 3,
        petName: 'Max',
        ownerName: 'Lê Văn C',
        ownerPhone: '0987654323',
        appointmentTime: '2024-01-15 14:00',
        status: 'completed',
        reason: 'Phẫu thuật',
        petType: 'Chó',
        breed: 'German Shepherd',
        age: '5 tuổi'
      }
    ])

    // Mock medical history data
    setMedicalHistory([
      {
        id: 1,
        petName: 'Buddy',
        ownerName: 'Nguyễn Văn A',
        visitDate: '2024-01-10',
        diagnosis: 'Viêm tai',
        treatment: 'Thuốc kháng sinh',
        vetNotes: 'Tình trạng tốt, cần theo dõi',
        nextVisit: '2024-01-20'
      },
      {
        id: 2,
        petName: 'Mimi',
        ownerName: 'Trần Thị B',
        visitDate: '2024-01-08',
        diagnosis: 'Tiêm phòng định kỳ',
        treatment: 'Vaccine 5 bệnh',
        vetNotes: 'Phản ứng tốt với vaccine',
        nextVisit: '2024-02-08'
      }
    ])

    // Mock treatment records data
    setTreatmentRecords([
      {
        id: 1,
        petName: 'Max',
        ownerName: 'Lê Văn C',
        treatmentDate: '2024-01-12',
        procedure: 'Phẫu thuật cắt bỏ khối u',
        medications: ['Antibiotic', 'Pain relief'],
        followUp: '2024-01-19',
        status: 'Recovering well',
        cost: '2,500,000 VNĐ'
      },
      {
        id: 2,
        petName: 'Buddy',
        ownerName: 'Nguyễn Văn A',
        treatmentDate: '2024-01-10',
        procedure: 'Điều trị viêm tai',
        medications: ['Ear drops', 'Antibiotic'],
        followUp: '2024-01-20',
        status: 'Treatment completed',
        cost: '450,000 VNĐ'
      }
    ])
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed'
      case 'pending': return 'status-pending'
      case 'completed': return 'status-completed'
      case 'cancelled': return 'status-cancelled'
      default: return 'status-default'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận'
      case 'pending': return 'Chờ xác nhận'
      case 'completed': return 'Hoàn thành'
      case 'cancelled': return 'Đã hủy'
      default: return status
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const renderAppointments = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Lịch hẹn</h2>
        <div className="section-controls">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên thú cưng hoặc chủ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="appointments-grid">
        {filteredAppointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <div className="pet-info">
                <h3>{appointment.petName}</h3>
                <p>{appointment.petType} - {appointment.breed}</p>
                <p>Tuổi: {appointment.age}</p>
              </div>
              <div className={`status-badge ${getStatusColor(appointment.status)}`}>
                {getStatusText(appointment.status)}
              </div>
            </div>

            <div className="appointment-details">
              <div className="detail-row">
                <User size={16} />
                <span>{appointment.ownerName}</span>
              </div>
              <div className="detail-row">
                <Phone size={16} />
                <span>{appointment.ownerPhone}</span>
              </div>
              <div className="detail-row">
                <Clock size={16} />
                <span>{appointment.appointmentTime}</span>
              </div>
              <div className="detail-row">
                <Stethoscope size={16} />
                <span>{appointment.reason}</span>
              </div>
            </div>

            <div className="appointment-actions">
              <button className="btn-secondary">
                <Eye size={16} />
                Xem chi tiết
              </button>
              {appointment.status === 'pending' && (
                <button className="btn-primary">
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMedicalHistory = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Lịch sử y tế</h2>
        <button className="btn-primary">
          <Plus size={16} />
          Thêm hồ sơ
        </button>
      </div>

      <div className="medical-history-list">
        {medicalHistory.map(record => (
          <div key={record.id} className="history-card">
            <div className="history-header">
              <div className="pet-info">
                <h3>{record.petName}</h3>
                <p>Chủ: {record.ownerName}</p>
              </div>
              <div className="visit-date">
                <Calendar size={16} />
                <span>{record.visitDate}</span>
              </div>
            </div>

            <div className="history-content">
              <div className="diagnosis-section">
                <h4>Chẩn đoán:</h4>
                <p>{record.diagnosis}</p>
              </div>
              <div className="treatment-section">
                <h4>Điều trị:</h4>
                <p>{record.treatment}</p>
              </div>
              <div className="notes-section">
                <h4>Ghi chú bác sĩ:</h4>
                <p>{record.vetNotes}</p>
              </div>
              {record.nextVisit && (
                <div className="next-visit">
                  <h4>Lần khám tiếp theo:</h4>
                  <p>{record.nextVisit}</p>
                </div>
              )}
            </div>

            <div className="history-actions">
              <button className="btn-secondary">
                <Eye size={16} />
                Xem chi tiết
              </button>
              <button className="btn-secondary">
                <Download size={16} />
                Xuất PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTreatmentRecords = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Hồ sơ điều trị</h2>
        <button className="btn-primary">
          <Plus size={16} />
          Thêm hồ sơ
        </button>
      </div>

      <div className="treatment-records-list">
        {treatmentRecords.map(record => (
          <div key={record.id} className="treatment-card">
            <div className="treatment-header">
              <div className="pet-info">
                <h3>{record.petName}</h3>
                <p>Chủ: {record.ownerName}</p>
              </div>
              <div className="treatment-date">
                <Calendar size={16} />
                <span>{record.treatmentDate}</span>
              </div>
            </div>

            <div className="treatment-content">
              <div className="procedure-section">
                <h4>Thủ thuật:</h4>
                <p>{record.procedure}</p>
              </div>
              <div className="medications-section">
                <h4>Thuốc:</h4>
                <ul>
                  {record.medications.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              </div>
              <div className="follow-up-section">
                <h4>Tái khám:</h4>
                <p>{record.followUp}</p>
              </div>
              <div className="status-section">
                <h4>Tình trạng:</h4>
                <p className="status-text">{record.status}</p>
              </div>
              <div className="cost-section">
                <h4>Chi phí:</h4>
                <p className="cost-text">{record.cost}</p>
              </div>
            </div>

            <div className="treatment-actions">
              <button className="btn-secondary">
                <Eye size={16} />
                Xem chi tiết
              </button>
              <button className="btn-secondary">
                <Download size={16} />
                Xuất báo cáo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="veterinarian-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="vet-profile">
          <div className="profile-avatar">
            <Stethoscope size={32} />
          </div>
          <div className="profile-info">
            <h1>Xin chào, {userName || 'Bác sĩ'}</h1>
            <p>Bảng điều khiển bác sĩ thú y</p>
            {userData && (
              <div className="vet-details">
                <span>{userData.specialization}</span>
                <span>•</span>
                <span>{userData.clinicName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <button
          className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <Calendar size={20} />
          Lịch hẹn
        </button>
        <button
          className={`nav-tab ${activeTab === 'medical-history' ? 'active' : ''}`}
          onClick={() => setActiveTab('medical-history')}
        >
          <FileText size={20} />
          Lịch sử y tế
        </button>
        <button
          className={`nav-tab ${activeTab === 'treatment-records' ? 'active' : ''}`}
          onClick={() => setActiveTab('treatment-records')}
        >
          <Activity size={20} />
          Hồ sơ điều trị
        </button>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {activeTab === 'appointments' && renderAppointments()}
        {activeTab === 'medical-history' && renderMedicalHistory()}
        {activeTab === 'treatment-records' && renderTreatmentRecords()}
      </div>
    </div>
  )
}

export default VeterinarianDashboard
