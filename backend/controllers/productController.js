const db = require('../database');

exports.getAllProducts = (req, res) => {
  const { category } = req.query;
  let products;
  if (category) {
    products = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC').all(category);
  } else {
    products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  }
  res.json(products);
};

exports.getProduct = (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { title, price, description, category, image, rating_rate, rating_count } = req.body;
  if (!title || price === undefined) {
    return res.status(400).json({ message: 'Title and price are required' });
  }
  const result = db.prepare(
    'INSERT INTO products (title, price, description, category, image, rating_rate, rating_count) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(title, price, description || '', category || '', image || '', rating_rate || 0, rating_count || 0);
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const { title, price, description, category, image, rating_rate, rating_count } = req.body;
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Product not found' });

  db.prepare(
    `UPDATE products SET title=?, price=?, description=?, category=?, image=?, rating_rate=?, rating_count=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).run(
    title ?? existing.title,
    price ?? existing.price,
    description ?? existing.description,
    category ?? existing.category,
    image ?? existing.image,
    rating_rate ?? existing.rating_rate,
    rating_count ?? existing.rating_count,
    req.params.id
  );
  const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(updated);
};

exports.deleteProduct = (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Product not found' });
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ message: 'Product deleted successfully' });
};
