import React from 'react';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-container">
      <footer className="contact-footer">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Contact Us</h2>
            <p className="contact-detail"><span>Phone:</span> +91 9487134178</p>
            <p className="contact-detail"><span>Address:</span> W-1/13, Puthur South Street, Bodinayakanur, Theni-625513, Tamil Nadu, India</p>
            <p className="contact-detail"><span>Email:</span> info@nagarathinamsilkcotton.com</p>
            <p className="contact-detail"><span>Hours:</span> Monday - Saturday: 8:00AM - 8:00PM</p>
          </div>

          <div className="social-info">
            <h2 className="section-title">Follow Us</h2>
            <ul className="social-links">
              <li><a href="https://g.co/kgs/anNZN3V" target="_blank" rel="noopener noreferrer">Google Reviews</a></li>
              <li><a href="https://www.instagram.com/kapok_ilavampanju_mattress" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.indiamart.com/nagarathinam/sitenavigation.html" target="_blank" rel="noopener noreferrer">IndiaMART</a></li>
              <li><a href="https://www.facebook.com/nagarathinamsilkcotton" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Ayyanar - Nagarathinam Silk Cotton. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;