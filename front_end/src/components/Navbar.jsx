import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-row">
          {/* Logo with improved visibility */}
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <div className="logo-wrapper">
                <img 
                  src={logo} 
                  alt="Company Logo"
                  className="logo-image"
                />
              </div>
              <span className="company-name">Ayyanar</span>
            </Link>
          </div>
          
          
          <div className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/aboutus" className="nav-link">About Us</Link>
            <Link to="/products" className="nav-link">Products</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;