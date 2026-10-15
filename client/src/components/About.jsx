import React from 'react';
import ScrollReveal from './ScrollReveal';
import './About.css';

export default function About() {
  const stats = [
    { number: '15+', label: 'Years of Craft' },
    { number: '50+', label: 'Artisan Blends' },
    { number: '10K+', label: 'Delighted Guests' },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text-col">
            <ScrollReveal direction="left" delay={100}>
              <div className="section-tag-wrapper">
                <span className="section-tag-line" />
                <span className="section-tag-text">Our Philosophy</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <h2 className="about-heading">
                The Art of<br />
                <span className="gold-gradient-text">Perfect Brewing</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={300}>
              <p className="about-p">
                Founded with a relentless obsession for quality, PARADISE brings together
                rare micro-lot beans, master roasters, and culinary pioneers under a
                single roof. We believe every cup of coffee is a private ceremony of aroma,
                depth, and temperature.
              </p>
              <p className="about-p">
                From morning espresso rituals poured with velvet crema to dim-lit evening
                tasting menus accompanied by hand-whipped desserts, every detail is
                meticulously curated for those who appreciate life’s finest subtleties.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <div className="about-stats">
                {stats.map((stat, idx) => (
                  <div key={idx} className="stat-item">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="about-visual-col">
            <ScrollReveal direction="right" delay={300}>
              <div className="about-image-wrapper">
                <div className="about-image-canvas">
                  <div className="about-badge-card">
                    <h4>Ethically Sourced Single-Origin</h4>
                    <p>Roasted weekly in small batches to preserve nuanced flavor profiles.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
