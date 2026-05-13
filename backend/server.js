require("express-async-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { createTables } = require("./schema");
const db = require("./database");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.VERCEL) {
  app.use(morgan("dev"));
}

// Create tables on first request
app.use(async (req, res, next) => {
  if (!global._initialized) {
    try {
      await createTables();
      // Auto-seed if no products exist
      const count = await db.get("SELECT COUNT(*) as c FROM products");
      if (count.c === 0) {
        console.log("Auto-seeding database...");
        const seed = require("./seed");
        await seed.run();
        console.log("Auto-seed complete");
      }
      global._initialized = true;
    } catch (e) {
      console.error("Initialization error:", e.message);
    }
  }
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  }).on("error", (error) => {
    console.error("Server error:", error.message);
    process.exit(1);
  });
}

module.exports = app;
