import React from 'react';
import './AboutUs.css';
import image1 from '../assets/images/IMG_7610.JPG';
import image2 from '../assets/images/IMG_7536.JPG';
import image3 from '../assets/images/IMG_7538.JPG';
import image4 from '../assets/images/IMG_7545.JPG';
import image5 from '../assets/images/IMG_7573.JPG';
import image6 from '../assets/images/IMG_7574.JPG';
import image7 from '../assets/images/IMG_7625.JPG';

function AboutUs() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h1>Our Heritage</h1>
          <p>Crafting Quality Since 1954</p>
        </div>
        <div className="hero-overlay"></div>
        <img src={image1} alt="Factory Overview" className="hero-image" />
      </div>

      {/* Our Story Section - now with white background */}
      <div className="about-section white-section">
        <div className="section-header">
          <h2>Our Story</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="story-content">
          <div className="story-text">
            <p>Nagarathinam Silk Cotton has been a trusted name in Tamil Nadu for over six decades. Founded in 1954 by Shri. N. Ayyanar, our company started with a simple mission: to provide the finest quality silk cotton products crafted with traditional techniques.</p>
            <p>From humble beginnings in Bodinayakanur, we've grown while maintaining our commitment to quality and authenticity. Today, we're proud to serve customers across India with our premium mattresses, pillows, and bedding products.</p>
          </div>
          <div className="story-image">
            <img src={image2} alt="Our History" />
          </div>
        </div>
      </div>

      {/* Manufacturing Process - keeps dark background */}
      <div className="about-section dark-section">
        <div className="section-header light">
          <h2>Our Manufacturing Process</h2>
          <div className="section-divider light"></div>
        </div>
        
        <div className="process-grid">
          <div className="process-card">
            <div className="process-image">
              <img src={image3} alt="Raw Materials" />
            </div>
            <h3>Sourcing</h3>
            <p>We carefully select the finest raw materials from trusted suppliers to ensure premium quality.</p>
          </div>
          
          <div className="process-card">
            <div className="process-image">
              <img src={image4} alt="Processing" />
            </div>
            <h3>Processing</h3>
            <p>Our skilled craftsmen process the materials using both traditional techniques and modern innovations.</p>
          </div>
          
          <div className="process-card">
            <div className="process-image">
              <img src={image5} alt="Quality Control" />
            </div>
            <h3>Quality Control</h3>
            <p>Every product undergoes rigorous quality checks before reaching our customers.</p>
          </div>
        </div>
      </div>

      {/* Values Section - now with white background */}
      <div className="about-section white-section">
        <div className="section-header">
          <h2>Our Values</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="values-container">
          <div className="values-content">
            <div className="value-item">
              <div className="value-icon">✓</div>
              <div className="value-text">
                <h3>Quality</h3>
                <p>We never compromise on materials or craftsmanship.</p>
              </div>
            </div>
            
            <div className="value-item">
              <div className="value-icon">✓</div>
              <div className="value-text">
                <h3>Tradition</h3>
                <p>We honor traditional techniques while embracing innovation.</p>
              </div>
            </div>
            
            <div className="value-item">
              <div className="value-icon">✓</div>
              <div className="value-text">
                <h3>Community</h3>
                <p>We support our local community by providing employment and sustainable practices.</p>
              </div>
            </div>
          </div>
          
          <div className="values-image">
            <img src={image6} alt="Our Values" />
          </div>
        </div>
      </div>

      {/* Testimonials - keeps dark background */}
      <div className="testimonials-section">
        <div className="section-header light">
          <h2>Customer Testimonials</h2>
          <div className="section-divider light"></div>
        </div>
        
        <div className="testimonial-container">
          <div className="testimonial">
            <div className="quote">"I've been using Nagarathinam mattresses for over 15 years. The quality and comfort are unmatched."</div>
            <div className="client">- Ramesh K., Chennai</div>
          </div>
          
          <div className="testimonial">
            <div className="quote">"Their silk cotton pillows completely eliminated my neck pain. I recommend them to everyone!"</div>
            <div className="client">- Priya S., Madurai</div>
          </div>
          
          <div className="testimonial">
            <div className="quote">"The attention to detail and craftsmanship in their products is something you rarely see these days."</div>
            <div className="client">- Vijay M., Coimbatore</div>
          </div>
        </div>
      </div>

      {/* Visit Us section */}
      <div className="about-section visit-section">
        <div className="visit-content">
          <div className="visit-text">
            <h2>Visit Our Factory</h2>
            <p>We welcome visitors to tour our facility and see our craftsmanship firsthand. Experience the quality of our products and learn about our traditional manufacturing techniques.</p>
            <div className="visit-details">
              <p><strong>Location:</strong> W-1/13, Puthur South Street, Bodinayakanur, Theni-625513, Tamil Nadu</p>
              <p><strong>Hours:</strong> Monday - Saturday, 8:00AM - 8:00PM</p>
            </div>
          </div>
          <div className="visit-image">
            <img src={image7} alt="Our Factory" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;