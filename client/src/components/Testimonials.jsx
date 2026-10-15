import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'PARADISE is the rare sanctum where coffee preparation is treated with the reverence of fine wine. The Obsidian espresso was an unforgettable sensory experience.',
    author: 'Julian Montgomery',
    role: 'Culinary Critic, Epicurean Gazette',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'From the low golden illumination to the buttery saffron croissant, every second spent here feels like stepping into an intimate European private lounge.',
    author: 'Elena Rostova',
    role: 'Interior Architect & Lifestyle Columnist',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The Wagyu toast and cold drip Reserve Geisha pair seamlessly. Service is attentive yet discreet. There is simply nothing else like PARADISE in the city.',
    author: 'Marcus Vance',
    role: 'Private Collector & Patron',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line" />
              <span className="section-tag-text">Guest Impressions</span>
              <span className="section-tag-line" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="section-title">
              What Our <span className="gold-gradient-text">Guests Say</span>
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={300}>
          <div className="testimonial-carousel-wrapper">
            <div className="testimonial-card">
              <div className="testimonial-quote-mark">“</div>
              <p className="testimonial-quote-text">{current.quote}</p>

              <div className="testimonial-rating">
                {[...Array(current.rating)].map((_, i) => (
                  <span key={i} className="star-gold">
                    ★
                  </span>
                ))}
              </div>

              <div className="testimonial-author-info">
                <span className="author-name">{current.author}</span>
                <span className="author-role">{current.role}</span>
              </div>
            </div>

            <div className="testimonial-dots">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  className={`dot-btn ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
