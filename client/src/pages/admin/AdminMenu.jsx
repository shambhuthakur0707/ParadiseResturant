import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from './AdminLayout';
import { fetchMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../../api';

const CATEGORIES = ['All', 'Coffee', 'Mains', 'Starters', 'Desserts', 'Beverages'];

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Coffee',
    image: '',
    featured: false,
  });

  const loadMenu = async () => {
    try {
      setLoading(true);
      const res = await fetchMenuItems();
      setItems(res.data?.data || []);
    } catch {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentItemId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Coffee',
      image: '',
      featured: false,
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setCurrentItemId(item._id);
    setFormData({
      name: item.name || '',
      description: item.description || '',
      price: item.price || '',
      category: item.category || 'Coffee',
      image: item.image || '',
      featured: item.featured || false,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentItemId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Name, Price, and Category are required.');
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (isEditing) {
        await updateMenuItem(currentItemId, payload);
        toast.success('Menu item updated successfully!');
      } else {
        await createMenuItem(payload);
        toast.success('Menu item added successfully!');
      }
      closeModal();
      loadMenu();
    } catch (err) {
      const msg = err.response?.data?.message || 'Operation failed. Please try again.';
      toast.error(msg);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteMenuItem(id);
      toast.success('Item deleted successfully.');
      loadMenu();
    } catch {
      toast.error('Failed to delete item.');
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <AdminLayout title="Menu Management">
      <div className="admin-toolbar">
        <div className="admin-filter-group">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <button onClick={openAddModal} className="btn btn-gold-solid" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
          + Add New Item
        </button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Dish / Drink</th>
              <th>Category</th>
              <th>Price</th>
              <th>Special</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Loading menu items...
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No items found in this category.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.description || 'No description'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>
                    ${Number(item.price).toFixed(2)}
                  </td>
                  <td>
                    {item.featured ? (
                      <span className="status-pill status-confirmed">Featured</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Standard</span>
                    )}
                  </td>
                  <td>
                    <div className="action-btns-group">
                      <button
                        onClick={() => openEditModal(item)}
                        className="action-btn-sm action-btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="menu-name">Item Name *</label>
                  <input
                    id="menu-name"
                    name="name"
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Truffle Mushroom Risotto"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="menu-price">Price ($) *</label>
                    <input
                      id="menu-price"
                      name="price"
                      type="number"
                      step="0.01"
                      className="form-input"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="18.50"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="menu-category">Category *</label>
                    <select
                      id="menu-category"
                      name="category"
                      className="form-input"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Coffee">Coffee</option>
                      <option value="Mains">Mains</option>
                      <option value="Starters">Starters</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="menu-image">Image URL</label>
                  <input
                    id="menu-image"
                    name="image"
                    type="url"
                    className="form-input"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="menu-desc">Description</label>
                  <textarea
                    id="menu-desc"
                    name="description"
                    className="form-textarea"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief culinary description, tasting notes, key ingredients..."
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="menu-featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }}
                  />
                  <label htmlFor="menu-featured" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                    Mark as Chef's Special / Featured
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="filter-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold-solid" style={{ padding: '0.6rem 1.4rem' }}>
                  {isEditing ? 'Save Changes' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
