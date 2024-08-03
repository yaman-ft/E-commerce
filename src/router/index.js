import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import ShowProductView from "../views/ShowProductView.vue";
import BasketContentView from "@/views/BasketContentView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/basket",
    name: "basket",
    component: BasketContentView,
  },
  {
    path: "/show-product",
    name: "showproduct",
    component: ShowProductView,
  },
  {
    path: "/category",
    name: "category",
    component: CategoryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
