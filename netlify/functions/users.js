const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDb } = require("./db");
const { parseEvent, authenticate, response } = require("./utils");

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return response(200, {});
    }

    const db = getDb();
    const path = event.path.replace("/.netlify/functions/users", "");

    // POST /api/users/register
    if (event.httpMethod === "POST" && path.includes("register")) {
      const parsed = parseEvent(event);
      if (parsed.error)
        return response(parsed.statusCode, { message: parsed.error });

      const { name, email, password } = parsed.body;
      if (!name || !email || !password) {
        return response(400, {
          message: "Name, email, and password are required",
        });
      }
      if (password.length < 6) {
        return response(400, {
          message: "Password must be at least 6 characters",
        });
      }

      const existing = db
        .prepare("SELECT id FROM users WHERE email = ?")
        .get(email);
      if (existing) {
        return response(400, { message: "Email already registered" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = db
        .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
        .run(name, email, hashedPassword);
      const user = db
        .prepare("SELECT id, name, email, role FROM users WHERE id = ?")
        .get(result.lastInsertRowid);
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      return response(201, { user, token });
    }

    // POST /api/users/login
    if (event.httpMethod === "POST" && path.includes("login")) {
      const parsed = parseEvent(event);
      if (parsed.error)
        return response(parsed.statusCode, { message: parsed.error });

      const { email, password } = parsed.body;
      if (!email || !password) {
        return response(400, { message: "Email and password are required" });
      }

      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return response(401, { message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      return response(200, {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    }

    // GET /api/users/profile
    if (event.httpMethod === "GET" && path.includes("profile")) {
      const auth = authenticate(event);
      if (auth.error) return response(auth.statusCode, { message: auth.error });

      const db_user = db
        .prepare(
          "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
        )
        .get(auth.user.id);
      if (!db_user) return response(404, { message: "User not found" });
      return response(200, db_user);
    }

    return response(404, { message: "Not found" });
  } catch (error) {
    console.error("Error:", error);
    return response(500, { message: "Something went wrong!" });
  }
};
