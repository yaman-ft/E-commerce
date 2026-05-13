// استخدم Vercel backend domain
const API_BASE =
  process.env.VUE_APP_API_URL || "https://e-commerce-phi-six-80.vercel.app/api";

function getToken() {
  return localStorage.getItem("token");
}

export async function api(endpoint, options = {}) {
  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const productsAPI = {
  getAll: (category) =>
    api(`/products${category ? `?category=${category}` : ""}`),
  get: (id) => api(`/products/${id}`),
  create: (data) =>
    api("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    api(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => api(`/products/${id}`, { method: "DELETE" }),
};

export const usersAPI = {
  register: (data) =>
    api("/users/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) =>
    api("/users/login", { method: "POST", body: JSON.stringify(data) }),
  profile: () => api("/users/profile"),
};

export const cartAPI = {
  get: () => api("/cart"),
  add: (product_id, quantity = 1) =>
    api("/cart", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    }),
  remove: (itemId) => api(`/cart/${itemId}`, { method: "DELETE" }),
};

export const ordersAPI = {
  create: (data) =>
    api("/orders", { method: "POST", body: JSON.stringify(data) }),
  getAll: () => api("/orders"),
};
