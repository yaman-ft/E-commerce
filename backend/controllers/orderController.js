const db = require('../database');

exports.createOrder = (req, res) => {
  const { address, payment_method } = req.body;
  if (!address || !payment_method) {
    return res.status(400).json({ message: 'Address and payment method are required' });
  }
  const cartItems = db.prepare(`
    SELECT ci.product_id, ci.quantity, p.price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `).all(req.user.id);

  if (cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderResult = db.prepare('INSERT INTO orders (user_id, total, address, payment_method) VALUES (?, ?, ?, ?)').run(req.user.id, total, address, payment_method);
  const orderId = orderResult.lastInsertRowid;

  const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
  for (const item of cartItems) {
    insertItem.run(orderId, item.product_id, item.quantity, item.price);
  }

  db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
  res.status(201).json({ message: 'Order created successfully', order });
};

exports.getOrders = (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  for (const order of orders) {
    order.items = db.prepare(`
      SELECT oi.*, p.title, p.image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(order.id);
  }
  res.json(orders);
};
