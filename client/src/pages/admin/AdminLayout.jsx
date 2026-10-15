import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './Admin.css';

export default function AdminLayout({ children, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Link to="/">PARADISE</Link>
          <span className="admin-badge-pill">Admin Portal</span>
        </div>

        <nav className="admin-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            📊 <span>Dashboard Overview</span>
          </NavLink>

          <NavLink
            to="/admin/reservations"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            📅 <span>Reservations</span>
          </NavLink>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            🍽️ <span>Menu Items</span>
          </NavLink>

          <NavLink
            to="/admin/contacts"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            ✉️ <span>Guest Inquiries</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item">
            🌐 <span>View Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="action-btn-sm action-btn-delete"
            style={{ width: '100%', padding: '0.65rem' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="admin-main">
        <header className="admin-header">
          <h2 className="admin-page-title">{title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Logged in as <strong style={{ color: 'var(--accent-gold)' }}>{user?.name}</strong>
            </span>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
