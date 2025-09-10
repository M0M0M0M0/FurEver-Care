import React, { useState, useEffect } from 'react';
import PetOwnerHeader from '../components/PetOwnerHeader';
import PetProfile from '../components/PetProfile';
import './PetProfilePage.css';

const PetProfilePage = ({ userData, userName }) => {
  const [showPetProfile, setShowPetProfile] = useState(true);

  return (
    <div className="pet-profile-page">
      <PetOwnerHeader userData={userData} userName={userName} />
      
      <main className="pet-profile-main">
        <div className="pet-profile-container">
          <PetProfile 
            onClose={() => window.history.back()} 
            userData={userData}
            userName={userName}
            isPage={true}
          />
        </div>
      </main>
    </div>
  );
};

export default PetProfilePage;
