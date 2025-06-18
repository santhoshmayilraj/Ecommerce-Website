import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs';
import AboutUs from './pages/AboutUs';
import Home from './pages/HomePage';
import Products from './pages/Products';
import PaymentPage from './pages/PaymentPage';
import CustomBedCreator from './pages/CustomBedCreator';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const location = useLocation();
  
  // Define paths where navbar and contact should NOT appear
  const hideNavbarPaths = ['/admin'];
  const shouldHideNavbar = hideNavbarPaths.some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="app">
      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/custom-bed-creator" element={<CustomBedCreator />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      
      {/* Conditionally render ContactUs */}
      {!shouldHideNavbar && <ContactUs />}
    </div>
  );
}

export default App;