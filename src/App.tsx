import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import MemberPage from './pages/MemberPage';
import SellerRegistration from './pages/Seller/SellerRegistration';
import ContractorRegistration from './pages/Contractor/ContractorRegistration';
import RentalRegistration from './pages/Rental/RentalRegistration';
import ContractorListing from './pages/Contractor/ContractorListing';
import ContractorDetail from './pages/Contractor/ContractorDetail';
import RentalListing from './pages/Rental/RentalListing';
import RentalDetail from './pages/Rental/RentalDetail';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/member" element={<MemberPage />} />
            <Route path="/seller/register" element={<SellerRegistration />} />
            <Route path="/contractor/register" element={<ContractorRegistration />} />
            <Route path="/rental/register" element={<RentalRegistration />} />
            <Route path="/contractors" element={<ContractorListing />} />
            <Route path="/contractor/:id" element={<ContractorDetail />} />
            <Route path="/rentals" element={<RentalListing />} />
            <Route path="/rental/:id" element={<RentalDetail />} />
          </Routes>
        </Layout>
      </AnimatePresence>
    </Router>
  );
}

export default App;