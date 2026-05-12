<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2 class="auth-title">Welcome Back</h2>
      <p class="auth-subtitle">Sign in to your account</p>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control auth-input"
            placeholder="your@email.com"
            required
          />
        </div>
        <div class="mb-4">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control auth-input"
            placeholder="••••••••"
            required
          />
        </div>
        <p v-if="error" class="text-danger text-center">{{ error }}</p>
        <button type="submit" class="btn auth-btn w-100" :disabled="loading">
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
          ></span>
          Sign In
        </button>
      </form>
      <p class="mt-3 text-center text-white-50">
        Don't have an account?
        <router-link to="/register" class="auth-link">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { usersAPI } from "@/utils/api";

export default {
  name: "LoginView",
  data() {
    return { email: "", password: "", error: "", loading: false };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = "";
      try {
        const data = await usersAPI.login({
          email: this.email,
          password: this.password,
        });
        this.$store.commit("SET_USER", { user: data.user, token: data.token });
        this.$store.dispatch("showToast", {
          message: "Welcome back, " + data.user.name + "!",
        });
        this.$store.dispatch("fetchCartCount");
        this.$router.push("/");
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  padding: 20px;
}
.auth-card {
  background: #1a1a1a;
  border: 1px solid #e6ca69;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
}
.auth-title {
  color: #e6ca69;
  font-family: "Marcellus", serif;
  text-align: center;
  margin-bottom: 4px;
}
.auth-subtitle {
  color: #888;
  text-align: center;
  margin-bottom: 30px;
}
.auth-input {
  background: #0a0a0a;
  border: 1px solid #333;
  color: white;
  border-radius: 8px;
  padding: 12px 16px;
}
.auth-input:focus {
  border-color: #e6ca69;
  box-shadow: 0 0 0 2px rgba(230, 202, 105, 0.2);
  background: #0a0a0a;
  color: white;
}
.auth-btn {
  background: #e6ca69;
  color: black;
  font-weight: 600;
  padding: 12px;
  border-radius: 8px;
  border: none;
}
.auth-btn:hover {
  background: #d4b850;
  color: black;
}
.auth-link {
  color: #e6ca69;
  text-decoration: none;
}
.auth-link:hover {
  text-decoration: underline;
}
</style>
