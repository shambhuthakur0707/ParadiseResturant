import React, { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col">
            <h3 className="footer-brand-title">PARADISE</h3>
            <p className="footer-brand-desc">
              Where Every Sip Tells a Story. An exceptional union of artisanal coffee
              roasting, handcrafted culinary arts, and timeless twilight ambiance.
            </p>
            <div className="footer-social-row">
              <a href="#instagram" className="social-icon-circle" aria-label="Instagram">
                📸
              </a>
              <a href="#facebook" className="social-icon-circle" aria-label="Facebook">
                ☕
              </a>
              <a href="#twitter" className="social-icon-circle" aria-label="Twitter">
                ✨
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#home">Home</a>
              </li>
              <li className="footer-link-item">
                <a href="#about">About Our Roastery</a>
              </li>
              <li className="footer-link-item">
                <a href="#menu">Signature Menu</a>
              </li>
              <li className="footer-link-item">
                <a href="#gallery">Atmosphere &amp; Gallery</a>
              </li>
              <li className="footer-link-item">
                <a href="#reservation">Table Reservations</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Location */}
          <div className="footer-col">
            <h4 className="footer-heading">Hours &amp; Location</h4>
            <div className="footer-hours-list">
              <div className="hours-row">
                <span className="hours-days">Monday – Thursday</span>
                <span className="hours-time">7:00 AM – 10:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="hours-days">Friday – Saturday</span>
                <span className="hours-time">7:00 AM – 11:30 PM</span>
              </div>
              <div className="hours-row">
                <span className="hours-days">Sunday Brunch</span>
                <span className="hours-time">8:00 AM – 9:00 PM</span>
              </div>
            </div>

            <div className="footer-location-block">
              <div className="location-pin-row">
                <span className="location-emoji">📍</span>
                <address className="location-address-text">
                  Vattamalaipalayam N.G, G.O. Colony, Post,<br />
                  Coimbatore, Tamil Nadu 641022
                </address>
              </div>
              <a
                href="https://maps.google.com/?q=Vattamalaipalayam+N.G,+G.O.+Colony,+Post,+Coimbatore,+Tamil+Nadu+641022"
                target="_blank"
                rel="noopener noreferrer"
                className="directions-link"
              >
                <span>Get Directions</span>
                <span className="arrow-icon">↗</span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact &amp; Reservations</h4>
            <p className="newsletter-desc">
              Subscribe for private tasting invitations, rare roast releases, and seasonal menus.
            </p>

            {isSubscribed ? (
              <p style={{ color: 'var(--accent-gold-light)', fontSize: '0.9rem' }}>
                ✓ Welcome to the Connoisseur Circle.
              </p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </form>
            )}

            <div className="footer-direct-contact">
              <div className="contact-row">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <span className="contact-title">Direct Concierge</span>
                  <a href="tel:07530089996" className="contact-phone-link">
                    075300 89996
                  </a>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon">💬</span>
                <div className="contact-details">
                  <span className="contact-title">WhatsApp Booking</span>
                  <a
                    href="https://wa.me/917530089996?text=Hi%20PARADISE%20Cafe,%20I%20would%20like%20to%20reserve%20a%20table%20or%20inquire%20about%20the%20menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-chat-link"
                  >
                    Chat on WhatsApp ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map Card */}
        <div className="footer-map-section">
          <div className="map-header">
            <span className="map-badge">Interactive Map</span>
            <span className="map-title">Find PARADISE in Coimbatore</span>
          </div>
          <div className="map-frame-wrapper">
            <iframe
              title="PARADISE Cafe Location Map - Coimbatore"
              src="https://maps.google.com/maps?q=Vattamalaipalayam%20N.G%20G.O.%20Colony%20Coimbatore%20Tamil%20Nadu%20641022&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} PARADISE Cafe &amp; Restaurant. All rights reserved.</p>
          <p>Crafted with passion for authentic coffee &amp; culinary culture.</p>
        </div>
      </div>
    </footer>
  );
}
