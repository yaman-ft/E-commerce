<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg"
      style="background: #0a0a0a; border-bottom: 3px solid #e6ca69"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand p-0">
          <img src="@/assets/logo2.png" alt="Logo" height="60" />
        </router-link>
        <button
          class="navbar-toggler border-0 d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
        >
          <i class="fas fa-bars" style="color: #e6ca69"></i>
        </button>

        <div
          class="d-none d-lg-flex w-100 justify-content-between align-items-center"
          id="mainNav"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link nav-link-custom"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ path: '/category', query: { cat: 'electronics' } }"
                class="nav-link nav-link-custom"
                >Electronics</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ path: '/category', query: { cat: 'jewelery' } }"
                class="nav-link nav-link-custom"
                >Jewelry</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ path: '/category', query: { cat: 'men\'s clothing' } }"
                class="nav-link nav-link-custom"
                >Men</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ path: '/category', query: { cat: 'women\'s clothing' } }"
                class="nav-link nav-link-custom"
                >Women</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <li class="nav-item">
              <router-link
                to="/cart"
                class="nav-link nav-link-custom position-relative"
              >
                <i class="fas fa-shopping-cart"></i>
                <span v-if="cartCount > 0" class="cart-badge">{{
                  cartCount
                }}</span>
              </router-link>
            </li>
            <template v-if="isAuthenticated">
              <li class="nav-item">
                <router-link to="/orders" class="nav-link nav-link-custom"
                  >Orders</router-link
                >
              </li>
              <li v-if="isAdmin" class="nav-item">
                <router-link to="/admin" class="nav-link nav-link-custom"
                  >Admin</router-link
                >
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link nav-link-custom dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <i class="fas fa-user me-1"></i>{{ user?.name }}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <router-link to="/orders" class="dropdown-item"
                      >My Orders</router-link
                    >
                  </li>
                  <li v-if="isAdmin">
                    <router-link to="/admin" class="dropdown-item"
                      >Admin Panel</router-link
                    >
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="logout"
                      >Logout</a
                    >
                  </li>
                </ul>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link to="/login" class="nav-link nav-link-custom"
                  >Login</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/register" class="btn nav-btn ms-2"
                  >Sign Up</router-link
                >
              </li>
            </template>
          </ul>
        </div>

        <div
          class="offcanvas offcanvas-end text-bg-dark d-lg-none"
          tabindex="-1"
          id="mobileMenu"
          aria-labelledby="mobileMenuLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="mobileMenuLabel">Menu</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link
                  to="/"
                  class="nav-link nav-link-custom"
                  @click="closeOffcanvas"
                  >Home</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/category', query: { cat: 'electronics' } }"
                  class="nav-link nav-link-custom"
                  @click="closeOffcanvas"
                  >Electronics</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/category', query: { cat: 'jewelery' } }"
                  class="nav-link nav-link-custom"
                  @click="closeOffcanvas"
                  >Jewelry</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/category', query: { cat: 'men\'s clothing' } }"
                  class="nav-link nav-link-custom"
                  @click="closeOffcanvas"
                  >Men</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/category', query: { cat: 'women\'s clothing' } }"
                  class="nav-link nav-link-custom"
                  @click="closeOffcanvas"
                  >Women</router-link
                >
              </li>
              <li class="nav-item mt-3">
                <router-link
                  to="/cart"
                  class="nav-link nav-link-custom position-relative"
                  @click="closeOffcanvas"
                >
                  <i class="fas fa-shopping-cart"></i>
                  <span v-if="cartCount > 0" class="cart-badge">{{
                    cartCount
                  }}</span>
                  Cart
                </router-link>
              </li>
              <template v-if="isAuthenticated">
                <li class="nav-item">
                  <router-link
                    to="/orders"
                    class="nav-link nav-link-custom"
                    @click="closeOffcanvas"
                    >Orders</router-link
                  >
                </li>
                <li v-if="isAdmin" class="nav-item">
                  <router-link
                    to="/admin"
                    class="nav-link nav-link-custom"
                    @click="closeOffcanvas"
                    >Admin</router-link
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link nav-link-custom"
                    href="#"
                    @click.prevent="logoutAndClose"
                    >Logout</a
                  >
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <router-link
                    to="/login"
                    class="nav-link nav-link-custom"
                    @click="closeOffcanvas"
                    >Login</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link
                    to="/register"
                    class="btn nav-btn ms-2"
                    @click="closeOffcanvas"
                    >Sign Up</router-link
                  >
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="toast" :class="'toast-notification toast-' + toast.type">
      {{ toast.message }}
    </div>

    <router-view />
  </div>
</template>

<script>
import { Offcanvas } from "bootstrap";

export default {
  name: "App",
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    cartCount() {
      return this.$store.state.cartCount;
    },
    toast() {
      return this.$store.state.toast;
    },
  },
  mounted() {
    this.$store.dispatch("fetchCartCount");
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$store.dispatch("showToast", { message: "Logged out successfully" });
      this.$router.push("/");
    },
    closeOffcanvas() {
      const offcanvasEl = document.getElementById("mobileMenu");
      if (!offcanvasEl) return;
      const offcanvasInstance =
        Offcanvas.getInstance(offcanvasEl) || new Offcanvas(offcanvasEl);
      offcanvasInstance.hide();
    },
    logoutAndClose() {
      this.logout();
      this.closeOffcanvas();
    },
  },
};
</script>

<style>
#app {
  font-family: "Lora", Georgia, serif;
}
.nav-link-custom {
  color: #ccc !important;
  font-size: 0.95rem;
  padding: 8px 14px !important;
  transition: color 0.2s;
  letter-spacing: 0.03em;
}
.nav-link-custom:hover,
.nav-link-custom.router-link-exact-active {
  color: #e6ca69 !important;
}
.nav-btn {
  background: #e6ca69;
  color: black !important;
  border-radius: 8px;
  padding: 8px 20px !important;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
}
.nav-btn:hover {
  background: #d4b850;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 2px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.toast-notification {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  padding: 14px 24px;
  border-radius: 10px;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
  max-width: 350px;
}
.toast-success {
  background: #27ae60;
  color: white;
}
.toast-error {
  background: #e74c3c;
  color: white;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.dropdown-menu-dark {
  background: #1a1a1a;
  border: 1px solid #333;
}
.dropdown-item {
  color: #ccc;
}
.dropdown-item:hover {
  background: #333;
  color: #e6ca69;
}
</style>
