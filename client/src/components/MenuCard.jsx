import React from 'react';

export default function MenuCard({ item }) {
  const {
    name = 'Artisan Delicacy',
    description = 'Handcrafted with fine ingredients.',
    price = '$14',
    category = 'Special',
    isFeatured = false,
    image,
    gradient = 'linear-gradient(135deg, #1f140e 0%, #382417 60%, #150f0b 100%)',
  } = item;

  return (
    <article className="menu-card">
      <div className="menu-card-visual">
        <div
          className="menu-card-img-placeholder"
          style={{
            backgroundImage: image ? `url(${image})` : gradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="menu-card-overlay" />
        {isFeatured && <span className="menu-badge">Featured</span>}
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{name}</h3>
          <span className="menu-card-price">{price}</span>
        </div>

        <p className="menu-card-desc">{description}</p>

        <div className="menu-card-footer">
          <span className="menu-card-category">{category}</span>
          <span className="menu-card-action">Chef Selection</span>
        </div>
      </div>
    </article>
  );
}
