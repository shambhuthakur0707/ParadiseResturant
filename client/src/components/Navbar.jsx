import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: isHomePage ? '#about' : '/about' },
    { label: 'Menu', to: '/menu' },
    { label: 'Gallery', to: isHomePage ? '#gallery' : '/#gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleNavClick = (to) => {
    closeMobileMenu();
    // Handle hash links for same-page scrolling
    if (to.startsWith('#')) {
      const el = document.querySelector(to);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            <Link to="/" className="brand-logo" aria-label="PARADISE Home">
              <span className="brand-text">PARADISE</span>
            </Link>

            <nav aria-label="Main Navigation">
              <ul className="nav-links">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.to.startsWith('#') || item.to.startsWith('/#') ? (
                      <a
                        href={item.to}
                        className="nav-link"
                        onClick={() => handleNavClick(item.to)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className={`nav-link nav-admin-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className="nav-actions">
              {user ? (
                <div className="nav-user-actions">
                  <span className="nav-user-name">{user.name?.split(' ')[0]}</span>
                  <button onClick={logout} className="nav-reserve-btn nav-logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="nav-reserve-btn">
                  Login
                </Link>
              )}

              <button
                type="button"
                className={`nav-hamburger ${mobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="hamburger-line line-1"></span>
                <span className="hamburger-line line-2"></span>
                <span className="hamburger-line line-3"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item, idx) => (
            <li
              key={item.label}
              style={{
                transitionDelay: `${idx * 80}ms`,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: 'all 0.4s ease',
              }}
            >
              {item.to.startsWith('#') || item.to.startsWith('/#') ? (
                <a
                  href={item.to}
                  className="mobile-nav-link"
                  onClick={() => handleNavClick(item.to)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.to}
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link to="/admin" className="mobile-nav-link" onClick={closeMobileMenu}>
                🛡️ Admin Panel
              </Link>
            </li>
          )}
          <li style={{ marginTop: '1rem' }}>
            {user ? (
              <button
                className="btn btn-gold-solid"
                onClick={() => { logout(); closeMobileMenu(); }}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-gold-solid"
                onClick={closeMobileMenu}
              >
                Login / Register
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/reservation"
              className="btn btn-gold-outline"
              onClick={closeMobileMenu}
            >
              Reserve a Table
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
