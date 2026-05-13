<template>
  <div class="cart-page">
    <div class="container py-5">
      <h1 class="page-title">Shopping Cart</h1>
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status"></div>
      </div>
      <div v-else-if="cart.items.length === 0" class="text-center py-5">
        <i
          class="fas fa-shopping-cart text-white-50"
          style="font-size: 4rem"
        ></i>
        <h3 class="text-white-50 mt-3">Your cart is empty</h3>
        <router-link to="/" class="btn auth-btn mt-3"
          >Browse Products</router-link
        >
      </div>
      <div v-else>
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="row align-items-center">
            <div class="col-md-2 col-4">
              <img :src="item.image" :alt="item.title" class="cart-img" />
            </div>
            <div class="col-md-4 col-8">
              <h6 class="text-white mb-1">{{ item.title }}</h6>
              <span class="text-white-50 small">{{ item.category }}</span>
            </div>
            <div class="col-md-2 col-4 mt-2 mt-md-0">
              <div class="d-flex align-items-center">
                <button
                  class="btn btn-sm btn-dark"
                  @click="updateQty(item.product_id, -1)"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <span class="mx-3 text-white">{{ item.quantity }}</span>
                <button
                  class="btn btn-sm btn-dark"
                  @click="updateQty(item.product_id, 1)"
                >
                  +
                </button>
              </div>
            </div>
            <div class="col-md-2 col-4 mt-2 mt-md-0 text-end">
              <span class="text-white fw-bold"
                >AED {{ (item.price * item.quantity).toFixed(2) }}</span
              >
            </div>
            <div class="col-md-2 col-4 mt-2 mt-md-0 text-end">
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeItem(item.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="cart-summary">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="text-white-50">Total:</span>
              <span class="cart-total ms-2"
                >AED {{ cart.total.toFixed(2) }}</span
              >
            </div>
            <router-link to="/checkout" class="btn auth-btn"
              >Proceed to Checkout</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartAPI } from "@/utils/api";

export default {
  name: "BasketContentView",
  data() {
    return { cart: { items: [], total: 0 }, loading: true };
  },
  async mounted() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
      return;
    }
    await this.loadCart();
  },
  methods: {
    async loadCart() {
      try {
        this.cart = await cartAPI.get();
      } catch (err) {
        console.error(err);
      }
      this.loading = false;
    },
    async updateQty(productId, delta) {
      try {
        await cartAPI.add(productId, delta > 0 ? 1 : -1);
        await this.loadCart();
        this.$store.dispatch("fetchCartCount");
      } catch (err) {
        console.error(err);
      }
    },
    async removeItem(itemId) {
      try {
        await cartAPI.remove(itemId);
        this.$store.dispatch("showToast", {
          message: "Item removed from cart",
        });
        await this.loadCart();
        this.$store.dispatch("fetchCartCount");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #0a0a0a;
}
.page-title {
  color: #e6ca69;
  font-family: "Marcellus", serif;
  text-align: center;
  margin-bottom: 40px;
}
.cart-item {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
}
.cart-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: white;
  border-radius: 10px;
  padding: 8px;
}
.cart-summary {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 24px;
  margin-top: 20px;
}
.cart-total {
  color: #e6ca69;
  font-size: 1.5rem;
  font-weight: 700;
}
.auth-btn {
  background: #e6ca69;
  color: black;
  font-weight: 600;
  padding: 12px 32px;
  border-radius: 10px;
  border: none;
  text-decoration: none;
}
.auth-btn:hover {
  background: #d4b850;
  color: black;
}
</style>
