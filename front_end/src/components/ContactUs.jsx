import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      detail: '+91 9487134178',
      link: 'tel:+919487134178'
    },
    {
      icon: '📧',
      title: 'Email',
      detail: 'info@nagarathinamsilkcotton.com',
      link: 'mailto:info@nagarathinamsilkcotton.com'
    },
    {
      icon: '📍',
      title: 'Address',
      detail: 'W-1/13, Puthur South Street, Bodinayakanur, Theni-625513, Tamil Nadu, India',
      link: 'https://maps.google.com/?q=W-1/13, Puthur South Street, Bodinayakanur, Theni-625513'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      detail: 'Monday - Saturday: 8:00AM - 8:00PM',
      link: null
    }
  ];

  const socialLinks = [
    {
      name: 'Google Reviews',
      icon: '⭐',
      url: 'https://g.co/kgs/anNZN3V',
      color: '#4285f4'
    },
    {
      name: 'Instagram',
      icon: '📸',
      url: 'https://www.instagram.com/kapok_ilavampanju_mattress',
      color: '#e4405f'
    },
    {
      name: 'IndiaMART',
      icon: '🛒',
      url: 'https://www.indiamart.com/nagarathinam/sitenavigation.html',
      color: '#00a651'
    },
    {
      name: 'Facebook',
      icon: '👥',
      url: 'https://www.facebook.com/nagarathinamsilkcotton',
      color: '#1877f2'
    }
  ];

  return (
    <div className="contact-container">
      {/* Contact Header */}
      <div className="contact-header">
        <div className="contact-header-content">
          <div className="header-badge">
            <span className="badge-icon">💬</span>
            <span className="badge-text">Get in Touch</span>
          </div>
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2 className="form-title">Send us a Message</h2>
              <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <span className="label-icon">👤</span>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <span className="label-icon">📱</span>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  <span className="label-icon">💼</span>
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input form-select"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="custom-design">Custom Design Request</option>
                  <option value="order-support">Order Support</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <span className="label-icon">💬</span>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Tell us about your requirements or questions..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                <span className="button-icon">✉️</span>
                <span className="button-text">Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="info-header">
              <h2 className="info-title">Get in Touch</h2>
              <p className="info-subtitle">Multiple ways to reach us for your convenience.</p>
            </div>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-card">
                  <div className="card-icon">
                    <span>{info.icon}</span>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="card-detail-link"
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      >
                        {info.detail}
                      </a>
                    ) : (
                      <p className="card-detail">{info.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Integration */}
            <div className="map-section">
              <h3 className="map-title">Find Us</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.5234567890123!2d77.3500000!3d10.0166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzAwLjAiTiA3N8KwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890123"
                  className="map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ayyanar Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="contact-footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="brand-name">Ayyanar</h3>
              <p className="brand-tagline">Premium Comfort Solutions</p>
              <p className="brand-description">
                Crafting exceptional mattresses and beds with traditional expertise and modern innovation.
              </p>
            </div>

            <div className="footer-links-grid">
              <div className="footer-section">
                <h4 className="footer-section-title">Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="/" className="footer-link">Home</a></li>
                  <li><a href="/products" className="footer-link">Products</a></li>
                  <li><a href="/custom-bed-creator" className="footer-link">Custom Design</a></li>
                  <li><a href="/aboutus" className="footer-link">About Us</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4 className="footer-section-title">Products</h4>
                <ul className="footer-links">
                  <li><a href="/products" className="footer-link">Mattresses</a></li>
                  <li><a href="/products" className="footer-link">Custom Beds</a></li>
                  <li><a href="/products" className="footer-link">Pillows</a></li>
                  <li><a href="/products" className="footer-link">Accessories</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4 className="footer-section-title">Support</h4>
                <ul className="footer-links">
                  <li><a href="#contact" className="footer-link">Contact Us</a></li>
                  <li><a href="#faq" className="footer-link">FAQ</a></li>
                  <li><a href="#warranty" className="footer-link">Warranty</a></li>
                  <li><a href="#shipping" className="footer-link">Shipping Info</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h4 className="social-title">Follow Us</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--social-color': social.color }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              <p>&copy; {new Date().getFullYear()} Ayyanar - Nagarathinam Silk Cotton. All rights reserved.</p>
            </div>
            <div className="footer-meta">
              <a href="#privacy" className="meta-link">Privacy Policy</a>
              <span className="meta-separator">•</span>
              <a href="#terms" className="meta-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;