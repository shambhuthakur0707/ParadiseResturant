import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createReservation } from '../api';
import ScrollReveal from './ScrollReveal';
import './Reservation.css';

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
];

export default function Reservation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '07:00 PM',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectTime = (time) => {
    setFormData((prev) => ({
      ...prev,
      time,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        guests: Number(formData.guests),
      };
      
      const res = await createReservation(payload);

      if (res.data && res.data.success) {
        setIsSubmitted(true);
        toast.success('Reservation confirmed successfully!');
      } else {
        toast.error(res.data?.message || 'Something went wrong');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create reservation. Please try again.';
      toast.error(message);
      // Do NOT set isSubmitted to true on failure
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: '07:00 PM',
      guests: '2',
      name: '',
      email: '',
      phone: '',
      specialRequests: '',
    });
  };

  return (
    <section id="reservation" className="section reservation-section">
      <div className="container">
        <div className="reservation-header">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line" />
              <span className="section-tag-text">Exclusive Table Booking</span>
              <span className="section-tag-line" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="section-title">
              Reserve Your <span className="gold-gradient-text">Experience</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <p className="section-subtitle">
              Secure your sanctuary for breakfast tastings, afternoon roasts, or an
              intimate evening dinner with our sommelier and culinary artisans.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={350}>
          <div className="reservation-card">
            {!isSubmitted ? (
              <>
                <div className="steps-nav">
                  <div
                    className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}
                    onClick={() => setCurrentStep(1)}
                  >
                    <span className="step-number">1</span>
                    <span>Date &amp; Party</span>
                  </div>

                  <div className="step-divider-line" />

                  <div
                    className={`step-indicator ${currentStep === 2 ? 'active' : ''}`}
                    onClick={() => setCurrentStep(2)}
                  >
                    <span className="step-number">2</span>
                    <span>Guest Details</span>
                  </div>
                </div>

                <form onSubmit={currentStep === 1 ? handleNextStep : handleSubmit}>
                  {currentStep === 1 && (
                    <div className="step-content">
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label" htmlFor="res-date">
                            Select Date
                          </label>
                          <input
                            id="res-date"
                            type="date"
                            name="date"
                            className="form-input"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="res-guests">
                            Number of Guests
                          </label>
                          <select
                            id="res-guests"
                            name="guests"
                            className="form-select"
                            value={formData.guests}
                            onChange={handleChange}
                          >
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={String(n)}>
                                {n} {n === 1 ? 'Person' : 'Persons'}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group form-group-full">
                          <label className="form-label">Select Preferred Time</label>
                          <div className="time-slots-grid">
                            {TIME_SLOTS.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                className={`time-slot-btn ${
                                  formData.time === slot ? 'selected' : ''
                                }`}
                                onClick={() => handleSelectTime(slot)}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="form-nav-buttons">
                        <button type="submit" className="btn btn-gold-solid btn-full">
                          Continue to Guest Details →
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="step-content">
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label" htmlFor="res-name">
                            Full Name
                          </label>
                          <input
                            id="res-name"
                            type="text"
                            name="name"
                            placeholder="e.g. Eleanor Vance"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="res-email">
                            Email Address
                          </label>
                          <input
                            id="res-email"
                            type="email"
                            name="email"
                            placeholder="eleanor@example.com"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group form-group-full">
                          <label className="form-label" htmlFor="res-phone">
                            Phone Number
                          </label>
                          <input
                            id="res-phone"
                            type="tel"
                            name="phone"
                            placeholder="+91 75300 89996"
                            className="form-input"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                            For instant confirmation or group queries, you can also dial directly:{' '}
                            <a href="tel:07530089996" style={{ color: 'var(--accent-gold)' }}>
                              075300 89996
                            </a>
                          </span>
                        </div>

                        <div className="form-group form-group-full">
                          <label className="form-label" htmlFor="res-notes">
                            Special Requests / Dietary Notes
                          </label>
                          <textarea
                            id="res-notes"
                            name="specialRequests"
                            placeholder="Window seat, dietary allergies, champagne upon arrival, anniversary arrangement..."
                            className="form-textarea"
                            value={formData.specialRequests}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-nav-buttons">
                        <button
                          type="button"
                          className="btn btn-gold-outline"
                          onClick={handlePrevStep}
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-gold-solid btn-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            ) : (
              <div className="reservation-success">
                <div className="success-icon-wrap">
                  <svg
                    width="36"
                    height="36"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="success-title">Your Table is Reserved</h3>
                <p className="success-message">
                  Thank you, <strong>{formData.name || 'Valued Guest'}</strong>. We have
                  received your reservation for <strong>{formData.guests} guests</strong> on{' '}
                  <strong>{formData.date}</strong> at <strong>{formData.time}</strong>. A
                  confirmation will be sent to your email shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-gold-outline"
                  onClick={resetForm}
                >
                  Make Another Reservation
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
