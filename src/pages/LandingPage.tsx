import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import CoreServices from '../components/sections/CoreServices';
import ServiceCarousel from '../components/sections/ServiceSwipe';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import LocationPrompt from '../components/LocationPrompt';
import NearbyProducts from '../components/NearbyProducts';
import NearbyContractors from '../components/NearbyContractors';
import NearbyRentals from '../components/NearbyRentals';

const LandingPage: React.FC = () => {
  return (
    <>
      <LocationPrompt />
      <HeroSection />
      <CoreServices />
      <ServiceCarousel />
      
      {/* Nearby Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NearbyProducts />
        <NearbyContractors />
        <NearbyRentals />
      </div>
      
      <WhyChooseUs />
    </>
  );
};

export default LandingPage;