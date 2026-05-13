const db = require("../database");

exports.createOrder = async (req, res) => {
  const { address, payment_method } = req.body;
  if (!address || !payment_method) {
    return res
      .status(400)
      .json({ message: "Address and payment method are required" });
  }
  const cartItems = await db.all(
    `SELECT ci.product_id, ci.quantity, p.price
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?`,
    [req.user.id],
  );

  if (cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const orderResult = await db.run(
    "INSERT INTO orders (user_id, total, address, payment_method) VALUES (?, ?, ?, ?)",
    [req.user.id, total, address, payment_method],
  );
  const orderId = orderResult.lastID;

  for (const item of cartItems) {
    await db.run(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, item.product_id, item.quantity, item.price],
    );
  }

  await db.run("DELETE FROM cart_items WHERE user_id = ?", [req.user.id]);
  const order = await db.get("SELECT * FROM orders WHERE id = ?", [orderId]);
  res.status(201).json({ message: "Order created successfully", order });
};

exports.getOrders = async (req, res) => {
  const orders = await db.all(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id],
  );
  for (const order of orders) {
    order.items = await db.all(
      `SELECT oi.*, p.title, p.image
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id],
    );
  }
  res.json(orders);
};
