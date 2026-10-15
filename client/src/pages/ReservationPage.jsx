import React from 'react';
import Navbar from '../components/Navbar';
import Reservation from '../components/Reservation';
import Footer from '../components/Footer';
import './Pages.css';

export default function ReservationPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-main">
        <div className="page-hero">
          <span className="page-hero-tag">Book Your Experience</span>
          <h1 className="page-hero-title">Table <span>Reservation</span></h1>
          <p className="page-hero-desc">
            Reserve your seat in paradise. For private events or parties over 10 guests, please contact our concierge team directly.
          </p>
        </div>
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}
