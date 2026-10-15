import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';
import { fetchContactMessages, deleteContactMessage } from '../../api';

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [search, setSearch] = useState('');

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await fetchContactMessages();
      setMessages(res.data?.data || []);
    } catch {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id, sender) => {
    if (!window.confirm(`Are you sure you want to delete the message from ${sender}?`)) return;

    try {
      await deleteContactMessage(id);
      toast.success('Message deleted successfully.');
      if (selectedMessage?._id === id) setSelectedMessage(null);
      loadMessages();
    } catch {
      toast.error('Failed to delete message.');
    }
  };

  const filtered = messages.filter((m) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.subject?.toLowerCase().includes(q) ||
      m.message?.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout title="Guest Inquiries & Messages">
      <div className="admin-toolbar">
        <div>
          <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Total Inquiries: <strong style={{ color: 'var(--accent-gold)' }}>{messages.length}</strong>
          </span>
        </div>

        <div style={{ minWidth: '260px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search messages by name, email, keyword..."
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
              <th>Sender</th>
              <th>Subject</th>
              <th>Message Preview</th>
              <th>Date Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Loading inquiries...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No messages found.
                </td>
              </tr>
            ) : (
              filtered.map((m) => (
                <tr key={m._id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <a href={`mailto:${m.email}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
                        {m.email}
                      </a>
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>
                    {m.subject || <span style={{ color: 'var(--text-muted)' }}>General Inquiry</span>}
                  </td>
                  <td style={{ maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {m.message}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td>
                    <div className="action-btns-group">
                      <button
                        onClick={() => setSelectedMessage(m)}
                        className="action-btn-sm action-btn-confirm"
                      >
                        Read
                      </button>
                      <button
                        onClick={() => handleDelete(m._id, m.name)}
                        className="action-btn-sm action-btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Inquiry Details</h3>
              <button className="modal-close-btn" onClick={() => setSelectedMessage(null)}>&times;</button>
            </div>

            <div className="modal-body">
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">From:</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span className="form-label">Subject:</span>
                <div style={{ fontSize: '1rem', color: 'var(--accent-gold)' }}>
                  {selectedMessage.subject || 'General Inquiry'}
                </div>
              </div>

              <div>
                <span className="form-label">Message:</span>
                <div
                  style={{
                    background: 'var(--bg-tertiary)',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-glass)',
                    lineHeight: '1.7',
                    whiteSpace: 'pre-wrap',
                    color: 'var(--text-primary)',
                    marginTop: '0.35rem',
                  }}
                >
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Paradise Cafe Inquiry')}`}
                className="btn btn-gold-solid"
                style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
              >
                Reply via Email
              </a>
              <button
                className="filter-btn"
                onClick={() => setSelectedMessage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
