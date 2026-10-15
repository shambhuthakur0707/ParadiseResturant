const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const menuItems = [
  // Coffee & Beverages (4 items)
  {
    name: 'Paradise Signature Latte',
    description: 'Our house specialty with vanilla, caramel, and a hint of cinnamon',
    price: 6.50,
    category: 'Coffee & Beverages',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    name: 'Turkish Delight Mocha',
    description: 'Rich espresso blended with dark chocolate and rosewater',
    price: 7.00,
    category: 'Coffee & Beverages',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Golden Hour Chai',
    description: 'Turmeric-infused chai with oat milk and honey',
    price: 5.50,
    category: 'Coffee & Beverages',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Cold Brew Tonic',
    description: 'Nitrogen-infused cold brew with tonic water and citrus',
    price: 6.00,
    category: 'Coffee & Beverages',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },

  // Pastries & Desserts (4 items)
  {
    name: 'Burnt Basque Cheesecake',
    description: 'Caramelized top, creamy center, served with berry compote',
    price: 9.00,
    category: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    name: 'Pistachio Rose Croissant',
    description: 'Flaky layers filled with pistachio cream and rosewater glaze',
    price: 5.50,
    category: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Dark Chocolate Lava Cake',
    description: 'Warm molten center with vanilla bean ice cream',
    price: 10.00,
    category: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Honey Baklava Stack',
    description: 'Crispy phyllo layers with walnuts and orange blossom honey',
    price: 7.50,
    category: 'Pastries & Desserts',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },

  // Main Courses (4 items)
  {
    name: 'Truffle Mushroom Risotto',
    description: 'Arborio rice with wild mushrooms, truffle oil, parmesan',
    price: 18.00,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    name: 'Grilled Lamb Chops',
    description: 'Herb-crusted chops with roasted garlic mash and red wine jus',
    price: 24.00,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon with saffron cream sauce and asparagus',
    price: 22.00,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Mediterranean Mezze Platter',
    description: 'Hummus, falafel, tabbouleh, pita, and grilled halloumi',
    price: 16.00,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/paradise_cafe';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB.');

    console.log('[Seed] Clearing existing menu items...');
    const deleteResult = await MenuItem.deleteMany({});
    console.log(`[Seed] Removed ${deleteResult.deletedCount} existing menu items.`);

    console.log('[Seed] Inserting new menu items...');
    const insertedItems = await MenuItem.insertMany(menuItems);
    console.log(`[Seed] Successfully inserted ${insertedItems.length} menu items!`);

    const featuredCount = insertedItems.filter(item => item.featured).length;
    console.log(`[Seed] Featured items marked: ${featuredCount}`);

    // Seed default admin account
    const existingAdmin = await User.findOne({ email: 'admin@paradisecafe.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Paradise Admin',
        email: 'admin@paradisecafe.com',
        password: 'adminpassword123',
        role: 'admin',
      });
      console.log('[Seed] Default admin created: admin@paradisecafe.com / adminpassword123');
    } else {
      console.log('[Seed] Admin account already exists.');
    }

    console.log('[Seed] Seeding completed successfully.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Error during seeding: ${error.message}`);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedDB();
