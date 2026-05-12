<template>
  <div class="checkout-page">
    <div class="container py-5">
      <h1 class="page-title">Checkout</h1>
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status"></div>
      </div>
      <div v-else-if="cart.items.length === 0" class="text-center py-5">
        <h3 class="text-white-50">Your cart is empty</h3>
        <router-link to="/" class="btn auth-btn mt-3"
          >Browse Products</router-link
        >
      </div>
      <div v-else class="row g-4">
        <div class="col-lg-7">
          <div class="checkout-card">
            <h4 class="section-title">Shipping Address</h4>
            <form @submit.prevent="placeOrder">
              <div class="mb-3">
                <label class="form-label">Full Address</label>
                <textarea
                  v-model="address"
                  class="form-control auth-input"
                  rows="3"
                  placeholder="Street, City, State, ZIP"
                  required
                ></textarea>
              </div>
              <div class="mb-4">
                <label class="form-label">Payment Method</label>
                <select
                  v-model="payment_method"
                  class="form-control auth-input"
                  required
                >
                  <option value="" disabled>Select payment method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <p v-if="error" class="text-danger">{{ error }}</p>
              <button
                type="submit"
                class="btn auth-btn w-100"
                :disabled="submitting"
              >
                <span
                  v-if="submitting"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Place Order - AED {{ cart.total.toFixed(2) }}
              </button>
            </form>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="checkout-card">
            <h4 class="section-title">Order Summary</h4>
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="d-flex align-items-center justify-content-between mb-3"
            >
              <div class="d-flex align-items-center">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="checkout-img me-3"
                />
                <div>
                  <div class="text-white small">
                    {{ item.title.substring(0, 30) }}...
                  </div>
                  <div class="text-white-50 small">
                    Qty: {{ item.quantity }}
                  </div>
                </div>
              </div>
              <span class="text-white"
                >AED {{ (item.price * item.quantity).toFixed(2) }}</span
              >
            </div>
            <hr class="border-secondary" />
            <div class="d-flex justify-content-between text-white">
              <strong>Total</strong>
              <strong style="color: #e6ca69"
                >AED {{ cart.total.toFixed(2) }}</strong
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartAPI, ordersAPI } from "@/utils/api";

export default {
  name: "CheckoutView",
  data() {
    return {
      cart: { items: [], total: 0 },
      address: "",
      payment_method: "",
      error: "",
      loading: true,
      submitting: false,
    };
  },
  async mounted() {
    try {
      this.cart = await cartAPI.get();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async placeOrder() {
      this.submitting = true;
      this.error = "";
      try {
        await ordersAPI.create({
          address: this.address,
          payment_method: this.payment_method,
        });
        this.$store.dispatch("showToast", {
          message: "Order placed successfully!",
        });
        this.$store.commit("SET_CART_COUNT", 0);
        this.$router.push("/orders");
      } catch (err) {
        this.error = err.message;
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #0a0a0a;
}
.page-title {
  color: #e6ca69;
  font-family: "Marcellus", serif;
  text-align: center;
  margin-bottom: 40px;
}
.checkout-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 30px;
}
.section-title {
  color: #e6ca69;
  margin-bottom: 20px;
  font-family: "Marcellus", serif;
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
.checkout-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: white;
  border-radius: 8px;
  padding: 4px;
}
select option {
  background: #1a1a1a;
  color: white;
}
</style>
