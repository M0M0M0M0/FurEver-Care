import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Plus,
  AlertTriangle
} from 'lucide-react'
import ScrollingInfoBar from '../components/ScrollingInfoBar'
import Footer from '../components/Footer'
import './VeterinarianDashboard.css'

const VeterinarianDashboard = ({ userData, userName }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('appointments')
  const [appointments, setAppointments] = useState([])
  const [medicalHistory, setMedicalHistory] = useState([])
  const [treatmentRecords, setTreatmentRecords] = useState([])
  const [scheduleSlots, setScheduleSlots] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [avatarUrl, setAvatarUrl] = useState(null)

  // Helper function to create avatar URL and cleanup
  const getAvatarUrl = useCallback(() => {
    if (userData && userData.profileImage) {
      if (userData.profileImage instanceof File) {
        const url = URL.createObjectURL(userData.profileImage)
        setAvatarUrl(url)
        return url
      }
      return userData.profileImage
    }
    return null
  }, [userData])

  // Cleanup URL when component unmounts or userData changes
  useEffect(() => {
    const url = getAvatarUrl()
    return () => {
      if (url && userData && userData.profileImage instanceof File) {
        URL.revokeObjectURL(url)
      }
    }
  }, [getAvatarUrl, userData])

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Mock appointments data
    setAppointments([
      {
        id: 1,
        petName: 'Buddy',
        ownerName: 'John Smith',
        ownerPhone: '0987654321',
        appointmentTime: '2024-01-15 09:00',
        status: 'confirmed',
        reason: 'Regular Checkup',
        petType: 'Dog',
        breed: 'Golden Retriever',
        age: '3 years old'
      },
      {
        id: 2,
        petName: 'Mimi',
        ownerName: 'Sarah Johnson',
        ownerPhone: '0987654322',
        appointmentTime: '2024-01-15 10:30',
        status: 'pending',
        reason: 'Vaccination',
        petType: 'Cat',
        breed: 'Persian',
        age: '1 year old'
      },
      {
        id: 3,
        petName: 'Max',
        ownerName: 'Mike Wilson',
        ownerPhone: '0987654323',
        appointmentTime: '2024-01-15 14:00',
        status: 'completed',
        reason: 'Surgery',
        petType: 'Dog',
        breed: 'German Shepherd',
        age: '5 years old'
      }
    ])

    // Mock medical history data
    setMedicalHistory([
      {
        id: 1,
        petName: 'Buddy',
        ownerName: 'John Smith',
        visitDate: '2024-01-10',
        diagnosis: 'Ear Infection',
        treatment: 'Antibiotics',
        vetNotes: 'Good condition, needs monitoring',
        nextVisit: '2024-01-20'
      },
      {
        id: 2,
        petName: 'Mimi',
        ownerName: 'Sarah Johnson',
        visitDate: '2024-01-08',
        diagnosis: 'Regular Vaccination',
        treatment: '5-in-1 Vaccine',
        vetNotes: 'Good response to vaccine',
        nextVisit: '2024-02-08'
      }
    ])

    // Mock treatment records data
    setTreatmentRecords([
      {
        id: 1,
        petName: 'Max',
        ownerName: 'Mike Wilson',
        treatmentDate: '2024-01-12',
        procedure: 'Tumor Removal Surgery',
        medications: ['Antibiotic', 'Pain relief'],
        followUp: '2024-01-19',
        status: 'Recovering well',
        cost: '$100'
      },
      {
        id: 2,
        petName: 'Buddy',
        ownerName: 'John Smith',
        treatmentDate: '2024-01-10',
        procedure: 'Ear Infection Treatment',
        medications: ['Ear drops', 'Antibiotic'],
        followUp: '2024-01-20',
        status: 'Treatment completed',
        cost: '$18'
      }
    ])

    // Mock schedule slots data
    setScheduleSlots([
      {
        id: 1,
        date: '2024-01-15',
        timeSlots: [
          { time: '08:00', status: 'available', appointmentId: null },
          { time: '08:30', status: 'booked', appointmentId: 1, petName: 'Buddy', ownerName: 'John Smith' },
          { time: '09:00', status: 'booked', appointmentId: 1, petName: 'Buddy', ownerName: 'John Smith' },
          { time: '09:30', status: 'available', appointmentId: null },
          { time: '10:00', status: 'available', appointmentId: null },
          { time: '10:30', status: 'booked', appointmentId: 2, petName: 'Mimi', ownerName: 'Sarah Johnson' },
          { time: '11:00', status: 'booked', appointmentId: 2, petName: 'Mimi', ownerName: 'Sarah Johnson' },
          { time: '11:30', status: 'available', appointmentId: null },
          { time: '14:00', status: 'booked', appointmentId: 3, petName: 'Max', ownerName: 'Mike Wilson' },
          { time: '14:30', status: 'booked', appointmentId: 3, petName: 'Max', ownerName: 'Mike Wilson' },
          { time: '15:00', status: 'available', appointmentId: null },
          { time: '15:30', status: 'available', appointmentId: null },
          { time: '16:00', status: 'available', appointmentId: null },
          { time: '16:30', status: 'available', appointmentId: null },
          { time: '17:00', status: 'available', appointmentId: null }
        ]
      },
      {
        id: 2,
        date: '2024-01-16',
        timeSlots: [
          { time: '08:00', status: 'available', appointmentId: null },
          { time: '08:30', status: 'available', appointmentId: null },
          { time: '09:00', status: 'booked', appointmentId: 4, petName: 'Luna', ownerName: 'Emma Davis' },
          { time: '09:30', status: 'booked', appointmentId: 4, petName: 'Luna', ownerName: 'Emma Davis' },
          { time: '10:00', status: 'available', appointmentId: null },
          { time: '10:30', status: 'available', appointmentId: null },
          { time: '11:00', status: 'booked', appointmentId: 5, petName: 'Charlie', ownerName: 'David Brown' },
          { time: '11:30', status: 'booked', appointmentId: 5, petName: 'Charlie', ownerName: 'David Brown' },
          { time: '14:00', status: 'available', appointmentId: null },
          { time: '14:30', status: 'available', appointmentId: null },
          { time: '15:00', status: 'booked', appointmentId: 6, petName: 'Bella', ownerName: 'Lisa Wilson' },
          { time: '15:30', status: 'booked', appointmentId: 6, petName: 'Bella', ownerName: 'Lisa Wilson' },
          { time: '16:00', status: 'available', appointmentId: null },
          { time: '16:30', status: 'available', appointmentId: null },
          { time: '17:00', status: 'available', appointmentId: null }
        ]
      },
      {
        id: 3,
        date: '2024-01-17',
        timeSlots: [
          { time: '08:00', status: 'booked', appointmentId: 7, petName: 'Rocky', ownerName: 'Tom Anderson' },
          { time: '08:30', status: 'booked', appointmentId: 7, petName: 'Rocky', ownerName: 'Tom Anderson' },
          { time: '09:00', status: 'available', appointmentId: null },
          { time: '09:30', status: 'available', appointmentId: null },
          { time: '10:00', status: 'booked', appointmentId: 8, petName: 'Sophie', ownerName: 'Anna Taylor' },
          { time: '10:30', status: 'booked', appointmentId: 8, petName: 'Sophie', ownerName: 'Anna Taylor' },
          { time: '11:00', status: 'available', appointmentId: null },
          { time: '11:30', status: 'available', appointmentId: null },
          { time: '14:00', status: 'available', appointmentId: null },
          { time: '14:30', status: 'available', appointmentId: null },
          { time: '15:00', status: 'available', appointmentId: null },
          { time: '15:30', status: 'booked', appointmentId: 9, petName: 'Oscar', ownerName: 'Mark Johnson' },
          { time: '16:00', status: 'booked', appointmentId: 9, petName: 'Oscar', ownerName: 'Mark Johnson' },
          { time: '16:30', status: 'available', appointmentId: null },
          { time: '17:00', status: 'available', appointmentId: null }
        ]
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
      case 'confirmed': return 'Confirmed'
      case 'pending': return 'Pending'
      case 'completed': return 'Completed'
      case 'cancelled': return 'Cancelled'
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
      <div className="vet-dashboard-section-header">
        <h2>Appointments</h2>
        <div className="section-controls">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by pet name or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
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
                <p>Age: {appointment.age}</p>
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
                View Details
              </button>
              {appointment.status === 'pending' && (
                <button className="btn-primary">
                  Confirm
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
      <div className="vet-dashboard-section-header">
        <h2>Medical History</h2>
        <button className="btn-primary">
          <Plus size={16} />
          Add Record
        </button>
      </div>

      <div className="medical-history-list">
        {medicalHistory.map(record => (
          <div key={record.id} className="history-card">
            <div className="history-header">
              <div className="pet-info">
                <h3>{record.petName}</h3>
                <p>Owner: {record.ownerName}</p>
              </div>
              <div className="visit-date">
                <Calendar size={16} />
                <span>{record.visitDate}</span>
              </div>
            </div>

            <div className="history-content">
              <div className="diagnosis-section">
                <h4>Diagnosis:</h4>
                <p>{record.diagnosis}</p>
              </div>
              <div className="treatment-section">
                <h4>Treatment:</h4>
                <p>{record.treatment}</p>
              </div>
              <div className="notes-section">
                <h4>Veterinarian Notes:</h4>
                <p>{record.vetNotes}</p>
              </div>
              {record.nextVisit && (
                <div className="next-visit">
                  <h4>Next Visit:</h4>
                  <p>{record.nextVisit}</p>
                </div>
              )}
            </div>

            <div className="history-actions">
              <button className="btn-secondary">
                <Eye size={16} />
                View Details
              </button>
              <button className="btn-secondary">
                <Download size={16} />
                Export PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTreatmentRecords = () => (
    <div className="dashboard-section">
      <div className="vet-dashboard-section-header">
        <h2>Treatment Records</h2>
        <button className="btn-primary">
          <Plus size={16} />
          Add Record
        </button>
      </div>

      <div className="treatment-records-list">
        {treatmentRecords.map(record => (
          <div key={record.id} className="treatment-card">
            <div className="treatment-header">
              <div className="pet-info">
                <h3>{record.petName}</h3>
                <p>Owner: {record.ownerName}</p>
              </div>
              <div className="treatment-date">
                <Calendar size={16} />
                <span>{record.treatmentDate}</span>
              </div>
            </div>

            <div className="treatment-content">
              <div className="procedure-section">
                <h4>Procedure:</h4>
                <p>{record.procedure}</p>
              </div>
              <div className="medications-section">
                <h4>Medications:</h4>
                <ul>
                  {record.medications.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              </div>
              <div className="follow-up-section">
                <h4>Follow-up:</h4>
                <p>{record.followUp}</p>
              </div>
              <div className="status-section">
                <h4>Status:</h4>
                <p className="status-text">{record.status}</p>
              </div>
              <div className="cost-section">
                <h4>Cost:</h4>
                <p className="cost-text">{record.cost}</p>
              </div>
            </div>

            <div className="treatment-actions">
              <button className="btn-secondary">
                <Eye size={16} />
                View Details
              </button>
              <button className="btn-secondary">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSchedule = () => (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>Appointment Schedule</h2>
        <p>View available time slots and booked appointments</p>
      </div>

      <div className="schedule-grid">
        {scheduleSlots.map(day => (
          <div key={day.id} className="schedule-day">
            <div className="day-header">
              <h3>{new Date(day.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</h3>
            </div>
            
            <div className="time-slots">
              {day.timeSlots.map((slot, index) => (
                <div 
                  key={index} 
                  className={`time-slot ${slot.status}`}
                >
                  <div className="slot-time">
                    <Clock size={14} />
                    <span>{slot.time}</span>
                  </div>
                  
                  {slot.status === 'booked' ? (
                    <div className="slot-booking">
                      <div className="booking-info">
                        <User size={14} />
                        <span>{slot.petName}</span>
                      </div>
                      <div className="booking-owner">
                        <span>{slot.ownerName}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="slot-available">
                      <span>Available</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="schedule-legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
    <div className="veterinarian-dashboard">
      <ScrollingInfoBar />
      {/* Header */}
      <div className="dashboard-header">
        <div className="vet-profile">
          <div className="profile-avatar">
            {userData && userData.profileImage ? (
              <img 
                src={avatarUrl || getAvatarUrl()}
                alt="Veterinarian Profile"
                className="avatar-image"
              />
            ) : (
              <Stethoscope size={32} />
            )}
          </div>
          <div className="profile-info">
            <h1>{userData?.name || userName || 'Doctor'}</h1>
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
          Appointments
        </button>
        <button
          className={`nav-tab ${activeTab === 'medical-history' ? 'active' : ''}`}
          onClick={() => setActiveTab('medical-history')}
        >
          <FileText size={20} />
          Medical History
        </button>
        <button
          className={`nav-tab ${activeTab === 'treatment-records' ? 'active' : ''}`}
          onClick={() => setActiveTab('treatment-records')}
        >
          <Activity size={20} />
          Treatment Records
        </button>
        <button
          className={`nav-tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          <Clock size={20} />
          Schedule
        </button>
        <button
          className="nav-tab emergency-tab"
          onClick={() => navigate('/emergency-vet')}
        >
          <AlertTriangle size={20} />
          Emergency & Vet Help
        </button>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {activeTab === 'appointments' && renderAppointments()}
        {activeTab === 'medical-history' && renderMedicalHistory()}
        {activeTab === 'treatment-records' && renderTreatmentRecords()}
        {activeTab === 'schedule' && renderSchedule()}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default VeterinarianDashboard
