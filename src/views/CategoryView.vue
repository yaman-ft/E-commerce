<template>
  <div class="category-page">
    <div class="container py-5">
      <h2 class="section-title text-center mb-5">
        {{ currentCategory }} Products
      </h2>
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status"></div>
      </div>
      <div v-else class="row g-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-lg-3 col-md-4 col-sm-6"
        >
          <div class="product-card" @click="goToProduct(product.id)">
            <div class="product-img-wrap">
              <img
                :src="product.image"
                :alt="product.title"
                class="product-img"
              />
            </div>
            <div class="product-info">
              <h6 class="product-title">
                {{ product.title.substring(0, 40) }}
              </h6>
              <div class="product-price">AED {{ product.price }}</div>
              <div class="product-rating">
                &#9733; {{ product.rating?.rate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productsAPI } from "@/utils/api";

export default {
  name: "CategoryView",
  data() {
    return { products: [], loading: true, currentCategory: "" };
  },
  async mounted() {
    const cat = this.$route.query.cat || "electronics";
    this.currentCategory = cat;
    try {
      this.products = await productsAPI.getAll(cat);
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
  },
  methods: {
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  background: #0a0a0a;
}
.section-title {
  color: #e6ca69;
  font-family: "Playfair Display", serif;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 2.5rem;
}
.product-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}
.product-card:nth-child(1) {
  animation-delay: 0.1s;
}
.product-card:nth-child(2) {
  animation-delay: 0.2s;
}
.product-card:nth-child(3) {
  animation-delay: 0.3s;
}
.product-card:nth-child(4) {
  animation-delay: 0.4s;
}
.product-card:nth-child(5) {
  animation-delay: 0.5s;
}
.product-card:nth-child(6) {
  animation-delay: 0.6s;
}
.product-card:nth-child(7) {
  animation-delay: 0.7s;
}
.product-card:nth-child(8) {
  animation-delay: 0.8s;
}
.product-card:hover {
  border-color: #e6ca69;
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(230, 202, 105, 0.1);
}
.product-img-wrap {
  background: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
}
.product-img {
  max-height: 180px;
  max-width: 100%;
  object-fit: contain;
}
.product-info {
  padding: 16px;
}
.product-title {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 8px;
}
.product-price {
  color: #e6ca69;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 4px;
}
.product-rating {
  color: #888;
  font-size: 0.8rem;
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
