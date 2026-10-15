import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContactMessage } from '../api';
import './Pages.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in name, email, and message.');
      return;
    }

    setLoading(true);
    try {
      await submitContactMessage(formData);
      toast.success('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-main">
        <div className="page-hero">
          <span className="page-hero-tag">Get in Touch</span>
          <h1 className="page-hero-title">Contact <span>Us</span></h1>
          <p className="page-hero-desc">
            Have questions about our menu, special events, or catering? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info-card">
            <div>
              <h3 className="contact-info-title">Visit Paradise</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                We look forward to welcoming you for an unforgettable dining experience.
              </p>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box">📍</div>
              <div className="contact-info-text">
                <h4>Address</h4>
                <p>124 Grand Boulevard, Suite 400<br />New York, NY 10012</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box">📞</div>
              <div className="contact-info-text">
                <h4>Phone & Inquiries</h4>
                <p>+1 (555) 234-5678<br />concierge@paradisecafe.com</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-box">⏰</div>
              <div className="contact-info-text">
                <h4>Operating Hours</h4>
                <p>Mon - Fri: 8:00 AM – 10:00 PM<br />Sat - Sun: 9:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h3 className="contact-info-title" style={{ marginBottom: '1.5rem' }}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="Private Event Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-gold-solid"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                disabled={loading}
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
