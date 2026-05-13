const db = require("../database");

exports.getCart = async (req, res) => {
  const items = await db.all(
    `SELECT ci.id, ci.product_id, ci.quantity, p.title, p.price, p.image, p.category
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?
     ORDER BY ci.created_at DESC`,
    [req.user.id],
  );
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  res.json({ items, total });
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  const product = await db.get("SELECT id FROM products WHERE id = ?", [
    product_id,
  ]);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  const qty = Number(quantity) || 1;
  if (!Number.isInteger(qty)) {
    return res.status(400).json({ message: "Quantity must be an integer" });
  }

  const existing = await db.get(
    "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
    [req.user.id, product_id],
  );
  if (existing) {
    const newQuantity = existing.quantity + qty;
    if (newQuantity <= 0) {
      await db.run("DELETE FROM cart_items WHERE id = ?", [existing.id]);
    } else {
      await db.run("UPDATE cart_items SET quantity = ? WHERE id = ?", [
        newQuantity,
        existing.id,
      ]);
    }
  } else {
    if (qty <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be at least 1" });
    }
    await db.run(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [req.user.id, product_id, qty],
    );
  }
  const items = await db.all(
    `SELECT ci.id, ci.product_id, ci.quantity, p.title, p.price, p.image
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?`,
    [req.user.id],
  );
  res.json({ message: "Item added to cart", items });
};

exports.removeFromCart = async (req, res) => {
  const item = await db.get(
    "SELECT * FROM cart_items WHERE id = ? AND user_id = ?",
    [req.params.itemId, req.user.id],
  );
  if (!item)
    return res.status(404).json({ message: "Cart item not found" });
  await db.run("DELETE FROM cart_items WHERE id = ?", [req.params.itemId]);
  res.json({ message: "Item removed from cart" });
};
