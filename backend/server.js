const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

const app = express();
// const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

  // const server = app.listen(PORT, () => {
  //   console.log(`Server running on http://localhost:${PORT}`);
  // });

// server.on("error", (error) => {
//   if (error.code === "EADDRINUSE") {
//     console.error(
//       `Port ${PORT} is already in use. Either stop the process using this port or set a different PORT in backend/.env.`,
//     );
//   } else {
//     console.error("Server error:", error);
//   }
//   process.exit(1);
// });
module.exports = app;