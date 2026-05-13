const bcrypt = require("bcryptjs");
const db = require("./database");

async function run() {
  console.log("Seeding database...");

  const existing = await db.get("SELECT COUNT(*) as c FROM products");
  if (existing.c > 0) {
    console.log("Products already seeded, skipping.");
    return;
  }

  let products;
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
    console.log(`Fetched ${products.length} products from FakeStore API.`);
  } catch (err) {
    console.error("Failed to fetch from FakeStore API:", err.message);
    products = [
      { title: "Wireless Headphones", price: 250, description: "High quality wireless headphones with noise cancellation.", category: "electronics", image: "https://via.placeholder.com/300?text=Headphones", rating: { rate: 4.5, count: 120 } },
      { title: "Gold Necklace", price: 1500, description: "Elegant gold necklace with precious gems.", category: "jewelery", image: "https://via.placeholder.com/300?text=Necklace", rating: { rate: 4.8, count: 45 } },
      { title: "Smart Watch", price: 899, description: "Latest smartwatch with health monitoring features.", category: "electronics", image: "https://via.placeholder.com/300?text=Watch", rating: { rate: 4.3, count: 230 } },
      { title: "Men Cotton Shirt", price: 120, description: "Premium cotton shirt for men.", category: "men's clothing", image: "https://via.placeholder.com/300?text=Shirt", rating: { rate: 4.1, count: 89 } },
      { title: "Women Summer Dress", price: 250, description: "Beautiful summer dress for women.", category: "women's clothing", image: "https://via.placeholder.com/300?text=Dress", rating: { rate: 4.6, count: 156 } },
      { title: "Diamond Ring", price: 3500, description: "Stunning diamond ring in 18K gold.", category: "jewelery", image: "https://via.placeholder.com/300?text=Ring", rating: { rate: 4.9, count: 34 } },
      { title: "Laptop Stand", price: 180, description: "Ergonomic aluminum laptop stand.", category: "electronics", image: "https://via.placeholder.com/300?text=Stand", rating: { rate: 4.2, count: 78 } },
      { title: "Leather Jacket Men", price: 450, description: "Genuine leather jacket.", category: "men's clothing", image: "https://via.placeholder.com/300?text=Jacket", rating: { rate: 4.4, count: 67 } },
      { title: "Women Handbag", price: 320, description: "Designer handbag.", category: "women's clothing", image: "https://via.placeholder.com/300?text=Handbag", rating: { rate: 4.7, count: 112 } },
      { title: "Bluetooth Speaker", price: 350, description: "Portable bluetooth speaker.", category: "electronics", image: "https://via.placeholder.com/300?text=Speaker", rating: { rate: 4.0, count: 201 } },
    ];
  }

  for (const p of products) {
    await db.run(
      "INSERT INTO products (title, price, description, category, image, rating_rate, rating_count) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [p.title, p.price, p.description || "", p.category || "", p.image || "", p.rating?.rate || 0, p.rating?.count || 0],
    );
  }
  console.log(`Seeded ${products.length} products.`);

  const adminExists = await db.get("SELECT id FROM users WHERE email = ?", ["admin@example.com"]);
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync("admin123", 10);
    await db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      "Admin", "admin@example.com", hashedPassword, "admin",
    ]);
    console.log("Admin user created: admin@example.com / admin123");
  }

  console.log("Seeding complete!");
}

if (require.main === module) {
  run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
}

module.exports = { run };
