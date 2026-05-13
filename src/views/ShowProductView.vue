<template>
  <div class="product-detail-page" v-if="!loading">
    <div class="container py-5">
      <button class="btn btn-outline-secondary mb-4" @click="$router.back()">
        &larr; Back
      </button>
      <div class="row g-5">
        <div class="col-lg-5">
          <div class="product-image-wrap">
            <img :src="product.image" :alt="product.title" class="detail-img" />
          </div>
        </div>
        <div class="col-lg-7">
          <h1 class="product-detail-title">{{ product.title }}</h1>
          <div class="product-detail-price">AED {{ product.price }}</div>
          <div class="product-detail-rating mb-4">
            <span class="stars">&#9733;</span> {{ product.rating?.rate }} ({{
              product.rating?.count
            }}
            reviews)
          </div>
          <p class="text-white-50 lh-lg mb-4">{{ product.description }}</p>
          <div class="mb-4">
            <label class="form-label text-white">Quantity</label>
            <div
              class="d-flex align-items-center gap-2"
              style="max-width: 150px"
            >
              <button
                class="btn btn-dark"
                @click="quantity = Math.max(1, quantity - 1)"
              >
                -
              </button>
              <input
                type="number"
                v-model.number="quantity"
                class="form-control text-center"
                min="1"
              />
              <button class="btn btn-dark" @click="quantity++">+</button>
            </div>
          </div>
          <p v-if="error" class="text-danger">{{ error }}</p>
          <button
            class="btn add-to-cart-btn"
            @click="addToCart"
            :disabled="adding"
          >
            <span
              v-if="adding"
              class="spinner-border spinner-border-sm me-2"
            ></span>
            <i v-else class="fas fa-shopping-cart me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="text-center py-5"
    style="background: #0a0a0a; min-height: 100vh"
  >
    <div class="spinner-border text-light" role="status"></div>
  </div>
</template>

<script>
import { productsAPI, cartAPI } from "@/utils/api";

export default {
  name: "ShowProductView",
  data() {
    return {
      product: {},
      loading: true,
      quantity: 1,
      adding: false,
      error: "",
    };
  },
  async mounted() {
    await this.loadProduct();
  },
  watch: {
    "$route.params.id": "loadProduct",
  },
  methods: {
    async loadProduct() {
      this.loading = true;
      try {
        this.product = await productsAPI.get(this.$route.params.id);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async addToCart() {
      if (!this.$store.getters.isAuthenticated) {
        this.$router.push("/login");
        return;
      }
      this.adding = true;
      this.error = "";
      try {
        const quantity = Math.max(1, Number(this.quantity) || 1);
        await cartAPI.add(this.product.id, quantity);
        this.$store.dispatch("showToast", {
          message: `${this.product.title.substring(0, 20)}... added to cart!`,
        });
        this.$store.dispatch("fetchCartCount");
      } catch (err) {
        this.error = err.message;
      } finally {
        this.adding = false;
      }
    },
  },
};
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: #0a0a0a;
}
.product-image-wrap {
  background: white;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333;
}
.detail-img {
  max-height: 400px;
  max-width: 100%;
  object-fit: contain;
}
.product-detail-title {
  color: #e6ca69;
  font-family: "Marcellus", serif;
  font-size: 2rem;
}
.product-detail-price {
  color: #e6ca69;
  font-size: 2rem;
  font-weight: 700;
  margin: 16px 0;
}
.product-detail-rating {
  color: #888;
}
.stars {
  color: #f1c40f;
}
.add-to-cart-btn {
  background: #e6ca69;
  color: black;
  padding: 14px 40px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
}
.add-to-cart-btn:hover {
  background: #d4b850;
  color: black;
}
.form-control {
  background: #1a1a1a;
  border: 1px solid #333;
  color: white;
}
.form-control:focus {
  border-color: #e6ca69;
  box-shadow: 0 0 0 2px rgba(230, 202, 105, 0.2);
  background: #1a1a1a;
  color: white;
}
.btn-outline-secondary {
  color: #888;
  border-color: #333;
}
.btn-outline-secondary:hover {
  background: #333;
  color: white;
}
</style>
