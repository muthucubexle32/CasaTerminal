import { motion } from 'framer-motion';
import { HeroSection, ServiceSwipe, CoreServices, WhyChooseUs } from '../components/sections';

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <CoreServices />
      <ServiceSwipe />
      
      <WhyChooseUs />
    </motion.div>
  );
};

export default LandingPage;