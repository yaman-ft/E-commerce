<template>
  <div class="orders-page">
    <div class="container py-5">
      <h1 class="page-title">My Orders</h1>
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status"></div>
      </div>
      <div v-else-if="orders.length === 0" class="text-center py-5">
        <h3 class="text-white-50">No orders yet</h3>
        <router-link to="/" class="btn auth-btn mt-3"
          >Start Shopping</router-link
        >
      </div>
      <div v-else>
        <div v-for="order in orders" :key="order.id" class="order-card mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span class="order-label">Order #{{ order.id }}</span>
              <span class="order-date ms-3">{{
                new Date(order.created_at).toLocaleDateString()
              }}</span>
            </div>
            <span :class="'badge status-' + order.status">{{
              order.status
            }}</span>
          </div>
          <div
            v-for="item in order.items"
            :key="item.id"
            class="d-flex align-items-center mb-2"
          >
            <img :src="item.image" :alt="item.title" class="order-img me-3" />
            <div class="flex-grow-1">
              <div class="text-white small">
                {{ item.title.substring(0, 40) }}
              </div>
              <div class="text-white-50 small">
                Qty: {{ item.quantity }} x AED {{ item.price.toFixed(2) }}
              </div>
            </div>
            <span class="text-white"
              >AED {{ (item.quantity * item.price).toFixed(2) }}</span
            >
          </div>
          <hr class="border-secondary" />
          <div class="d-flex justify-content-between">
            <span class="text-white-50">{{ order.address }}</span>
            <strong style="color: #e6ca69"
              >Total: AED {{ order.total.toFixed(2) }}</strong
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ordersAPI } from "@/utils/api";

export default {
  name: "OrdersView",
  data() {
    return { orders: [], loading: true };
  },
  async mounted() {
    try {
      this.orders = await ordersAPI.getAll();
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  background: #0a0a0a;
}
.page-title {
  color: #e6ca69;
  font-family: "Marcellus", serif;
  text-align: center;
  margin-bottom: 40px;
}
.order-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 24px;
}
.order-label {
  color: #e6ca69;
  font-weight: 600;
  font-size: 1.1rem;
}
.order-date {
  color: #888;
  font-size: 0.9rem;
}
.order-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  background: white;
  border-radius: 8px;
  padding: 4px;
}
.badge {
  text-transform: capitalize;
  padding: 6px 14px;
  border-radius: 20px;
}
.status-pending {
  background: #f39c12;
  color: black;
}
.status-processing {
  background: #3498db;
  color: white;
}
.status-shipped {
  background: #9b59b6;
  color: white;
}
.status-delivered {
  background: #27ae60;
  color: white;
}
.status-cancelled {
  background: #e74c3c;
  color: white;
}
.auth-btn {
  background: #e6ca69;
  color: black;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  display: inline-block;
}
.auth-btn:hover {
  background: #d4b850;
  color: black;
}
</style>
