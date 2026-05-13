import { createStore } from "vuex";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    cartCount: 0,
    toast: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },
  mutations: {
    SET_USER(state, { user, token }) {
      state.user = user;
      state.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.cartCount = 0;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    SET_CART_COUNT(state, count) {
      state.cartCount = count;
    },
    SET_TOAST(state, toast) {
      state.toast = toast;
    },
  },
  actions: {
    async fetchCartCount({ commit, state }) {
      if (!state.token) return;
      try {
        // استخدم Vercel backend
        const apiUrl =
          process.env.VUE_APP_API_URL ||
          "https://e-commerce-phi-six-80.vercel.app/api";
        const res = await fetch(`${apiUrl}/cart`, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        const data = await res.json();
        if (data.items) {
          commit(
            "SET_CART_COUNT",
            data.items.reduce((sum, it) => sum + it.quantity, 0),
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
    showToast({ commit }, { message, type = "success" }) {
      commit("SET_TOAST", { message, type });
      setTimeout(() => commit("SET_TOAST", null), 3000);
    },
  },
});
