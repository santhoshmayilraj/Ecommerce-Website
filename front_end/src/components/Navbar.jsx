import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/new_logo.jpg';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/aboutus', label: 'About Us', icon: '👥' },
    { path: '/products', label: 'Products', icon: '🛏️' },
    { path: '/custom-bed-creator', label: 'Custom Design', icon: '🎨' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Simplified Logo Section - No fake badge */}
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <div className="logo-wrapper">
                <img 
                  src={logo} 
                  alt="Nagarathinam Logo"
                  className="logo-image"
                />
              </div>
              <div className="company-info">
                <span className="company-name">Nagarathinam</span>
                <span className="company-tagline">Premium Comfort</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.label}</span>
                    <div className="nav-link-indicator"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compact CTA Section */}
          <div className="navbar-actions">
            <Link to="/custom-bed-creator" className="cta-button-compact">
              <span className="cta-icon-small">🎨</span>
              <span className="cta-text-small">Design</span>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="toggle-line"></span>
              <span className="toggle-line"></span>
              <span className="toggle-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <div className="mobile-nav-content">
            <ul className="mobile-nav-menu">
              {navItems.map((item) => (
                <li key={item.path} className="mobile-nav-item">
                  <Link 
                    to={item.path} 
                    className={`mobile-nav-link ${location.pathname === item.path ? 'mobile-nav-link-active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                    {location.pathname === item.path && (
                      <span className="mobile-nav-indicator">●</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mobile-nav-footer">
              <Link 
                to="/custom-bed-creator" 
                className="mobile-cta-button-compact"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-cta-icon">🎨</span>
                <span className="mobile-cta-text">Start Custom Design</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;