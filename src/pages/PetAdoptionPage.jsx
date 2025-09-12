import React, { useState, useEffect, useCallback } from 'react'
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
  Download,
  X
} from 'lucide-react'
import WelcomeMessagePopup from '../components/WelcomeMessagePopup'
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
  const [availableImages, setAvailableImages] = useState([])
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const [favoritePets, setFavoritePets] = useState(new Set())
  const [selectedStory, setSelectedStory] = useState(null)

  // Show welcome message when page loads
  useEffect(() => {
    if (userName) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [userName])

  const handleWelcomeMessageClose = () => {
    setShowWelcomeMessage(false)
  }

  const toggleFavorite = (petId) => {
    setFavoritePets(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(petId)) {
        newFavorites.delete(petId)
      } else {
        newFavorites.add(petId)
      }
      return newFavorites
    })
  }

  const handleReadMore = (story) => {
    setSelectedStory(story)
  }

  const handleCloseStory = () => {
    setSelectedStory(null)
  }

  // Helper function to create dynamic image paths
  const getImagePath = useCallback((path) => {
    const baseUrl = import.meta.env.BASE_URL || '/'
    return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`
  }, [])

  // Function để chuẩn hóa tên (chuyển về chữ thường, thay dấu cách bằng gạch ngang)
  const normalizeName = useCallback((name) => {
    return name
      .toLowerCase()          
      .replace(/\s+/g, '-')    
      .replace(/[^a-z0-9-]/g, '')
  }, [])

  // Function để tìm ảnh phù hợp với breed (tối ưu hóa)
  const findPetImage = useCallback((breed, availableImages) => {
    const normalizedBreed = normalizeName(breed)
    
    // Tạo map để tránh gọi normalizeName nhiều lần
    const normalizedImages = availableImages.map(img => ({
      original: img,
      normalized: normalizeName(img.replace('.jpg', ''))
    }))
    
    // Tìm ảnh khớp chính xác
    const exactMatch = normalizedImages.find(({ normalized }) => 
      normalized === normalizedBreed
    )
    
    if (exactMatch) return exactMatch.original
    
    // Tìm ảnh chứa breed name
    const partialMatch = normalizedImages.find(({ normalized }) => 
      normalized.includes(normalizedBreed) || normalizedBreed.includes(normalized)
    )
    
    return partialMatch ? partialMatch.original : 'Golden-Retriever.jpg'
  }, [normalizeName])

  // Load danh sách ảnh có sẵn (chỉ chạy 1 lần)
  useEffect(() => {
    const images = [
      'Golden-Retriever.jpg', 'Persian.jpg', 'Holland-Lop.jpg',
      'German-Shepherd.jpg', 'British-Shorthair.jpg', 'Labrador-Retriever.jpg',
      'Maine-Coon.jpg', 'Netherland-Dwarf.jpg', 'Bulldog.jpg',
      'Siamese.jpg', 'Flemish-Giant.jpg', 'Beagle.jpg',
      'Russian-Blue.jpg', 'Mini-Rex.jpg', 'Ragdoll.jpg',
      'Lionhead.jpg', 'Poodle.jpg', 'Bombay.jpg',
      'Angora.jpg', 'Boxer.jpg', 'Birman.jpg',
      'Dutch.jpg', 'Great-dane.jpg', 'Munchkin.jpg'
    ]
    setAvailableImages(images)
  }, []) // Empty dependency array - chỉ chạy 1 lần

  // Load pets data from JSON file (chỉ chạy 1 lần)
  useEffect(() => {
    const loadPetsData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/'
        const response = await fetch(`${baseUrl}json/pets.json`)
        const data = await response.json()
        setPets(data.pets)
      } catch (error) {
        console.error('Error loading pets data:', error)
        // Fallback to empty array if JSON fails to load
        setPets([])
      }
    }

    loadPetsData()
  }, []) // Empty dependency array - chỉ chạy 1 lần

  // Mock success stories và events (chỉ chạy 1 lần)
  useEffect(() => {
    // Success stories với nội dung thực sự
    setSuccessStories([
      {
        id: 1,
        title: 'From Shelter to Service: How Max Became a Therapy Dog',
        petName: 'Max',
        petType: 'Dog',
        ownerName: 'Dr. Sarah Johnson',
        story: 'Max was found abandoned in a park, malnourished and fearful of humans. After 8 months of rehabilitation at our shelter, he was adopted by Dr. Sarah Johnson, a child psychologist. Today, Max works as a certified therapy dog, helping children with autism and anxiety disorders.',
        fullContent: `
          <h2>Max's Journey: From Abandoned to Amazing</h2>
          
          <h3>The Beginning</h3>
          <p>When Max was first brought to our shelter in March 2023, he was in terrible condition. Weighing only 35 pounds (he should have been 60), with matted fur and visible ribs, Max was terrified of human contact. Our veterinary team estimated he had been on the streets for at least 6 months.</p>
          
          <h3>Rehabilitation Process</h3>
          <p>Max's recovery was slow but steady. Our team worked with him daily, using positive reinforcement techniques to rebuild his trust in humans. It took 3 months before he would approach a staff member voluntarily, and another 2 months before he was comfortable with basic handling.</p>
          
          <p>During this time, we discovered Max had an incredibly gentle temperament. Even when frightened, he never showed aggression. This quality, combined with his growing confidence, made our staff realize he had potential as a therapy animal.</p>
          
          <h3>The Perfect Match</h3>
          <p>Dr. Sarah Johnson visited our shelter in November 2023, looking for a dog to work with children in her psychology practice. When she met Max, it was love at first sight. "There was something special about him," she recalls. "He had this calm energy that I knew would be perfect for my young patients."</p>
          
          <h3>Training and Certification</h3>
          <p>After adoption, Max underwent intensive training to become a certified therapy dog. The process included:</p>
          <ul>
            <li>Basic obedience training</li>
            <li>Socialization with children of various ages</li>
            <li>Exposure to medical equipment and hospital environments</li>
            <li>Certification through Therapy Dogs International</li>
          </ul>
          
          <h3>Making a Difference</h3>
          <p>Today, Max works 3 days a week at Dr. Johnson's practice and volunteers at a local children's hospital. He has helped over 50 children with various challenges, including autism, anxiety, and trauma recovery.</p>
          
          <p>"Max has an incredible ability to sense when a child needs comfort," says Dr. Johnson. "He'll gently place his head in their lap or sit quietly beside them during difficult moments. The children absolutely adore him."</p>
          
          <h3>Looking Forward</h3>
          <p>Max's story continues to inspire. He's become an ambassador for our shelter, showing that every animal has potential for greatness. His journey from abandoned street dog to certified therapy animal proves that with love, patience, and proper care, any pet can find their purpose and bring joy to others.</p>
          
          <p><strong>Adoption Date:</strong> November 15, 2023<br>
          <strong>Current Status:</strong> Certified Therapy Dog<br>
          <strong>Lives with:</strong> Dr. Sarah Johnson and her family in Ho Chi Minh City</p>
        `,
        storyImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=400&fit=crop&crop=center',
        adoptionDate: '2023-11-15',
        location: 'Ho Chi Minh City'
      },
      {
        id: 2,
        title: 'Luna\'s Second Chance: A Senior Cat\'s New Lease on Life',
        petName: 'Luna',
        petType: 'Cat',
        ownerName: 'The Nguyen Family',
        story: 'At 12 years old, Luna was considered "unadoptable" by many. But the Nguyen family saw her potential and gave her a loving home. Now 14, Luna has become the heart of their household, proving that senior pets have so much love to give.',
        fullContent: `
          <h2>Luna's Golden Years: A Senior Cat's Second Chance</h2>
          
          <h3>The Challenge of Senior Pet Adoption</h3>
          <p>When Luna arrived at our shelter in January 2023, she was 12 years old - considered a senior cat. Her previous owner had passed away, and no family members could take her in. Senior pets like Luna often face the greatest challenges in finding new homes, as many families prefer younger animals.</p>
          
          <h3>Luna's Special Needs</h3>
          <p>Luna came with some health concerns typical of older cats:</p>
          <ul>
            <li>Mild arthritis in her hind legs</li>
            <li>Dental issues requiring regular cleanings</li>
            <li>Kidney function monitoring</li>
            <li>Special dietary requirements</li>
          </ul>
          
          <p>Despite these challenges, Luna had a sweet, gentle personality and was incredibly affectionate with our staff.</p>
          
          <h3>Finding the Right Family</h3>
          <p>The Nguyen family had recently lost their 15-year-old cat and were specifically looking for a senior pet. "We wanted to give an older cat a loving home in their golden years," explains Mrs. Nguyen. "We know they have so much love to give and deserve a comfortable retirement."</p>
          
          <h3>Adapting to Her New Home</h3>
          <p>The transition was smooth. Luna quickly claimed the sunny windowsill as her favorite spot and established a routine that included morning cuddles with Mr. Nguyen and evening playtime with their teenage daughter.</p>
          
          <p>"She's become such an important part of our family," says their daughter. "Even though she's older, she's still playful and loves to chase her favorite feather toy."</p>
          
          <h3>Health and Happiness</h3>
          <p>With proper veterinary care and a loving home, Luna's health has actually improved. Her arthritis is managed with medication and gentle exercise, and her kidney function has stabilized with her special diet.</p>
          
          <h3>The Joy of Senior Pet Adoption</h3>
          <p>Luna's story highlights the many benefits of adopting senior pets:</p>
          <ul>
            <li>They're often already house-trained and socialized</li>
            <li>Their personalities are fully developed</li>
            <li>They're typically calmer and less destructive</li>
            <li>They're incredibly grateful for a second chance</li>
          </ul>
          
          <h3>Making Memories</h3>
          <p>Two years later, Luna continues to thrive. She's become the family's emotional support during difficult times and a source of constant joy. "She's taught us that age is just a number," says Mrs. Nguyen. "Luna has given us so much more than we could ever give her."</p>
          
          <p><strong>Adoption Date:</strong> February 10, 2023<br>
          <strong>Current Age:</strong> 14 years old<br>
          <strong>Lives with:</strong> The Nguyen family in Hanoi<br>
          <strong>Special Note:</strong> Luna is a proud ambassador for senior pet adoption</p>
        `,
        storyImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=400&fit=crop&crop=center',
        adoptionDate: '2023-02-10',
        location: 'Hanoi'
      },
      {
        id: 3,
        title: 'Bunny\'s Big Adventure: How a Rescue Rabbit Became a Social Media Star',
        petName: 'Bunny',
        petType: 'Rabbit',
        ownerName: 'Minh & Linh (The Rabbit Whisperers)',
        story: 'Bunny was rescued from a hoarding situation with 50 other rabbits. Now he\'s living his best life with Minh and Linh, who document his adventures on social media. With over 100K followers, Bunny has become an ambassador for rabbit adoption and proper care.',
        fullContent: `
          <h2>Bunny's Big Adventure: From Rescue to Social Media Star</h2>
          
          <h3>The Hoarding Situation</h3>
          <p>In June 2023, our shelter was called to assist with a massive hoarding case involving over 50 rabbits living in deplorable conditions. Bunny was one of the youngest, just 8 months old, but already showing signs of malnutrition and stress. The rabbits were living in cramped, dirty cages with minimal access to proper food or veterinary care.</p>
          
          <h3>Recovery and Rehabilitation</h3>
          <p>Bunny's recovery process was intensive. He required:</p>
          <ul>
            <li>Treatment for malnutrition and digestive issues</li>
            <li>Socialization to overcome fear of humans</li>
            <li>Dental care for overgrown teeth</li>
            <li>Gradual introduction to proper rabbit diet</li>
          </ul>
          
          <p>Despite his difficult start, Bunny showed an incredible spirit and quickly became a favorite among our staff.</p>
          
          <h3>Meeting His Forever Family</h3>
          <p>Minh and Linh, a young couple passionate about animal welfare, visited our shelter specifically looking for a rabbit. They had experience with rabbits and were prepared to provide the specialized care these animals require.</p>
          
          <p>"When we met Bunny, we knew he was special," recalls Linh. "He had this curious, adventurous personality that just shone through, even though he was still recovering."</p>
          
          <h3>Creating a Rabbit Paradise</h3>
          <p>Minh and Linh transformed their spare room into a rabbit paradise for Bunny:</p>
          <ul>
            <li>Large, multi-level enclosure with plenty of space to hop</li>
            <li>Various toys and enrichment activities</li>
            <li>Fresh hay, vegetables, and proper rabbit pellets</li>
            <li>Regular veterinary check-ups</li>
          </ul>
          
          <h3>The Social Media Journey</h3>
          <p>What started as a simple Instagram account to share Bunny's daily adventures quickly grew into something much bigger. His playful antics, adorable expressions, and educational content about proper rabbit care resonated with thousands of followers.</p>
          
          <p>"We never expected Bunny to become so popular," says Minh. "But people love seeing how happy and healthy he is now, compared to his rescue photos."</p>
          
          <h3>Educational Impact</h3>
          <p>Through their social media platform, Minh and Linh have educated thousands of people about:</p>
          <ul>
            <li>Proper rabbit nutrition and care</li>
            <li>The importance of adoption over buying</li>
            <li>Signs of rabbit health problems</li>
            <li>Creating enriching environments for rabbits</li>
          </ul>
          
          <h3>Helping Other Rabbits</h3>
          <p>Bunny's fame has had a positive impact beyond his own life. His story has inspired many people to consider rabbit adoption, and Minh and Linh have helped connect several rabbits from our shelter with loving families.</p>
          
          <h3>Living His Best Life</h3>
          <p>Today, Bunny is a happy, healthy 2-year-old rabbit who loves:</p>
          <ul>
            <li>Exploring his multi-level home</li>
            <li>Playing with his favorite toys</li>
            <li>Eating fresh vegetables (especially carrots!)</li>
            <li>Photo shoots for his social media</li>
            <li>Meeting new people (when he's in the mood)</li>
          </ul>
          
          <h3>A Legacy of Love</h3>
          <p>Bunny's story proves that every animal, regardless of their background, deserves a chance at happiness. His transformation from a scared, malnourished rescue to a confident, beloved pet and social media star shows the power of love, proper care, and second chances.</p>
          
          <p><strong>Adoption Date:</strong> August 5, 2023<br>
          <strong>Current Age:</strong> 2 years old<br>
          <strong>Lives with:</strong> Minh & Linh in Da Nang<br>
          <strong>Social Media:</strong> @bunny_the_rescue_rabbit (100K+ followers)<br>
          <strong>Special Achievement:</strong> Ambassador for rabbit adoption and proper care</p>
        `,
        storyImage: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&h=400&fit=crop&crop=center',
        adoptionDate: '2023-08-05',
        location: 'Da Nang'
      }
    ])

    // Upcoming events (from September 12, 2025)
    setEvents([
      {
        id: 1,
        title: 'Autumn Pet Adoption Fair 2025',
        type: 'adoption',
        date: '2025-09-20',
        time: '09:00 - 18:00',
        location: 'Le Van Tam Park, Ho Chi Minh City',
        description: 'Join us for our biggest autumn adoption event! Over 150 pets including dogs, cats, and rabbits are waiting for their forever homes. Free adoption fees and pet supplies included.',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop&crop=center'
      },
      {
        id: 2,
        title: 'Free Pet Health Check & Vaccination Day',
        type: 'vaccination',
        date: '2025-09-28',
        time: '08:00 - 16:00',
        location: 'Animal Rescue Center, Hanoi',
        description: 'Free health check-ups and vaccinations for all pets. Professional veterinarians will be available to answer your questions about pet health and care.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&crop=center'
      },
      {
        id: 3,
        title: 'Pet Training & Behavior Workshop',
        type: 'workshop',
        date: '2025-10-05',
        time: '14:00 - 17:00',
        location: 'Convention Center, Da Nang',
        description: 'Learn essential pet training techniques and behavior management from certified animal behaviorists. Perfect for new pet owners and those looking to improve their pet\'s behavior.',
        image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=400&fit=crop&crop=center'
      },
      {
        id: 4,
        title: 'Senior Pet Adoption Special',
        type: 'adoption',
        date: '2025-10-12',
        time: '10:00 - 16:00',
        location: 'Pet Adoption Center, Ho Chi Minh City',
        description: 'Special event dedicated to senior pets (7+ years old). These wise and gentle companions deserve loving homes in their golden years. Special adoption packages available.',
        image: getImagePath('/event-img/Senior Pet Adoption Special.png')
      }
    ])
  }, [getImagePath])

  // Filter pets based on current filters and search term
  useEffect(() => {
    let filtered = pets.filter(pet => {
      const matchesType = filters.type === 'all' || pet.type === filters.type
      const matchesAge = filters.age === 'all' || 
        (filters.age === 'young' && (pet.age.includes('months') || pet.age.includes('1 year'))) ||
        (filters.age === 'adult' && (pet.age.includes('2 years') || pet.age.includes('3 years'))) ||
        (filters.age === 'senior' && (pet.age.includes('4 years') || pet.age.includes('5 years')))
      const matchesBreed = filters.breed === 'all' || pet.breed === filters.breed
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
    setFilters(prev => {
      const newFilters = {
      ...prev,
      [filterType]: value
      }
      
      // Reset breed filter when type changes
      if (filterType === 'type') {
        newFilters.breed = 'all'
      }
      
      return newFilters
    })
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

  // Get breed options based on selected type
  const getBreedOptions = (type) => {
    const dogBreeds = [
      'Golden Retriever', 'Labrador', 'German Shepherd', 'Beagle', 
      'Bulldog', 'Poodle', 'Boxer', 'Great Dane', 'Rottweiler'
    ]
    
    const catBreeds = [
      'Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 
      'Ragdoll', 'Russian Blue', 'Bombay', 'Birman', 'Munchkin'
    ]
    
    const rabbitBreeds = [
      'Dutch', 'Holland Lop', 'Flemish Giant', 'Lionhead', 
      'Mini Rex', 'Netherland Dwarf', 'Angora'
    ]

    switch (type) {
      case 'dog':
        return dogBreeds
      case 'cat':
        return catBreeds
      case 'rabbit':
        return rabbitBreeds
      default:
        return [...dogBreeds, ...catBreeds, ...rabbitBreeds]
    }
  }
  // Src pet img


  const renderGallery = () => (
    <div className="gallery-section">
      <div className="pet-adoption-section-header">
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
            <select
              value={filters.breed}
              onChange={(e) => handleFilterChange('breed', e.target.value)}
            >
              <option value="all">All</option>
              {getBreedOptions(filters.type).map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
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
              <img 
                src={getImagePath(`/img-pet/${findPetImage(pet.breed, availableImages)}`)} 
                alt={pet.name}
                loading="lazy"
                onError={(e) => {
                  // Sử dụng ảnh có sẵn thay vì default-pet.jpg không tồn tại
                  if (!e.target.dataset.fallback) {
                    e.target.src = getImagePath('/img-pet/Golden-Retriever.jpg')
                    e.target.dataset.fallback = 'true'
                  }
                }}
              />
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
                  <button 
                    className={`btn-secondary ${favoritePets.has(pet.id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(pet.id)}
                  >
                    <Heart size={16} fill={favoritePets.has(pet.id) ? 'currentColor' : 'none'} />
                    {favoritePets.has(pet.id) ? 'Favorited' : 'Favorite'}
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
      <div className="pet-adoption-section-header">
        <h2>Success Stories</h2>
        <p>Heartwarming stories about pet adoptions</p>
      </div>

      <div className="stories-grid">
        {successStories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-image">
              <img src={story.storyImage} alt={`${story.petName} - ${story.petType}`} />
            </div>

            <div className="story-content">
              <h3>{story.title}</h3>
              <div className="story-meta">
                <div className="pet-name-type">
                  <strong>{story.petName} - {story.petType}</strong>
                </div>
                <div className="story-details">
                <span className="owner-info">Family: {story.ownerName}</span>
                <span className="date-info">{story.adoptionDate}</span>
                <span className="location-info">{story.location}</span>
                </div>
              </div>
              <p className="story-text">{story.story}</p>
              <div className="story-actions">
                <button className="btn-secondary">
                  <Share2 size={16} />
                  Share
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => handleReadMore(story)}
                >
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
      <div className="pet-adoption-section-header">
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
              
              <div className="event-details-with-actions">
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
                <button className="btn-primary">
                  Join
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderShelterContact = () => (
    <div className="shelter-contact-section">
      <div className="pet-adoption-section-header">
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
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4223303356325!2d105.77512981055621!3d21.055787886769366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134554d9b014b83%3A0xbbaae84fc810a855!2zUGjDsm5nIEtow6FtIFRow7ogWSBU4bqhaSBOaMOgIC0gUEVUIEhPTUU!5e0!3m2!1svi!2s!4v1757665306548!5m2!1svi!2s" 
            width="100%" 
            height="450" 
            style={{border:0, borderRadius: '8px'}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Pet Rescue Location Map"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="pet-adoption-page">
      {/* Welcome Message Popup */}
      {showWelcomeMessage && (
        <WelcomeMessagePopup
          userName={userName}
          userType="shelter"
          onClose={handleWelcomeMessageClose}
        />
      )}

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

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="story-modal-overlay" onClick={handleCloseStory}>
          <div className="story-modal" onClick={(e) => e.stopPropagation()}>
            <div className="story-modal-header">
              <h2>{selectedStory.title}</h2>
              <button className="close-modal-btn" onClick={handleCloseStory}>
                <X size={24} />
              </button>
            </div>
            <div className="story-modal-content">
              <div className="story-modal-meta">
                <span className="pet-info">{selectedStory.petName} - {selectedStory.petType}</span>
                <span className="owner-info">Family: {selectedStory.ownerName}</span>
                <span className="date-info">{selectedStory.adoptionDate}</span>
                <span className="location-info">{selectedStory.location}</span>
              </div>
              <div 
                className="story-full-content"
                dangerouslySetInnerHTML={{ __html: selectedStory.fullContent }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PetAdoptionPage
