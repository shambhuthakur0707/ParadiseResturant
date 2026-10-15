import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import './Pages.css';

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-main">
        <div className="page-hero">
          <span className="page-hero-tag">Our Story & Philosophy</span>
          <h1 className="page-hero-title">About <span>Paradise Cafe</span></h1>
          <p className="page-hero-desc">
            A sanctuary where gourmet gastronomy meets warm elegance, creating memorable moments with every dish.
          </p>
        </div>
        <About />
        <Gallery />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
