import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import heroImage from '../assets/images/IMG_7610.JPG';
import productImage1 from '../assets/images/kingsize.jpg';
import productImage2 from '../assets/images/nagcottonpillows.jpg';
import productImage3 from '../assets/images/KapokSilkCottonRaw.jpg';
import videoSrc from '../assets/inr_vdo.mp4';

function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="home-container">
      {/* Enhanced Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src={heroImage} alt="Premium Silk Cotton Products" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span className="badge-text">Since 1954</span>
          </div>
          
          <h1 className="hero-title">
            Premium Silk Cotton
            <span className="title-highlight">Products</span>
          </h1>
          
          <p className="hero-subtitle">
            Traditional craftsmanship meets modern comfort. Experience the luxury of 
            handcrafted silk cotton products that have been perfected over generations.
          </p>
          
          <div className="hero-features">
            <div className="hero-feature">
              <span className="feature-icon">🌿</span>
              <span className="feature-text">100% Natural</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">🏆</span>
              <span className="feature-text">Premium Quality</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">🛡️</span>
              <span className="feature-text">70+ Years Legacy</span>
            </div>
          </div>
          
          <div className="hero-cta">
            <Link to="/products" className="cta-button primary">
              <span className="button-icon">🛍️</span>
              <span className="button-text">Browse Products</span>
            </Link>
            <Link to="/custom-bed-creator" className="cta-button secondary">
              <span className="button-icon">🎨</span>
              <span className="button-text">Custom Design</span>
            </Link>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="why-choose-section animate-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">⭐</span>
              <span className="badge-text">Why Choose Us</span>
            </div>
            <h2 className="section-title">Why Choose Nagarathinam</h2>
            <p className="section-subtitle">
              Discover what makes us the preferred choice for premium silk cotton products
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Premium Quality</h3>
                <p className="feature-description">
                  Handcrafted with the finest silk cotton materials for unparalleled comfort and durability
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Traditional Craftsmanship</h3>
                <p className="feature-description">
                  Preserving age-old techniques passed down through generations since 1954
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4.5 12.5l3 3L18 7" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">100% Natural</h3>
                <p className="feature-description">
                  Chemical-free and eco-friendly products for a healthier sleep and lifestyle
                </p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Customer Satisfaction</h3>
                <p className="feature-description">
                  Dedicated to providing exceptional products and service to every customer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="products-section animate-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">🛏️</span>
              <span className="badge-text">Featured Products</span>
            </div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Discover our most popular and premium silk cotton products
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img src={productImage1} alt="Premium Mattress" loading="lazy" />
                <div className="product-overlay">
                  <Link to="/products" className="quick-view-btn">Quick View</Link>
                </div>
                <div className="product-tag bestseller">Bestseller</div>
              </div>
              <div className="product-info">
                <h3 className="product-title">King Size Premium Ilavam Panju Mattress</h3>
                <p className="product-description">
                  Luxurious comfort with natural temperature regulation and superior support
                </p>
                <div className="product-features">
                  <span className="feature-tag">Natural</span>
                  <span className="feature-tag">King Size</span>
                  <span className="feature-tag">Premium</span>
                </div>
                <div className="product-meta">
                  <div className="product-price">
                    <span className="price-currency">₹</span>
                    <span className="price-amount">22,999</span>
                  </div>
                  <Link to="/products" className="product-button">
                    <span className="button-text">View Details</span>
                    <span className="button-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src={productImage2} alt="Silk Cotton Pillow" loading="lazy" />
                <div className="product-overlay">
                  <Link to="/products" className="quick-view-btn">Quick View</Link>
                </div>
                <div className="product-tag new">New</div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Ergonomic Silk Cotton Pillow</h3>
                <p className="product-description">
                  Perfect neck support with pure silk cotton filling for optimal comfort
                </p>
                <div className="product-features">
                  <span className="feature-tag">Ergonomic</span>
                  <span className="feature-tag">Silk Cotton</span>
                  <span className="feature-tag">Support</span>
                </div>
                <div className="product-meta">
                  <div className="product-price">
                    <span className="price-currency">₹</span>
                    <span className="price-amount">1,299</span>
                  </div>
                  <Link to="/products" className="product-button">
                    <span className="button-text">View Details</span>
                    <span className="button-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src={productImage3} alt="Cotton Comforter" loading="lazy" />
                <div className="product-overlay">
                  <Link to="/products" className="quick-view-btn">Quick View</Link>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Kapok Silk Cotton Raw</h3>
                <p className="product-description">
                  Lightweight yet warm natural filling for all-season comfort
                </p>
                <div className="product-features">
                  <span className="feature-tag">Natural</span>
                  <span className="feature-tag">Lightweight</span>
                  <span className="feature-tag">All-Season</span>
                </div>
                <div className="product-meta">
                  <div className="product-price">
                    <span className="price-currency">₹</span>
                    <span className="price-amount">2,499</span>
                  </div>
                  <Link to="/products" className="product-button">
                    <span className="button-text">View Details</span>
                    <span className="button-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="view-all-container">
            <Link to="/products" className="view-all-button">
              <span className="button-text">View All Products</span>
              <span className="button-icon">🔍</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="stats-section animate-on-scroll">
        <div className="stats-background">
          <div className="stats-overlay"></div>
        </div>
        <div className="section-container">
          <div className="stats-content">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Customer Rating from 500+ Reviews</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">70+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔄</div>
              <div className="stat-number">98%</div>
              <div className="stat-label">Return Customer Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Video Section */}
      <section className="video-section animate-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">🎥</span>
              <span className="badge-text">Our Process</span>
            </div>
            <h2 className="section-title">Our Craftsmanship</h2>
            <p className="section-subtitle">
              Experience the artistry and dedication that goes into every product we create
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="video-container">
            <div className={`video-wrapper ${isVideoLoaded ? 'loaded' : ''}`}>
              <video 
                controls 
                width="100%" 
                height="auto"
                onLoadedData={handleVideoLoad}
                poster={heroImage}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isVideoLoaded && (
                <div className="video-loading">
                  <div className="loading-spinner"></div>
                  <span>Loading video...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section className="bottom-cta-section animate-on-scroll">
        <div className="cta-background">
          <div className="cta-overlay"></div>
        </div>
        <div className="section-container">
          <div className="cta-content">
            <div className="cta-badge">
              <span className="badge-icon">✨</span>
              <span className="badge-text">Ready to Experience</span>
            </div>
            <h2 className="cta-title">Experience the Nagarathinam Difference</h2>
            <p className="cta-subtitle">
              Discover our range of premium silk cotton products crafted for your ultimate comfort. 
              Join thousands of satisfied customers who trust Nagarathinam for quality sleep solutions.
            </p>
            <div className="cta-buttons">
              <Link to="/products" className="cta-button primary">
                <span className="button-icon">🛍️</span>
                <span className="button-text">Shop Now</span>
              </Link>
              <Link to="/custom-bed-creator" className="cta-button secondary">
                <span className="button-icon">🎨</span>
                <span className="button-text">Custom Design</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;