import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "products_category",
    component: () => import("@/views/ProductsCategory.vue"),
  },
  {
    path: "/products/product-details/:productId",
    name: "product_details",
    component: () => import("@/views/ProductDetails.vue"),
  },
  {
    path: "/cart-page",
    name: "cart_page",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/checkout",
    name: "check_out",
    component: () => import("@/views/CheckOut.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
