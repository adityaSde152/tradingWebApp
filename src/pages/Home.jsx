import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StartNowSection from '../components/StartNowSection';
import TrustedSection from '../components/TrustedSection';
import Footer from '../components/Footer';
import ScrollSnapSection from '../components/ScrollSnapSection';

const Home = () => {
  return (
    <div className=''>
      <HeroSection/>
      <FeaturesSection/>
      <StartNowSection/>
      <TrustedSection/>
      <ScrollSnapSection/>
      <Footer/>
    </div>
  );
}

export default Home;
