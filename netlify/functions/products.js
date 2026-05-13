const { getDb } = require("./db");
const { parseEvent, authenticate, response } = require("./utils");

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return response(200, {});
    }

    const db = getDb();
    const path = event.path.replace("/.netlify/functions/products", "");

    // GET /api/products or /api/products?category=...
    if (event.httpMethod === "GET" && !path) {
      const { category } = event.queryStringParameters || {};
      let products;
      if (category) {
        products = db
          .prepare(
            "SELECT * FROM products WHERE category = ? ORDER BY created_at DESC",
          )
          .all(category);
      } else {
        products = db
          .prepare("SELECT * FROM products ORDER BY created_at DESC")
          .all();
      }
      return response(200, products);
    }

    // GET /api/products/:id
    if (event.httpMethod === "GET" && path) {
      const id = path.split("/").pop();
      const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
      if (!product) return response(404, { message: "Product not found" });
      return response(200, product);
    }

    // POST /api/products
    if (event.httpMethod === "POST" && !path) {
      const auth = authenticate(event);
      if (auth.error) return response(auth.statusCode, { message: auth.error });

      const parsed = parseEvent(event);
      if (parsed.error)
        return response(parsed.statusCode, { message: parsed.error });

      const {
        title,
        price,
        description,
        category,
        image,
        rating_rate,
        rating_count,
      } = parsed.body;
      if (!title || price === undefined) {
        return response(400, { message: "Title and price are required" });
      }

      const result = db
        .prepare(
          "INSERT INTO products (title, price, description, category, image, rating_rate, rating_count) VALUES (?, ?, ?, ?, ?, ?, ?)",
        )
        .run(
          title,
          price,
          description || "",
          category || "",
          image || "",
          rating_rate || 0,
          rating_count || 0,
        );

      const product = db
        .prepare("SELECT * FROM products WHERE id = ?")
        .get(result.lastInsertRowid);
      return response(201, product);
    }

    // PUT /api/products/:id
    if (event.httpMethod === "PUT" && path) {
      const auth = authenticate(event);
      if (auth.error) return response(auth.statusCode, { message: auth.error });

      const parsed = parseEvent(event);
      if (parsed.error)
        return response(parsed.statusCode, { message: parsed.error });

      const id = path.split("/").pop();
      const {
        title,
        price,
        description,
        category,
        image,
        rating_rate,
        rating_count,
      } = parsed.body;
      const existing = db
        .prepare("SELECT * FROM products WHERE id = ?")
        .get(id);
      if (!existing) return response(404, { message: "Product not found" });

      db.prepare(
        `UPDATE products SET title=?, price=?, description=?, category=?, image=?, rating_rate=?, rating_count=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
      ).run(
        title ?? existing.title,
        price ?? existing.price,
        description ?? existing.description,
        category ?? existing.category,
        image ?? existing.image,
        rating_rate ?? existing.rating_rate,
        rating_count ?? existing.rating_count,
        id,
      );

      const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
      return response(200, updated);
    }

    // DELETE /api/products/:id
    if (event.httpMethod === "DELETE" && path) {
      const auth = authenticate(event);
      if (auth.error) return response(auth.statusCode, { message: auth.error });

      const id = path.split("/").pop();
      const existing = db
        .prepare("SELECT * FROM products WHERE id = ?")
        .get(id);
      if (!existing) return response(404, { message: "Product not found" });

      db.prepare("DELETE FROM products WHERE id = ?").run(id);
      return response(200, { message: "Product deleted successfully" });
    }

    return response(404, { message: "Not found" });
  } catch (error) {
    console.error("Error:", error);
    return response(500, { message: "Something went wrong!" });
  }
};
