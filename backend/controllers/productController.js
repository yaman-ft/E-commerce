const db = require("../database");

exports.getAllProducts = async (req, res) => {
  const { category } = req.query;
  let products;
  if (category) {
    products = await db.all(
      "SELECT * FROM products WHERE category = ? ORDER BY created_at DESC",
      [category],
    );
  } else {
    products = await db.all(
      "SELECT * FROM products ORDER BY created_at DESC",
    );
  }
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await db.get("SELECT * FROM products WHERE id = ?", [
    req.params.id,
  ]);
  if (!product)
    return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const {
    title,
    price,
    description,
    category,
    image,
    rating_rate,
    rating_count,
  } = req.body;
  if (!title || price === undefined) {
    return res
      .status(400)
      .json({ message: "Title and price are required" });
  }
  const result = await db.run(
    "INSERT INTO products (title, price, description, category, image, rating_rate, rating_count) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      price,
      description || "",
      category || "",
      image || "",
      rating_rate || 0,
      rating_count || 0,
    ],
  );
  const product = await db.get("SELECT * FROM products WHERE id = ?", [
    result.lastID,
  ]);
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const {
    title,
    price,
    description,
    category,
    image,
    rating_rate,
    rating_count,
  } = req.body;
  const existing = await db.get("SELECT * FROM products WHERE id = ?", [
    req.params.id,
  ]);
  if (!existing)
    return res.status(404).json({ message: "Product not found" });

  await db.run(
    "UPDATE products SET title=?, price=?, description=?, category=?, image=?, rating_rate=?, rating_count=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
    [
      title ?? existing.title,
      price ?? existing.price,
      description ?? existing.description,
      category ?? existing.category,
      image ?? existing.image,
      rating_rate ?? existing.rating_rate,
      rating_count ?? existing.rating_count,
      req.params.id,
    ],
  );
  const updated = await db.get("SELECT * FROM products WHERE id = ?", [
    req.params.id,
  ]);
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  const existing = await db.get("SELECT * FROM products WHERE id = ?", [
    req.params.id,
  ]);
  if (!existing)
    return res.status(404).json({ message: "Product not found" });
  await db.run("DELETE FROM products WHERE id = ?", [req.params.id]);
  res.json({ message: "Product deleted successfully" });
};
