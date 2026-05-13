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
    const path = event.path.replace('/.netlify/functions/cart', '');

    // GET /api/cart
    if (event.httpMethod === 'GET' && !path) {
      const items = db.prepare(`
        SELECT ci.id, ci.product_id, ci.quantity, p.title, p.price, p.image, p.category
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
        ORDER BY ci.created_at DESC
      `).all(auth.user.id);

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return response(200, { items, total });
    }

    // POST /api/cart
    if (event.httpMethod === 'POST' && !path) {
      const parsed = parseEvent(event);
      if (parsed.error) return response(parsed.statusCode, { message: parsed.error });

      const { product_id, quantity } = parsed.body;
      if (!product_id) {
        return response(400, { message: 'Product ID is required' });
      }

      const product = db.prepare('SELECT id FROM products WHERE id = ?').get(product_id);
      if (!product) return response(404, { message: 'Product not found' });

      const qty = Number(quantity) || 1;
      if (!Number.isInteger(qty)) {
        return response(400, { message: 'Quantity must be an integer' });
      }

      const existing = db.prepare(
        'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?'
      ).get(auth.user.id, product_id);

      if (existing) {
        const newQuantity = existing.quantity + qty;
        if (newQuantity <= 0) {
          db.prepare('DELETE FROM cart_items WHERE id = ?').run(existing.id);
        } else {
          db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(newQuantity, existing.id);
        }
      } else {
        if (qty <= 0) {
          return response(400, { message: 'Quantity must be at least 1' });
        }
        db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').run(auth.user.id, product_id, qty);
      }

      const items = db.prepare(`
        SELECT ci.id, ci.product_id, ci.quantity, p.title, p.price, p.image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
      `).all(auth.user.id);

      return response(200, { message: 'Item added to cart', items });
    }

    // DELETE /api/cart/:itemId
    if (event.httpMethod === 'DELETE' && path) {
      const itemId = path.split('/').pop();
      const item = db.prepare('SELECT * FROM cart_items WHERE id = ? AND user_id = ?').get(itemId, auth.user.id);
      if (!item) return response(404, { message: 'Cart item not found' });
      
      db.prepare('DELETE FROM cart_items WHERE id = ?').run(itemId);
      return response(200, { message: 'Item removed from cart' });
    }

    return response(404, { message: 'Not found' });
  } catch (error) {
    console.error('Error:', error);
    return response(500, { message: 'Something went wrong!' });
  }
};
