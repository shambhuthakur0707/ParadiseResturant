import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';
import { fetchReservations, fetchMenuItems, fetchContactMessages, updateReservation } from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    reservations: 0,
    pendingReservations: 0,
    confirmedReservations: 0,
    menuItems: 0,
    contacts: 0,
  });
  const [recentReservations, setRecentReservations] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [resRes, resMenu, resContacts] = await Promise.all([
        fetchReservations(),
        fetchMenuItems(),
        fetchContactMessages(),
      ]);

      const reservations = resRes.data?.data || [];
      const menu = resMenu.data?.data || [];
      const contacts = resContacts.data?.data || [];

      const pending = reservations.filter((r) => r.status === 'pending').length;
      const confirmed = reservations.filter((r) => r.status === 'confirmed').length;

      setStats({
        reservations: reservations.length,
        pendingReservations: pending,
        confirmedReservations: confirmed,
        menuItems: menu.length,
        contacts: contacts.length,
      });

      setRecentReservations(reservations.slice(0, 5));
      setRecentContacts(contacts.slice(0, 5));
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateReservation(id, { status });
      toast.success(`Reservation marked as ${status}`);
      loadData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Metric Cards */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-card-title">Pending Reservations</div>
          <div className="stat-card-value" style={{ color: '#E5A93B' }}>
            {loading ? '—' : stats.pendingReservations}
          </div>
          <div className="stat-card-subtitle">Requires confirmation</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-title">Confirmed Bookings</div>
          <div className="stat-card-value" style={{ color: '#48bb78' }}>
            {loading ? '—' : stats.confirmedReservations}
          </div>
          <div className="stat-card-subtitle">Ready to welcome</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-title">Active Menu Items</div>
          <div className="stat-card-value">{loading ? '—' : stats.menuItems}</div>
          <div className="stat-card-subtitle">Dishes, drinks & desserts</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-title">Guest Inquiries</div>
          <div className="stat-card-value">{loading ? '—' : stats.contacts}</div>
          <div className="stat-card-subtitle">Messages received</div>
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="admin-toolbar">
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
            Recent Table Reservations
          </h3>
          <Link to="/admin/reservations" className="filter-btn">
            View All ({stats.reservations}) →
          </Link>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Date & Time</th>
                <th>Party Size</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReservations.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No reservations recorded yet.
                  </td>
                </tr>
              ) : (
                recentReservations.map((res) => (
                  <tr key={res._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{res.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{res.email}</div>
                    </td>
                    <td>
                      <div>{res.date}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{res.time}</div>
                    </td>
                    <td>{res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}</td>
                    <td>
                      <span className={`status-pill status-${res.status}`}>
                        {res.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns-group">
                        {res.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(res._id, 'confirmed')}
                            className="action-btn-sm action-btn-confirm"
                          >
                            Confirm
                          </button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(res._id, 'cancelled')}
                            className="action-btn-sm action-btn-cancel"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Contact Messages */}
      <div>
        <div className="admin-toolbar">
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
            Recent Guest Messages
          </h3>
          <Link to="/admin/contacts" className="filter-btn">
            View All ({stats.contacts}) →
          </Link>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Message Snippet</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No contact messages yet.
                  </td>
                </tr>
              ) : (
                recentContacts.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.email}</div>
                    </td>
                    <td>{c.subject || '—'}</td>
                    <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.message}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
