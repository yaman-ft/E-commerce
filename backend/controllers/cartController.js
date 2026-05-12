const db = require('../database');

exports.getCart = (req, res) => {
  const items = db.prepare(`
    SELECT ci.id, ci.product_id, ci.quantity, p.title, p.price, p.image, p.category
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
    ORDER BY ci.created_at DESC
  `).all(req.user.id);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items, total });
};

exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }
  const product = db.prepare('SELECT id FROM products WHERE id = ?').get(product_id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const existing = db.prepare('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?').get(req.user.id, product_id);
  if (existing) {
    db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity || 1, existing.id);
  } else {
    db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').run(req.user.id, product_id, quantity || 1);
  }
  const items = db.prepare(`
    SELECT ci.id, ci.product_id, ci.quantity, p.title, p.price, p.image
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `).all(req.user.id);
  res.json({ message: 'Item added to cart', items });
};

exports.removeFromCart = (req, res) => {
  const item = db.prepare('SELECT * FROM cart_items WHERE id = ? AND user_id = ?').get(req.params.itemId, req.user.id);
  if (!item) return res.status(404).json({ message: 'Cart item not found' });
  db.prepare('DELETE FROM cart_items WHERE id = ?').run(req.params.itemId);
  res.json({ message: 'Item removed from cart' });
};
