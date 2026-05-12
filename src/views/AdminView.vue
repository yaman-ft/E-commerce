<template>
  <div class="admin-page">
    <div class="container py-5">
      <h1 class="page-title">Admin Dashboard</h1>
      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="stat-card">
            <h3>{{ stats.products }}</h3>
            <p>Products</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card">
            <h3>{{ stats.orders }}</h3>
            <p>Orders</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card">
            <h3>{{ stats.users }}</h3>
            <p>Users</p>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="section-title">Manage Products</h3>
        <button
          class="btn auth-btn"
          @click="
            showForm = true;
            editing = null;
            form = {};
          "
        >
          + Add Product
        </button>
      </div>

      <div v-if="showForm" class="product-form mb-4">
        <h4>{{ editing ? "Edit Product" : "New Product" }}</h4>
        <form @submit.prevent="saveProduct">
          <div class="row g-3">
            <div class="col-md-6">
              <input
                v-model="form.title"
                class="form-control auth-input"
                placeholder="Title"
                required
              />
            </div>
            <div class="col-md-3">
              <input
                v-model="form.price"
                type="number"
                step="0.01"
                class="form-control auth-input"
                placeholder="Price"
                required
              />
            </div>
            <div class="col-md-3">
              <input
                v-model="form.category"
                class="form-control auth-input"
                placeholder="Category"
                required
              />
            </div>
            <div class="col-12">
              <textarea
                v-model="form.description"
                class="form-control auth-input"
                placeholder="Description"
                rows="2"
              ></textarea>
            </div>
            <div class="col-md-8">
              <input
                v-model="form.image"
                class="form-control auth-input"
                placeholder="Image URL"
              />
            </div>
            <div class="col-md-2">
              <input
                v-model="form.rating_rate"
                type="number"
                step="0.1"
                class="form-control auth-input"
                placeholder="Rating"
              />
            </div>
            <div class="col-md-2">
              <input
                v-model="form.rating_count"
                type="number"
                class="form-control auth-input"
                placeholder="Count"
              />
            </div>
          </div>
          <p v-if="formError" class="text-danger mt-2">{{ formError }}</p>
          <div class="mt-3">
            <button type="submit" class="btn auth-btn me-2" :disabled="saving">
              <span
                v-if="saving"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              {{ editing ? "Update" : "Create" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="showForm = false"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status"></div>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in products" :key="p.id">
              <td>{{ p.id }}</td>
              <td><img :src="p.image" class="product-thumb" /></td>
              <td class="text-truncate" style="max-width: 200px">
                {{ p.title }}
              </td>
              <td>AED {{ p.price }}</td>
              <td>{{ p.category }}</td>
              <td>
                <button
                  class="btn btn-sm btn-outline-warning me-1"
                  @click="editProduct(p)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteProduct(p.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { productsAPI } from "@/utils/api";
import { api } from "@/utils/api";

export default {
  name: "AdminView",
  data() {
    return {
      products: [],
      loading: true,
      showForm: false,
      editing: null,
      form: {},
      formError: "",
      saving: false,
      stats: { products: 0, orders: 0, users: 0 },
    };
  },
  async mounted() {
    await this.loadProducts();
    try {
      const [prods, orders] = await Promise.all([
        api("/products"),
        api("/orders"),
      ]);
      this.stats.products = prods.length;
      this.stats.orders = orders.length || 0;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async loadProducts() {
      try {
        this.products = await productsAPI.getAll();
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    },
    editProduct(p) {
      this.editing = p.id;
      this.form = {
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
        rating_rate: p.rating_rate,
        rating_count: p.rating_count,
      };
      this.showForm = true;
    },
    async saveProduct() {
      this.saving = true;
      this.formError = "";
      try {
        if (this.editing) {
          await productsAPI.update(this.editing, this.form);
          this.$store.dispatch("showToast", { message: "Product updated!" });
        } else {
          await productsAPI.create(this.form);
          this.$store.dispatch("showToast", { message: "Product created!" });
        }
        this.showForm = false;
        this.form = {};
        this.editing = null;
        await this.loadProducts();
      } catch (err) {
        this.formError = err.message;
      } finally {
        this.saving = false;
      }
    },
    async deleteProduct(id) {
      if (!confirm("Delete this product?")) return;
      try {
        await productsAPI.delete(id);
        this.$store.dispatch("showToast", { message: "Product deleted!" });
        await this.loadProducts();
      } catch (err) {
        this.$store.dispatch("showToast", {
          message: err.message,
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #0a0a0a;
}
.page-title {
  color: #e6ca69;
  font-family: "Marcellus", serif;
  text-align: center;
  margin-bottom: 40px;
}
.section-title {
  color: #e6ca69;
  font-family: "Marcellus", serif;
}
.stat-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
}
.stat-card h3 {
  color: #e6ca69;
  font-size: 2.5rem;
  margin-bottom: 4px;
}
.stat-card p {
  color: #888;
  margin: 0;
}
.product-form {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 24px;
}
.product-form h4 {
  color: #e6ca69;
  margin-bottom: 16px;
}
.auth-input {
  background: #0a0a0a;
  border: 1px solid #333;
  color: white;
  border-radius: 8px;
  padding: 10px 14px;
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
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
}
.auth-btn:hover {
  background: #d4b850;
  color: black;
}
.product-thumb {
  width: 50px;
  height: 50px;
  object-fit: contain;
  background: white;
  border-radius: 6px;
  padding: 4px;
}
.table td {
  vertical-align: middle;
}
</style>
