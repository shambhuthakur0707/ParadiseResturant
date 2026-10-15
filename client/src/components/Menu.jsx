import React, { useState, useEffect } from 'react';
import { fetchMenuItems } from '../api';
import MenuCard from './MenuCard';
import ScrollReveal from './ScrollReveal';
import './Menu.css';

const FALLBACK_MENU = [
  {
    _id: 'f1',
    name: 'Paradise Obsidian Espresso',
    category: 'Coffee & Beverages',
    price: 7.50,
    description: 'Double ristretto pull of Ethiopian Yirgacheffe with notes of bergamot, dark cacao, and velvet finish.',
    featured: true,
    gradient: 'linear-gradient(135deg, #2b1810 0%, #4a2c1b 50%, #150d09 100%)',
  },
  {
    _id: 'f2',
    name: 'Smoked Vanilla Bourbon Latte',
    category: 'Coffee & Beverages',
    price: 9.00,
    description: 'Aged Madagascar vanilla bean, micro-foamed oat milk, smoked bourbon oak aroma, and raw sugarcane.',
    featured: false,
    gradient: 'linear-gradient(135deg, #3d2314 0%, #5e371e 50%, #20130a 100%)',
  },
  {
    _id: 'f3',
    name: '24K Gold Leaf Saffron Croissant',
    category: 'Pastries & Desserts',
    price: 16.00,
    description: 'Layered French laminations infused with Persian saffron, pistachio praline cream, crowned with edible 24k gold.',
    featured: true,
    gradient: 'linear-gradient(135deg, #382405 0%, #68420c 50%, #1c1203 100%)',
  },
  {
    _id: 'f4',
    name: 'Truffle & Forest Mushroom Brioche',
    category: 'Main Courses',
    price: 22.00,
    description: 'Pan-seared morels and chanterelles, black truffle emulsion, poached heritage egg on toasted brioche.',
    featured: false,
    gradient: 'linear-gradient(135deg, #1f1b14 0%, #3e3325 50%, #14110d 100%)',
  },
  {
    _id: 'f5',
    name: 'Wagyu Tenderloin Carpaccio Toast',
    category: 'Main Courses',
    price: 28.00,
    description: 'A5 Wagyu shavings, aged parmesan crisp, cured egg yolk, micro greens, and cold-pressed extra virgin olive oil.',
    featured: true,
    gradient: 'linear-gradient(135deg, #341212 0%, #522020 50%, #170707 100%)',
  },
  {
    _id: 'f6',
    name: 'Smoked Valrhona Chocolate Dome',
    category: 'Pastries & Desserts',
    price: 18.50,
    description: '70% dark chocolate mousse, salted caramel gelee, espresso sponge encased under a smoldering cherrywood cloche.',
    featured: true,
    gradient: 'linear-gradient(135deg, #23120b 0%, #442215 50%, #110905 100%)',
  },
  {
    _id: 'f7',
    name: 'Cold Drip Reserve Geisha',
    category: 'Specials',
    price: 19.00,
    description: '18-hour slow drip extraction of Panama Hacienda La Esmeralda. Floral jasmine notes served over crystal sphere.',
    featured: true,
    gradient: 'linear-gradient(135deg, #291a13 0%, #543323 50%, #140d0a 100%)',
  },
  {
    _id: 'f8',
    name: 'Yuzu & Blackberry Mille-Feuille',
    category: 'Pastries & Desserts',
    price: 15.00,
    description: 'Caramelized inverted puff pastry, tart yuzu curd, wild blackberry compote, Tahitian vanilla diplomat cream.',
    featured: false,
    gradient: 'linear-gradient(135deg, #301826 0%, #562743 50%, #180c13 100%)',
  },
];

const CATEGORIES = [
  'All',
  'Coffee & Beverages',
  'Pastries & Desserts',
  'Main Courses',
  'Specials',
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState(FALLBACK_MENU);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetchMenuItems();
        // Backend returns { success, count, data: [...] }
        if (res.data && res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setMenuItems(res.data.data);
        }
      } catch (err) {
        // Graceful fallback to rich static menu
        console.info('Backend menu endpoint unavailable, serving signature collection:', err.message);
        setMenuItems(FALLBACK_MENU);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, []);

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="section menu-section">
      <div className="container">
        <div className="menu-header">
          <ScrollReveal direction="up" delay={100}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line" />
              <span className="section-tag-text">Culinary Offerings</span>
              <span className="section-tag-line" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h2 className="section-title">
              Our Signature <span className="gold-gradient-text">Collection</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <p className="section-subtitle">
              Carefully curated culinary compositions crafted with ethically harvested
              ingredients, roasted beans from award-winning estates, and artisanal mastery.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={350}>
          <div className="menu-tabs" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`menu-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="menu-loading">
            <div className="loading-spinner" />
            <p>Loading our signature collection...</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item, idx) => (
              <ScrollReveal
                key={item._id || idx}
                direction="up"
                delay={(idx % 4) * 100}
              >
                <MenuCard item={item} />
              </ScrollReveal>
            ))}
            {filteredItems.length === 0 && (
              <p className="menu-empty-text">No items in this category yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
