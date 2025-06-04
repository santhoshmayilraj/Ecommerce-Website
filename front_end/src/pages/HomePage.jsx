import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import heroImage from '../assets/images/IMG_7610.JPG';
import productImage1 from '../assets/images/kingsize.jpg';
import productImage2 from '../assets/images/nagcottonpillows.jpg';
import productImage3 from '../assets/images/KapokSilkCottonRaw.jpg';
import videoSrc from '../assets/inr_vdo.mp4';

function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Premium Silk Cotton Products</h1>
          <p>Traditional craftsmanship meets modern comfort</p>
          <div className="hero-cta">
            <Link to="/products" className="cta-button primary">Browse Products</Link>
            <Link to="/aboutus" className="cta-button secondary">Our Story</Link>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <img src={heroImage} alt="Premium Silk Cotton Products" className="hero-image" />
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="section-header">
          <h2>Why Choose Nagarathinam</h2>
          <div className="section-divider"></div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </div>
            <h3>Premium Quality</h3>
            <p>Handcrafted with the finest silk cotton materials for unparalleled comfort and durability</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Traditional Craftsmanship</h3>
            <p>Preserving age-old techniques passed down through generations since 1954</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.5 12.5l3 3L18 7" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3>100% Natural</h3>
            <p>Chemical-free and eco-friendly products for a healthier sleep and lifestyle</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <h3>Customer Satisfaction</h3>
            <p>Dedicated to providing exceptional products and service to every customer</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <div className="section-divider"></div>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <img src={productImage1} alt="Premium Mattress" />
              <div className="product-tag">Bestseller</div>
            </div>
            <div className="product-info">
              <h3>King Size Premium Ilavam Panju Mattress</h3>
              <p className="product-description">Luxurious comfort with natural temperature regulation</p>
              <div className="product-meta">
                <span className="product-price">₹22,999</span>
                <Link to="/products" className="product-button">View Details</Link>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={productImage2} alt="Silk Cotton Pillow" />
              <div className="product-tag">New</div>
            </div>
            <div className="product-info">
              <h3>Ergonomic Silk Cotton Pillow</h3>
              <p className="product-description">Perfect neck support with pure silk cotton filling</p>
              <div className="product-meta">
                <span className="product-price">₹1,299</span>
                <Link to="/products" className="product-button">View Details</Link>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src={productImage3} alt="Cotton Comforter" />
            </div>
            <div className="product-info">
              <h3>Kapok Silk Cotton Raw</h3>
              <p className="product-description">Lightweight yet warm for all-season comfort</p>
              <div className="product-meta">
                <span className="product-price">₹2,499</span>
                <Link to="/products" className="product-button">View Details</Link>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="product-card">
            <div className="product-image">
              <img src={productImage3} alt="Cotton Comforter" />
            </div>
            <div className="product-info">
              <h3>Kapok Silk Cotton Raw</h3>
              <p className="product-description">Lightweight yet warm for all-season comfort</p>
              <div className="product-meta">
                <span className="product-price">₹2,499</span>
                <Link to="/products" className="product-button">View Details</Link>
              </div>
            </div>
          </div>
        </div> */}

        <div className="view-all-container">
          <Link to="/products" className="view-all-button">View All Products</Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-overlay"></div>
        <div className="stats-content">
          <div className="stat-card">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Customer Rating from 500+ Reviews</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">70+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Return Customer Rate</div>
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="section-header">
            <h2>Our Craftsmanship</h2>
            <div className="section-divider"></div>
            <p className="section-subheading">Experience the artistry and dedication that goes into every product</p>
        </div>

        <div className="video-container">
            <video controls width="100%" height="auto">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
      </section>

      {/* Call to Action Bottom Section */}
      <section className="bottom-cta-section">
        <div className="cta-content">
          <h2>Experience the Nagarathinam Difference</h2>
          <p>Discover our range of premium silk cotton products crafted for your comfort</p>
          <Link to="/products" className="cta-button primary">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;