const { getDb } = require('./db');
const { parseEvent, authenticate, response } = require('./utils');

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return response(200, {});
    }

    const auth = authenticate(event);
    if (auth.error) return response(auth.statusCode, { message: auth.error });

    const db = getDb();
    const path = event.path.replace('/.netlify/functions/orders', '');

    // POST /api/orders
    if (event.httpMethod === 'POST' && !path) {
      const parsed = parseEvent(event);
      if (parsed.error) return response(parsed.statusCode, { message: parsed.error });

      const { address, payment_method } = parsed.body;
      if (!address || !payment_method) {
        return response(400, { message: 'Address and payment method are required' });
      }

      const cartItems = db.prepare(`
        SELECT ci.product_id, ci.quantity, p.price
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
      `).all(auth.user.id);

      if (cartItems.length === 0) {
        return response(400, { message: 'Cart is empty' });
      }

      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const orderResult = db.prepare('INSERT INTO orders (user_id, total, address, payment_method) VALUES (?, ?, ?, ?)').run(auth.user.id, total, address, payment_method);
      const orderId = orderResult.lastInsertRowid;

      const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
      for (const item of cartItems) {
        insertItem.run(orderId, item.product_id, item.quantity, item.price);
      }

      db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(auth.user.id);
      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
      return response(201, { message: 'Order created successfully', order });
    }

    // GET /api/orders
    if (event.httpMethod === 'GET' && !path) {
      const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(auth.user.id);
      
      for (const order of orders) {
        order.items = db.prepare(`
          SELECT oi.*, p.title, p.image
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = ?
        `).all(order.id);
      }

      return response(200, orders);
    }

    return response(404, { message: 'Not found' });
  } catch (error) {
    console.error('Error:', error);
    return response(500, { message: 'Something went wrong!' });
  }
};
