import React from 'react';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import './Pages.css';

export default function MenuPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-main">
        <div className="page-hero">
          <span className="page-hero-tag">Culinary Excellence</span>
          <h1 className="page-hero-title">Our <span>Menu</span></h1>
          <p className="page-hero-desc">
            Explore our curated culinary creations, made with the freshest seasonal ingredients and artisanal dedication.
          </p>
        </div>
        <Menu />
      </main>
      <Footer />
    </div>
  );
}
