<template>
  <div style="background: #0a0a0a">
    <div class="hero-section position-relative overflow-hidden">
      <img src="@/assets/Images/Header 1.jpg" class="w-100 hero-img" />
      <div class="hero-overlay">
        <div class="container h-100 d-flex align-items-center">
          <div class="hero-text">
            <h1>ALMOTTHEDON</h1>
            <p>Premium Collection</p>
            <router-link to="/category?cat=electronics" class="btn hero-btn"
              >Shop Now</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <h2 class="section-title text-center mb-5">Featured Products</h2>
      <div v-if="loading" class="text-center py-5">
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading featured products...</p>
        </div>
      </div>
      <div v-else class="row g-4">
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="col-lg-3 col-md-4 col-sm-6"
        >
          <div
            class="product-card animate-fade-in"
            @click="goToProduct(product.id)"
          >
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
                <span class="stars">&#9733;</span>
                {{ product.rating?.rate }} ({{ product.rating?.count }})
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!loading && products.length > initialDisplayCount"
        class="text-center mt-4"
      >
        <button
          @click="showMoreProducts"
          class="btn show-more-btn"
          :disabled="displayedProducts.length >= products.length"
        >
          {{
            displayedProducts.length >= products.length
              ? "No More Products"
              : "Show More"
          }}
        </button>
      </div>
    </div>

    <div class="container py-5 animate-on-scroll">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <img
            src="@/assets/Images/portrait-young-woman-with-earrings-with-gems-isolated.jpg"
            class="img-fluid rounded-4"
          />
        </div>
        <div class="col-lg-6 mt-4 mt-lg-0">
          <h2 class="section-title" style="color: #e6ca69">
            Luxury Jewelry Collection
          </h2>
          <p class="text-white-50 lh-lg">
            Discover our exquisite handcrafted jewelry pieces, designed to make
            every moment special. From timeless diamonds to contemporary gold
            designs.
          </p>
          <router-link to="/category?cat=jewelery" class="btn hero-btn"
            >Explore Collection</router-link
          >
        </div>
      </div>
    </div>

    <div class="container py-5 mt-4 animate-on-scroll">
      <h2 class="section-title text-center mb-5">Categories</h2>
      <div class="row g-3">
        <div v-for="cat in categories" :key="cat.name" class="col-md-3 col-6">
          <div class="category-card" @click="goToCategory(cat.slug)">
            <div class="category-badge">{{ cat.label }}</div>
            <div class="category-name">{{ cat.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer-section">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-lg-4">
            <img src="@/assets/logo2 - Copy.png" height="80" class="mb-3" />
            <p class="text-white-50">
              Premium quality products for discerning customers.
            </p>
          </div>
          <div class="col-lg-2 col-md-4">
            <h6 class="footer-title">Shop</h6>
            <router-link to="/category?cat=electronics" class="footer-link"
              >Electronics</router-link
            >
            <router-link to="/category?cat=jewelery" class="footer-link"
              >Jewelry</router-link
            >
            <router-link to="/category?cat=men's clothing" class="footer-link"
              >Men Clothing</router-link
            >
            <router-link to="/category?cat=women's clothing" class="footer-link"
              >Women Clothing</router-link
            >
          </div>
          <div class="col-lg-2 col-md-4">
            <h6 class="footer-title">Account</h6>
            <router-link to="/login" class="footer-link">Login</router-link>
            <router-link to="/register" class="footer-link"
              >Register</router-link
            >
            <router-link to="/orders" class="footer-link"
              >My Orders</router-link
            >
          </div>
          <div class="col-lg-4 col-md-4">
            <h6 class="footer-title">Contact</h6>
            <p class="text-white-50 mb-1">+971 56 715 5150</p>
            <p class="text-white-50 mb-1">info@almotthedon.com</p>
            <div class="d-flex gap-2 mt-3">
              <a href="#" class="social-link"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="#" class="social-link"
                ><i class="fab fa-instagram"></i
              ></a>
              <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <hr class="border-secondary my-4" />
        <p class="text-center text-white-50 mb-0">
          &copy; Al Motthedon 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { productsAPI } from "@/utils/api";

export default {
  name: "HomeView",
  data() {
    return {
      products: [],
      loading: true,
      initialDisplayCount: 8,
      displayedProducts: [],
      categories: [
        { name: "Electronics", slug: "electronics", label: "EL" },
        { name: "Jewelry", slug: "jewelery", label: "JE" },
        { name: "Men Clothing", slug: "men's clothing", label: "MN" },
        { name: "Women Clothing", slug: "women's clothing", label: "WM" },
      ],
    };
  },
  async mounted() {
    try {
      this.products = await productsAPI.getAll();
      this.displayedProducts = this.products.slice(0, this.initialDisplayCount);
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
    this.initScrollAnimations();
  },
  methods: {
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    goToCategory(slug) {
      this.$router.push(`/category?cat=${encodeURIComponent(slug)}`);
    },
    showMoreProducts() {
      const currentLength = this.displayedProducts.length;
      const nextBatch = this.products.slice(
        currentLength,
        currentLength + this.initialDisplayCount,
      );
      this.displayedProducts = [...this.displayedProducts, ...nextBatch];
    },
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      }, observerOptions);

      // Observe all animate-on-scroll elements
      this.$nextTick(() => {
        const elements = this.$el.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observer.observe(el));
      });
    },
  },
};
</script>

<style scoped>
.hero-section {
  height: 600px;
}
.hero-img {
  height: 600px;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.6)
  );
  display: flex;
  align-items: center;
}
.hero-overlay .container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.hero-text {
  max-width: 520px;
  padding-left: 50px;
  animation: heroReveal 1s ease-out forwards;
  opacity: 0;
  transform: translateY(24px);
}
.hero-text h1 {
  color: #e6ca69;
  font-family: "Playfair Display", serif;
  font-size: 4.8rem;
  margin-bottom: 12px;
  letter-spacing: 0.12em;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.85);
}
.hero-text p {
  color: #e3e3e3;
  font-family: "Inter", sans-serif;
  font-size: 1.35rem;
  margin-bottom: 28px;
  font-weight: 400;
  letter-spacing: 0.04em;
}
.hero-btn {
  background: #e6ca69;
  color: black;
  padding: 14px 34px;
  border-radius: 10px;
  font-weight: 700;
  transition: all 0.25s ease;
  border: none;
}
.hero-btn:hover {
  background: #d4b850;
  color: black;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 18px rgba(230, 202, 105, 0.28);
}
.section-title {
  color: #e6ca69;
  font-family: "Playfair Display", serif;
  font-weight: 800;
  font-size: 2.8rem;
  letter-spacing: 0.08em;
}
@keyframes heroReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
.product-card:hover {
  border-color: #e6ca69;
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(230, 202, 105, 0.1);
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
.stars {
  color: #f1c40f;
}
.category-card {
  background: linear-gradient(
    135deg,
    rgba(30, 25, 20, 0.95),
    rgba(15, 15, 15, 0.95)
  );
  border: 1px solid rgba(230, 202, 105, 0.2);
  border-radius: 24px;
  padding: 32px 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.category-card:hover {
  border-color: #e6ca69;
  transform: translateY(-8px);
  box-shadow: 0 18px 40px rgba(230, 202, 105, 0.12);
}
.category-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: rgba(230, 202, 105, 0.15);
  color: #e6ca69;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.category-name {
  color: white;
  font-weight: 700;
  font-family: "Playfair Display", serif;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
}
.footer-section {
  background: #111;
  border-top: 1px solid #222;
}
.footer-title {
  color: #e6ca69;
  margin-bottom: 16px;
  font-weight: 600;
}
.footer-link {
  display: block;
  color: #888;
  text-decoration: none;
  padding: 4px 0;
  font-size: 0.9rem;
}
.footer-link:hover {
  color: #e6ca69;
}
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #222;
  border-radius: 50%;
  color: #ccc;
  text-decoration: none;
  transition: all 0.2s;
}
.show-more-btn {
  background: #e6ca69;
  color: black;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}
.show-more-btn:hover:not(:disabled) {
  background: #d4b850;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(230, 202, 105, 0.3);
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #333;
  border-top: 4px solid #e6ca69;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.loading-text {
  color: #e6ca69;
  font-size: 1rem;
  margin: 0;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}
.animate-on-scroll.animate {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 992px) {
  .hero-section,
  .hero-img {
    height: 520px;
  }
  .hero-overlay .container {
    justify-content: center;
    padding: 0 20px;
  }
  .hero-text {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }
  .hero-text h1 {
    font-size: 3.4rem;
  }
  .hero-text p {
    font-size: 1.15rem;
    margin-bottom: 22px;
  }
  .hero-btn {
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-section,
  .hero-img {
    height: 400px;
  }
  .hero-text h1 {
    font-size: 2.5rem;
  }
}
</style>
