import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ShowProductView from "../views/ShowProductView.vue";
import BasketContentView from "@/views/BasketContentView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import OrdersView from "@/views/OrdersView.vue";
import AdminView from "@/views/AdminView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/category", name: "category", component: CategoryView },
  { path: "/product/:id", name: "product", component: ShowProductView },
  { path: "/cart", name: "cart", component: BasketContentView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "orders",
    component: OrdersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || null;
  if (to.meta.requiresAuth && !token) {
    next({ name: "login" });
  } else if (to.meta.requiresAdmin && user?.role !== "admin") {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
