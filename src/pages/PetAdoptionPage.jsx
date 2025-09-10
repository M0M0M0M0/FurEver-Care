import React, { useState, useEffect } from 'react'
import { 
  Heart, 
  Filter, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  Users,
  Star,
  ChevronRight,
  ChevronLeft,
  Share2,
  Download
} from 'lucide-react'
import './PetAdoptionPage.css'

const PetAdoptionPage = ({ userData, userName }) => {
  const [activeSection, setActiveSection] = useState('gallery')
  const [pets, setPets] = useState([])
  const [filteredPets, setFilteredPets] = useState([])
  const [filters, setFilters] = useState({
    type: 'all',
    age: 'all',
    breed: 'all',
    location: 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [successStories, setSuccessStories] = useState([])
  const [events, setEvents] = useState([])

  // Load pets data from JSON file
  useEffect(() => {
    const loadPetsData = async () => {
      try {
        const response = await fetch('/json/pets.json')
        const data = await response.json()
        setPets(data.pets)
      } catch (error) {
        console.error('Error loading pets data:', error)
        // Fallback to empty array if JSON fails to load
        setPets([])
      }
    }

    loadPetsData()

    // Mock success stories
    setSuccessStories([
      {
        id: 1,
        title: 'Bella Found Her Loving Family',
        petName: 'Bella',
        petType: 'Dog',
        ownerName: 'Nguyen Family',
        story: 'Bella was adopted 6 months ago. She has integrated very well with her new family and become a close friend to the two children.',
        beforeImage: '/img/19960-avocado-salad-VAT-001-4x3-64241afdc3b04d00a9372e1573eac6f7.jpg',
        afterImage: '/img/about_v1_9.jpg',
        adoptionDate: '2023-07-15',
        location: 'Ho Chi Minh City'
      },
      {
        id: 2,
        title: 'Whiskers and Her New Life',
        petName: 'Whiskers',
        petType: 'Cat',
        ownerName: 'Ms. Minh',
        story: 'Whiskers found the perfect home with Ms. Minh. She is very happy and healthy in her new environment.',
        beforeImage: '/img/3aeeee1d04b16f5ab613337aca0721e7.jpg',
        afterImage: '/img/banner-2021-04-16T110729.441.jpg',
        adoptionDate: '2023-08-20',
        location: 'Hanoi'
      }
    ])

    // Mock events
    setEvents([
      {
        id: 1,
        title: 'Summer 2024 Adoption Campaign',
        type: 'adoption',
        date: '2024-06-15',
        time: '09:00 - 17:00',
        location: 'Le Van Tam Park, Ho Chi Minh City',
        description: 'The biggest pet adoption event of the year with over 100 pets waiting for loving families.',
        image: '/img/field.jpg'
      },
      {
        id: 2,
        title: 'Free Vaccination Clinic',
        type: 'vaccination',
        date: '2024-06-22',
        time: '08:00 - 16:00',
        location: 'Animal Rescue Center, Hanoi',
        description: 'Free vaccination for pets adopted from our rescue center.',
        image: '/img/lamtruong.jpg'
      },
      {
        id: 3,
        title: 'Pet Care Workshop',
        type: 'workshop',
        date: '2024-07-05',
        time: '14:00 - 17:00',
        location: 'Convention Center, Da Nang',
        description: 'Learn proper pet care from veterinary experts.',
        image: '/img/veg.jpg'
      }
    ])
  }, [])

  // Filter pets based on current filters and search term
  useEffect(() => {
    let filtered = pets.filter(pet => {
      const matchesType = filters.type === 'all' || pet.type === filters.type
      const matchesAge = filters.age === 'all' || 
        (filters.age === 'young' && (pet.age.includes('months') || pet.age.includes('1 year'))) ||
        (filters.age === 'adult' && (pet.age.includes('2 years') || pet.age.includes('3 years'))) ||
        (filters.age === 'senior' && (pet.age.includes('4 years') || pet.age.includes('5 years')))
      const matchesBreed = filters.breed === 'all' || pet.breed.toLowerCase().includes(filters.breed.toLowerCase())
      const matchesLocation = filters.location === 'all' || pet.location === filters.location
      const matchesSearch = searchTerm === '' || 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesType && matchesAge && matchesBreed && matchesLocation && matchesSearch
    })
    setFilteredPets(filtered)
  }, [pets, filters, searchTerm])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const getTypeText = (type) => {
    switch (type) {
      case 'dog': return 'Dog'
      case 'cat': return 'Cat'
      case 'rabbit': return 'Rabbit'
      default: return type
    }
  }

  const getEventTypeText = (type) => {
    switch (type) {
      case 'adoption': return 'Adoption'
      case 'vaccination': return 'Vaccination'
      case 'workshop': return 'Workshop'
      default: return type
    }
  }

  const renderGallery = () => (
    <div className="gallery-section">
      <div className="section-header">
        <h2>Pet Gallery</h2>
        <p>Find the perfect companion for your family</p>
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-box">
          <Search size={20} style={{transform: 'translateX(10px) translateY(-10px)'}}/>
          <input
            type="text"
            placeholder="Search by name, breed or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Type:</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Age:</label>
            <select
              value={filters.age}
              onChange={(e) => handleFilterChange('age', e.target.value)}
            >
              <option value="all">All</option>
              <option value="young">Young (under 2 years)</option>
              <option value="adult">Adult (2-4 years)</option>
              <option value="senior">Senior (over 4 years)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Breed:</label>
            <input
              type="text"
              placeholder="Enter breed..."
              value={filters.breed}
              onChange={(e) => handleFilterChange('breed', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Location:</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="all">All</option>
              <option value="Ho Chi Minh City">Ho Chi Minh City</option>
              <option value="Hanoi">Hanoi</option>
              <option value="Da Nang">Da Nang</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="pets-grid">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image">
              <img src={pet.image} alt={pet.name} />
              <div className="pet-badges">
                {pet.vaccinated && <span className="badge vaccinated">Vaccinated</span>}
                {pet.neutered && <span className="badge neutered">Neutered</span>}
              </div>
            </div>

            <div className="pet-info">
              <div className="pet-header">
                <h3>{pet.name}</h3>
                <span className="pet-type">{getTypeText(pet.type)}</span>
              </div>

              <div className="pet-details">
                <div className="detail-row">
                  <span className="label">Breed:</span>
                  <span>{pet.breed}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Age:</span>
                  <span>{pet.age}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Gender:</span>
                  <span>{pet.gender}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Location:</span>
                  <span>{pet.location}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Health Status:</span>
                  <span className="health-status">{pet.healthStatus}</span>
                </div>
              </div>

              <p className="pet-description">{pet.description}</p>

              <div className="pet-footer">
                <div className="adoption-fee">
                  <span className="fee-label">Adoption Fee:</span>
                  <span className="fee-amount">{pet.adoptionFee}</span>
                </div>
                <div className="pet-actions">
                  <button className="btn-secondary">
                    <Heart size={16} />
                    Favorite
                  </button>
                  <button className="btn-primary">
                    Adopt
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="no-results">
          <p>No pets found matching your filters.</p>
        </div>
      )}
    </div>
  )

  const renderSuccessStories = () => (
    <div className="success-stories-section">
      <div className="section-header">
        <h2>Success Stories</h2>
        <p>Heartwarming stories about pet adoptions</p>
      </div>

      <div className="stories-grid">
        {successStories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-images">
              <div className="before-after">
                <div className="image-container">
                  <img src={story.beforeImage} alt={`${story.petName} trước khi nhận nuôi`} />
                  <span className="image-label">Before</span>
                </div>
                <div className="image-container">
                  <img src={story.afterImage} alt={`${story.petName} sau khi nhận nuôi`} />
                  <span className="image-label">After</span>
                </div>
              </div>
            </div>

            <div className="story-content">
              <h3>{story.title}</h3>
              <div className="story-meta">
                <span className="pet-info">{story.petName} - {story.petType}</span>
                <span className="owner-info">Family: {story.ownerName}</span>
                <span className="date-info">{story.adoptionDate}</span>
                <span className="location-info">{story.location}</span>
              </div>
              <p className="story-text">{story.story}</p>
              <div className="story-actions">
                <button className="btn-secondary">
                  <Share2 size={16} />
                  Share
                </button>
                <button className="btn-primary">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="events-section">
      <div className="section-header">
        <h2>Events</h2>
        <p>Upcoming activities and events</p>
      </div>

      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              <div className="event-type-badge">
                {getEventTypeText(event.type)}
              </div>
            </div>

            <div className="event-content">
              <h3>{event.title}</h3>
              <p className="event-description">{event.description}</p>
              
              <div className="event-details">
                <div className="event-detail">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="event-detail">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="event-detail">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="event-actions">
                <button className="btn-secondary">
                  <Download size={16} />
                  Download
                </button>
                <button className="btn-primary">
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderShelterContact = () => (
    <div className="shelter-contact-section">
      <div className="section-header">
        <h2>Shelter Contact</h2>
        <p>Our contact information and address</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card">
            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-item">
                <Phone size={20} />
                <div>
                  <span className="label">Phone:</span>
                  <span>0901 234 567</span>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <div>
                  <span className="label">Email:</span>
                  <span>info@petrescue.vn</span>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <div>
                  <span className="label">Address:</span>
                  <span>123 Rescue Street, District 1, Ho Chi Minh City</span>
                </div>
              </div>
            </div>

            <div className="working-hours">
              <h4>Working Hours:</h4>
              <div className="hours-list">
                <div className="hour-item">
                  <span>Monday - Friday:</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className="hour-item">
                  <span>Saturday - Sunday:</span>
                  <span>9:00 - 17:00</span>
                </div>
              </div>
            </div>

            <div className="contact-actions">
              <button className="btn-primary">
                <Phone size={16} />
                Call Now
              </button>
              <button className="btn-secondary">
                <Mail size={16} />
                Send Email
              </button>
            </div>
          </div>
        </div>

        <div className="map-container">
          <div className="map-placeholder">
            <MapPin size={48} />
            <h3>Google Map</h3>
            <p>123 Rescue Street, District 1, Ho Chi Minh City</p>
            <button className="btn-primary">
              View on Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="pet-adoption-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Pet Adoption</h1>
            <p>Find the perfect companion and bring happiness to both of you</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <Users size={24} />
              <span>150+ Pets</span>
            </div>
            <div className="stat-item">
              <Heart size={24} />
              <span>500+ Happy Families</span>
            </div>
            <div className="stat-item">
              <Star size={24} />
              <span>98% Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="page-navigation">
        <button
          className={`nav-button ${activeSection === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveSection('gallery')}
        >
          <Heart size={20} />
          Gallery
        </button>
        <button
          className={`nav-button ${activeSection === 'success-stories' ? 'active' : ''}`}
          onClick={() => setActiveSection('success-stories')}
        >
          <Star size={20} />
          Success Stories
        </button>
        <button
          className={`nav-button ${activeSection === 'events' ? 'active' : ''}`}
          onClick={() => setActiveSection('events')}
        >
          <Calendar size={20} />
          Events
        </button>
        <button
          className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveSection('contact')}
        >
          <MapPin size={20} />
          Contact
        </button>
      </div>

      {/* Content */}
      <div className="page-content">
        {activeSection === 'gallery' && renderGallery()}
        {activeSection === 'success-stories' && renderSuccessStories()}
        {activeSection === 'events' && renderEvents()}
        {activeSection === 'contact' && renderShelterContact()}
      </div>
    </div>
  )
}

export default PetAdoptionPage
