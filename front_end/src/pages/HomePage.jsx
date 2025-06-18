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

      {/* Redesigned Why Choose Us Section - Card-Based Layout */}
      <section className="why-choose-section animate-on-scroll">
        <div className="section-wrapper">
          {/* New Compact Header Design */}
          <div className="section-intro">
            <div className="intro-badge">
              <span>⭐</span>
              <span>Why Choose Us</span>
            </div>
            <h2 className="intro-title">Why Choose Nagarathinam</h2>
            <p className="intro-subtitle">
              Discover what makes us the preferred choice for premium silk cotton products
            </p>
          </div>

          {/* New Card-Grid Layout */}
          <div className="features-container">
            <div className="feature-item">
              <div className="feature-visual">
                <div className="feature-emoji">⚙️</div>
                <div className="feature-bg"></div>
              </div>
              <div className="feature-text">
                <h3>Premium Quality</h3>
                <p>Handcrafted with the finest silk cotton materials for unparalleled comfort and durability</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-visual">
                <div className="feature-emoji">🛡️</div>
                <div className="feature-bg"></div>
              </div>
              <div className="feature-text">
                <h3>Traditional Craftsmanship</h3>
                <p>Preserving age-old techniques passed down through generations since 1954</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-visual">
                <div className="feature-emoji">✅</div>
                <div className="feature-bg"></div>
              </div>
              <div className="feature-text">
                <h3>100% Natural</h3>
                <p>Chemical-free and eco-friendly products for a healthier sleep and lifestyle</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-visual">
                <div className="feature-emoji">❤️</div>
                <div className="feature-bg"></div>
              </div>
              <div className="feature-text">
                <h3>Customer Satisfaction</h3>
                <p>Dedicated to providing exceptional products and service to every customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Featured Products Section - Modern Layout */}
      <section className="products-section animate-on-scroll">
        <div className="section-wrapper">
          {/* New Compact Header Design */}
          <div className="section-intro">
            <div className="intro-badge">
              <span>🛏️</span>
              <span>Featured Products</span>
            </div>
            <h2 className="intro-title">Featured Products</h2>
            <p className="intro-subtitle">
              Discover our most popular and premium silk cotton products
            </p>
          </div>

          {/* New Product Cards Layout */}
          <div className="products-showcase">
            <div className="product-item">
              <div className="product-visual">
                <img src={productImage1} alt="Premium Mattress" />
                <div className="product-badge bestseller">Bestseller</div>
                <div className="product-hover">
                  <Link to="/products" className="hover-btn">Quick View</Link>
                </div>
              </div>
              <div className="product-details">
                <h3>King Size Premium Ilavam Panju Mattress</h3>
                <p>Luxurious comfort with natural temperature regulation and superior support</p>
                <div className="product-tags">
                  <span>Natural</span>
                  <span>King Size</span>
                  <span>Premium</span>
                </div>
                <div className="product-footer">
                  <div className="price">
                    <span className="currency">₹</span>
                    <span className="amount">22,999</span>
                  </div>
                  <Link to="/products" className="product-btn">
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="product-item">
              <div className="product-visual">
                <img src={productImage2} alt="Silk Cotton Pillow" />
                <div className="product-badge new">New</div>
                <div className="product-hover">
                  <Link to="/products" className="hover-btn">Quick View</Link>
                </div>
              </div>
              <div className="product-details">
                <h3>Ergonomic Silk Cotton Pillow</h3>
                <p>Perfect neck support with pure silk cotton filling for optimal comfort</p>
                <div className="product-tags">
                  <span>Ergonomic</span>
                  <span>Silk Cotton</span>
                  <span>Support</span>
                </div>
                <div className="product-footer">
                  <div className="price">
                    <span className="currency">₹</span>
                    <span className="amount">1,299</span>
                  </div>
                  <Link to="/products" className="product-btn">
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="product-item">
              <div className="product-visual">
                <img src={productImage3} alt="Cotton Comforter" />
                <div className="product-hover">
                  <Link to="/products" className="hover-btn">Quick View</Link>
                </div>
              </div>
              <div className="product-details">
                <h3>Kapok Silk Cotton Raw</h3>
                <p>Lightweight yet warm natural filling for all-season comfort</p>
                <div className="product-tags">
                  <span>Natural</span>
                  <span>Lightweight</span>
                  <span>All-Season</span>
                </div>
                <div className="product-footer">
                  <div className="price">
                    <span className="currency">₹</span>
                    <span className="amount">2,499</span>
                  </div>
                  <Link to="/products" className="product-btn">
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="products-action">
            <Link to="/products" className="view-all-btn">
              <span>View All Products</span>
              <span>🔍</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section - Minimal Design */}
      <section className="stats-section animate-on-scroll">
        <div className="stats-background">
          <div className="stats-overlay"></div>
        </div>
        <div className="section-wrapper">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-emoji">👥</div>
              <div className="stat-value">10,000+</div>
              <div className="stat-name">Happy Customers</div>
            </div>

            <div className="stat-item">
              <div className="stat-emoji">⭐</div>
              <div className="stat-value">4.9/5</div>
              <div className="stat-name">Customer Rating</div>
            </div>

            <div className="stat-item">
              <div className="stat-emoji">🏆</div>
              <div className="stat-value">70+</div>
              <div className="stat-name">Years of Excellence</div>
            </div>

            <div className="stat-item">
              <div className="stat-emoji">🔄</div>
              <div className="stat-value">98%</div>
              <div className="stat-name">Return Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Video Section - Clean Design */}
      <section className="video-section animate-on-scroll">
        <div className="section-wrapper">
          <div className="section-intro">
            <div className="intro-badge">
              <span>🎥</span>
              <span>Our Process</span>
            </div>
            <h2 className="intro-title">Our Craftsmanship</h2>
            <p className="intro-subtitle">
              Experience the artistry and dedication that goes into every product we create
            </p>
          </div>

          <div className="video-showcase">
            <div className={`video-frame ${isVideoLoaded ? 'loaded' : ''}`}>
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
                <div className="video-placeholder">
                  <div className="loading-circle"></div>
                  <span>Loading video...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section - Modern Design */}
      <section className="cta-section animate-on-scroll">
        <div className="cta-background">
          <div className="cta-overlay"></div>
        </div>
        <div className="section-wrapper">
          <div className="cta-content">
            <div className="cta-badge">
              <span>✨</span>
              <span>Ready to Experience</span>
            </div>
            <h2 className="cta-title">Experience the Nagarathinam Difference</h2>
            <p className="cta-text">
              Discover our range of premium silk cotton products crafted for your ultimate comfort. 
              Join thousands of satisfied customers who trust Nagarathinam for quality sleep solutions.
            </p>
            <div className="cta-actions">
              <Link to="/products" className="cta-btn primary">
                <span>🛍️</span>
                <span>Shop Now</span>
              </Link>
              <Link to="/custom-bed-creator" className="cta-btn secondary">
                <span>🎨</span>
                <span>Custom Design</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;