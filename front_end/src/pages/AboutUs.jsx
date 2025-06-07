import React, { useEffect } from 'react';
import './AboutUs.css';
import image1 from '../assets/images/IMG_7610.JPG';
import image2 from '../assets/images/IMG_7536.JPG';
import image3 from '../assets/images/IMG_7538.JPG';
import image4 from '../assets/images/IMG_7545.JPG';
import image5 from '../assets/images/IMG_7573.JPG';
import image6 from '../assets/images/IMG_7574.JPG';
import image7 from '../assets/images/IMG_7625.JPG';

function AboutUs() {
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

  return (
    <div className="about-container">
      {/* Enhanced Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <img src={image1} alt="Factory Overview" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🏭</span>
            <span className="badge-text">Since 1954</span>
          </div>
          <h1 className="hero-title">Our Heritage</h1>
          <p className="hero-subtitle">
            Crafting Premium Silk Cotton Products with 
            <span className="highlight-text">Traditional Excellence</span>
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">70+</span>
              <span className="stat-label">Years of Legacy</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Natural Products</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Discover our story</span>
        </div>
      </section>

      {/* Enhanced Our Story Section */}
      <section className="about-section story-section animate-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">📖</span>
              <span className="badge-text">Our Journey</span>
            </div>
            <h2 className="section-title">Our Story</h2>
            <p className="section-subtitle">
              A legacy of craftsmanship spanning generations
            </p>
            <div className="section-divider"></div>
          </div>
          
          <div className="story-content">
            <div className="story-text">
              <div className="story-intro">
                <h3 className="story-heading">From Humble Beginnings to Excellence</h3>
                <p className="story-highlight">
                  Founded in 1954 by <strong>Shri. N. Ayyanar</strong>, Nagarathinam Silk Cotton began 
                  with a vision to bring the finest traditional comfort to every home.
                </p>
              </div>
              
              <div className="story-details">
                <div className="story-item">
                  <div className="story-icon">🌱</div>
                  <div className="story-item-content">
                    <h4>The Beginning</h4>
                    <p>
                      Started in the heart of Bodinayakanur with traditional techniques 
                      passed down through generations, focusing on authentic silk cotton products.
                    </p>
                  </div>
                </div>
                
                <div className="story-item">
                  <div className="story-icon">🚀</div>
                  <div className="story-item-content">
                    <h4>Growth & Innovation</h4>
                    <p>
                      While preserving our traditional methods, we've embraced modern quality 
                      standards and expanded our reach across Tamil Nadu and beyond.
                    </p>
                  </div>
                </div>
                
                <div className="story-item">
                  <div className="story-icon">🏆</div>
                  <div className="story-item-content">
                    <h4>Today's Excellence</h4>
                    <p>
                      Now serving thousands of satisfied customers nationwide, we continue 
                      to uphold our founder's vision of uncompromising quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="story-image">
              <div className="image-wrapper">
                <img src={image2} alt="Our History" />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <span className="overlay-text">70 Years of Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Manufacturing Process Section */}
      <section className="about-section process-section animate-on-scroll">
        <div className="process-background">
          <div className="process-overlay"></div>
        </div>
        
        <div className="section-container">
          <div className="section-header light">
            <div className="section-badge light">
              <span className="badge-icon">⚙️</span>
              <span className="badge-text">Our Craft</span>
            </div>
            <h2 className="section-title">Manufacturing Excellence</h2>
            <p className="section-subtitle">
              Where traditional craftsmanship meets modern quality standards
            </p>
            <div className="section-divider light"></div>
          </div>
          
          <div className="process-grid">
            <div className="process-card">
              <div className="process-number">01</div>
              <div className="process-image">
                <img src={image3} alt="Raw Materials" />
                <div className="process-icon">🌿</div>
              </div>
              <div className="process-content">
                <h3>Premium Sourcing</h3>
                <p>
                  We carefully select the finest raw silk cotton materials from trusted 
                  suppliers, ensuring only the highest quality reaches our production.
                </p>
                <ul className="process-features">
                  <li>100% Natural Materials</li>
                  <li>Strict Quality Checks</li>
                  <li>Sustainable Sourcing</li>
                </ul>
              </div>
            </div>
            
            <div className="process-card">
              <div className="process-number">02</div>
              <div className="process-image">
                <img src={image4} alt="Processing" />
                <div className="process-icon">👨‍🔧</div>
              </div>
              <div className="process-content">
                <h3>Expert Craftsmanship</h3>
                <p>
                  Our skilled artisans blend time-honored techniques with modern 
                  innovations to create products of exceptional comfort and durability.
                </p>
                <ul className="process-features">
                  <li>Traditional Techniques</li>
                  <li>Modern Equipment</li>
                  <li>Skilled Craftsmen</li>
                </ul>
              </div>
            </div>
            
            <div className="process-card">
              <div className="process-image">
                <img src={image5} alt="Quality Control" />
                <div className="process-icon">✅</div>
              </div>
              <div className="process-number">03</div>
              <div className="process-content">
                <h3>Quality Assurance</h3>
                <p>
                  Every product undergoes rigorous quality checks and testing to ensure 
                  it meets our exacting standards before reaching our customers.
                </p>
                <ul className="process-features">
                  <li>Multi-Stage Testing</li>
                  <li>Quality Certification</li>
                  <li>Customer Satisfaction</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="about-section values-section animate-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">💎</span>
              <span className="badge-text">Our Principles</span>
            </div>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
            <div className="section-divider"></div>
          </div>
          
          <div className="values-container">
            <div className="values-content">
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                  </div>
                  <h3>Uncompromising Quality</h3>
                  <p>We never compromise on materials or craftsmanship, ensuring every product meets our highest standards.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3>Traditional Heritage</h3>
                  <p>We honor time-tested techniques while embracing innovation to serve modern needs.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </div>
                  <h3>Community Focus</h3>
                  <p>We support our local community through employment and sustainable practices.</p>
                </div>
                
                <div className="value-card">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h3>Customer Satisfaction</h3>
                  <p>Your comfort and satisfaction are at the heart of everything we create.</p>
                </div>
              </div>
            </div>
            
            <div className="values-image">
              <div className="image-wrapper">
                <img src={image6} alt="Our Values" />
                <div className="values-overlay">
                  <div className="overlay-stat">
                    <span className="overlay-number">98%</span>
                    <span className="overlay-label">Customer Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="testimonials-section animate-on-scroll">
        <div className="testimonials-background">
          <div className="testimonials-overlay"></div>
        </div>
        
        <div className="section-container">
          <div className="section-header light">
            <div className="section-badge light">
              <span className="badge-icon">💬</span>
              <span className="badge-text">Customer Love</span>
            </div>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Real experiences from our valued customers
            </p>
            <div className="section-divider light"></div>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">❝</div>
                <p className="testimonial-text">
                  "I've been using Nagarathinam mattresses for over 15 years. The quality 
                  and comfort are unmatched. My entire family sleeps better!"
                </p>
                <div className="rating">
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                </div>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div className="author-info">
                  <span className="author-name">Ramesh K.</span>
                  <span className="author-location">Chennai</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">❝</div>
                <p className="testimonial-text">
                  "Their silk cotton pillows completely eliminated my neck pain. 
                  I recommend them to everyone seeking natural comfort!"
                </p>
                <div className="rating">
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                </div>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">P</div>
                <div className="author-info">
                  <span className="author-name">Priya S.</span>
                  <span className="author-location">Madurai</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">❝</div>
                <p className="testimonial-text">
                  "The attention to detail and craftsmanship in their products is 
                  something you rarely see these days. Truly exceptional!"
                </p>
                <div className="rating">
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                </div>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">V</div>
                <div className="author-info">
                  <span className="author-name">Vijay M.</span>
                  <span className="author-location">Coimbatore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Visit Us Section */}
      <section className="visit-section animate-on-scroll">
        <div className="section-container">
          <div className="visit-content">
            <div className="visit-info">
              <div className="section-badge">
                <span className="badge-icon">🏭</span>
                <span className="badge-text">Visit Us</span>
              </div>
              <h2 className="visit-title">Experience Our Craftsmanship</h2>
              <p className="visit-description">
                We welcome visitors to tour our facility and witness our traditional 
                manufacturing process firsthand. See the dedication and skill that goes 
                into every product we create.
              </p>
              
              <div className="visit-details">
                <div className="detail-item">
                  <div className="detail-icon">📍</div>
                  <div className="detail-content">
                    <h4>Location</h4>
                    <p>W-1/13, Puthur South Street<br />Bodinayakanur, Theni-625513<br />Tamil Nadu, India</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon">🕒</div>
                  <div className="detail-content">
                    <h4>Factory Hours</h4>
                    <p>Monday - Saturday<br />8:00 AM - 8:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon">📞</div>
                  <div className="detail-content">
                    <h4>Contact</h4>
                    <p>+91 9487134178<br />info@nagarathinamsilkcotton.com</p>
                  </div>
                </div>
              </div>
              
              <div className="visit-cta">
                <a href="tel:+919487134178" className="cta-button primary">
                  <span className="button-icon">📞</span>
                  <span className="button-text">Call to Schedule</span>
                </a>
                <a href="https://maps.google.com/?q=W-1/13, Puthur South Street, Bodinayakanur, Theni-625513" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="cta-button secondary">
                  <span className="button-icon">🗺️</span>
                  <span className="button-text">Get Directions</span>
                </a>
              </div>
            </div>
            
            <div className="visit-image">
              <div className="image-wrapper">
                <img src={image7} alt="Our Factory" />
                <div className="visit-overlay">
                  <div className="overlay-content">
                    <span className="overlay-icon">🏭</span>
                    <span className="overlay-text">Factory Tours Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;