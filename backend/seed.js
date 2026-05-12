const db = require('./database');
const bcrypt = require('bcryptjs');

async function seed() {
  console.log('Seeding database...');

  const existingProducts = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (existingProducts.count > 0) {
    console.log('Products already seeded, skipping product seed.');
  } else {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      const insert = db.prepare(
        'INSERT INTO products (id, title, price, description, category, image, rating_rate, rating_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      );
      for (const p of products) {
        insert.run(
          p.id,
          p.title,
          p.price,
          p.description,
          p.category,
          p.image,
          p.rating?.rate || 0,
          p.rating?.count || 0
        );
      }
      console.log(`Seeded ${products.length} products from FakeStore API.`);
    } catch (err) {
      console.error('Failed to fetch from FakeStore API:', err.message);
      console.log('Inserting fallback products...');
      const fallback = [
        { title: 'Wireless Headphones', price: 250, description: 'High quality wireless headphones with noise cancellation.', category: 'electronics', image: 'https://via.placeholder.com/300?text=Headphones', rating_rate: 4.5, rating_count: 120 },
        { title: 'Gold Necklace', price: 1500, description: 'Elegant gold necklace with precious gems.', category: 'jewelery', image: 'https://via.placeholder.com/300?text=Necklace', rating_rate: 4.8, rating_count: 45 },
        { title: 'Smart Watch', price: 899, description: 'Latest smartwatch with health monitoring features.', category: 'electronics', image: 'https://via.placeholder.com/300?text=Watch', rating_rate: 4.3, rating_count: 230 },
        { title: 'Men Cotton Shirt', price: 120, description: 'Premium cotton shirt for men.', category: "men's clothing", image: 'https://via.placeholder.com/300?text=Shirt', rating_rate: 4.1, rating_count: 89 },
        { title: 'Women Summer Dress', price: 250, description: 'Beautiful summer dress for women.', category: "women's clothing", image: 'https://via.placeholder.com/300?text=Dress', rating_rate: 4.6, rating_count: 156 },
        { title: 'Diamond Ring', price: 3500, description: 'Stunning diamond ring in 18K gold.', category: 'jewelery', image: 'https://via.placeholder.com/300?text=Ring', rating_rate: 4.9, rating_count: 34 },
        { title: 'Laptop Stand', price: 180, description: 'Ergonomic aluminum laptop stand.', category: 'electronics', image: 'https://via.placeholder.com/300?text=Stand', rating_rate: 4.2, rating_count: 78 },
        { title: 'Leather Jacket Men', price: 450, description: 'Genuine leather jacket for men.', category: "men's clothing", image: 'https://via.placeholder.com/300?text=Jacket', rating_rate: 4.4, rating_count: 67 },
        { title: 'Women Handbag', price: 320, description: 'Designer handbag for women.', category: "women's clothing", image: 'https://via.placeholder.com/300?text=Handbag', rating_rate: 4.7, rating_count: 112 },
        { title: 'Bluetooth Speaker', price: 350, description: 'Portable bluetooth speaker with deep bass.', category: 'electronics', image: 'https://via.placeholder.com/300?text=Speaker', rating_rate: 4.0, rating_count: 201 },
      ];
      for (const p of fallback) {
        insert.run(null, p.title, p.price, p.description, p.category, p.image, p.rating_rate, p.rating_count);
      }
      console.log(`Seeded ${fallback.length} fallback products.`);
    }
  }

  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@example.com');
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run('Admin', 'admin@example.com', hashedPassword, 'admin');
    console.log('Admin user created: admin@example.com / admin123');
  } else {
    console.log('Admin user already exists.');
  }

  console.log('Seeding complete!');
}

seed();
