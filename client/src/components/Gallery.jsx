import React from 'react';
import ScrollReveal from './ScrollReveal';
import './Gallery.css';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'The Obsidian Espresso Bar',
    tag: 'Craft & Equipment',
    className: 'span-tall',
    image: '/images/cafe-interior.png',
    gradient: 'linear-gradient(135deg, rgba(31, 20, 14, 0.4) 0%, rgba(13, 8, 6, 0.6) 100%)',
  },
  {
    id: 2,
    title: 'Velvet Pour Ceremonies',
    tag: 'Artisan Barista',
    className: '',
    image: '/images/signature-latte.png',
    gradient: 'linear-gradient(135deg, rgba(36, 22, 13, 0.4) 0%, rgba(17, 11, 7, 0.5) 100%)',
  },
  {
    id: 3,
    title: 'Midnight Tasting Lounge',
    tag: 'Atmosphere & Cocktails',
    className: 'span-wide',
    image: '/images/hero-bg.png',
    gradient: 'linear-gradient(135deg, rgba(21, 17, 14, 0.3) 0%, rgba(10, 8, 7, 0.5) 100%)',
  },
  {
    id: 4,
    title: 'Handcrafted Pastry Atelier',
    tag: 'French Patisserie',
    className: '',
    image: '/images/food-spread.png',
    gradient: 'linear-gradient(135deg, rgba(44, 26, 14, 0.4) 0%, rgba(19, 12, 8, 0.5) 100%)',
  },
  {
    id: 5,
    title: 'The Brass Siphon Laboratory',
    tag: 'Extraction Science',
    className: '',
    image: '/images/cafe-about.png',
    gradient: 'linear-gradient(135deg, rgba(27, 18, 12, 0.4) 0%, rgba(12, 8, 6, 0.5) 100%)',
  },
  {
    id: 6,
    title: 'The Private Solarium Salon',
    tag: 'Intimate Dining',
    className: 'span-wide',
    image: '/images/grilled-lamb.png',
    gradient: 'linear-gradient(135deg, rgba(34, 20, 10, 0.3) 0%, rgba(10, 7, 5, 0.5) 100%)',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div className="gallery-header">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line" />
              <span className="section-tag-text">Interior &amp; Ambience</span>
              <span className="section-tag-line" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="section-title">
              A Glimpse Inside <span className="gold-gradient-text">Paradise</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <p className="section-subtitle">
              Sinuous brass architectural fixtures, low-lit mahogany enclaves, and the warm glow
              of espresso machines create an inviting sanctuary from the city bustle.
            </p>
          </ScrollReveal>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={idx * 80}
              className={`gallery-item ${item.className}`}
            >
              <div
                className="gallery-photo-art"
                style={{ 
                  backgroundImage: `${item.gradient}, url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <div className="gallery-overlay">
                <div className="gallery-zoom-icon">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0zM11 8v6M8 11h6"
                    />
                  </svg>
                </div>
                <span className="gallery-overlay-tag">{item.tag}</span>
                <h4 className="gallery-overlay-caption">{item.title}</h4>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
