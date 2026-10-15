import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';
import { fetchReservations, updateReservation, deleteReservation } from '../../api';

const STATUS_FILTERS = ['All', 'pending', 'confirmed', 'cancelled'];

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const loadReservations = async () => {
    try {
      setLoading(true);
      const res = await fetchReservations();
      setReservations(res.data?.data || []);
    } catch {
      toast.error('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReservation(id, { status: newStatus });
      toast.success(`Reservation marked as ${newStatus}`);
      loadReservations();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete reservation for ${name}?`)) return;

    try {
      await deleteReservation(id);
      toast.success('Reservation deleted');
      loadReservations();
    } catch {
      toast.error('Failed to delete reservation');
    }
  };

  const filtered = reservations
    .filter((r) => {
      if (filter === 'All') return true;
      return r.status === filter;
    })
    .filter((r) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        r.name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q)
      );
    });

  return (
    <AdminLayout title="Reservation Management">
      <div className="admin-toolbar">
        <div className="admin-filter-group">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={`filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)} (
              {s === 'All' ? reservations.length : reservations.filter((r) => r.status === s).length}
              )
            </button>
          ))}
        </div>

        <div style={{ minWidth: '240px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Guest Details</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Special Requests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Loading reservations...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No reservations match your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r._id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{r.email}</div>
                    {r.phone && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📞 {r.phone}</div>
                    )}
                  </td>
                  <td>
                    <div>{r.date}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{r.time}</div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{r.guests}</span> {r.guests === 1 ? 'Person' : 'People'}
                  </td>
                  <td style={{ maxWidth: '240px' }}>
                    {r.specialRequests ? (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        "{r.specialRequests}"
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-pill status-${r.status}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns-group">
                      {r.status !== 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(r._id, 'confirmed')}
                          className="action-btn-sm action-btn-confirm"
                          title="Confirm reservation"
                        >
                          Confirm
                        </button>
                      )}
                      {r.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(r._id, 'cancelled')}
                          className="action-btn-sm action-btn-cancel"
                          title="Cancel reservation"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(r._id, r.name)}
                        className="action-btn-sm action-btn-delete"
                        title="Delete permanently"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
