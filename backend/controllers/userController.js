const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  const existing = await db.get("SELECT id FROM users WHERE email = ?", [
    email,
  ]);
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = await db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
  );
  const user = await db.get(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [result.lastID],
  );
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.status(201).json({ user, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

exports.getProfile = async (req, res) => {
  const user = await db.get(
    "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
    [req.user.id],
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};
