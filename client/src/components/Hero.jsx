import React from 'react';
import ScrollReveal from './ScrollReveal';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-backdrop" />
      <div className="hero-glow-orb" />

      <div className="container">
        <div className="hero-content">
          <ScrollReveal direction="up" delay={100}>
            <div className="hero-tag">
              <span className="hero-line" />
              <span className="hero-subtitle">
                EST. 2018 • COIMBATORE • ARTISANAL CAFE &amp; ROASTERY
              </span>
              <span className="hero-line" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <h1 className="hero-title">
              Where Every Sip<br />
              <span className="gold-gradient-text">Tells a Story</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <p className="hero-description">
              Immerse yourself in artisanal single-origin roasts, world-class pastries,
              and moody intimate evening dining designed to elevate every conversation.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={550}>
            <div className="hero-cta-group">
              <a href="#menu" className="btn btn-gold-solid">
                Explore Menu
              </a>
              <a href="#reservation" className="btn btn-gold-outline">
                Book a Table
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <a href="#about" className="hero-scroll-indicator" aria-label="Scroll to explore">
        <span>Scroll to explore</span>
        <div className="scroll-chevron">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </a>
    </section>
  );
}
