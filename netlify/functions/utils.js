const jwt = require("jsonwebtoken");

function parseEvent(event) {
  let body = {};
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return { error: "Invalid JSON body", statusCode: 400 };
    }
  }
  return { body };
}

function authenticate(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Access denied. No token provided.", statusCode: 401 };
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded };
  } catch (err) {
    return { error: "Invalid or expired token.", statusCode: 403 };
  }
}

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify(body),
  };
}

module.exports = { parseEvent, authenticate, response };
