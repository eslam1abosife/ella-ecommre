import { defineStore } from "pinia";
import axios from "axios";

export const productsModule = defineStore("productsModule", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    mobilePhones: [],
    fragrances: [],
    groceries: [],
    categoryProducts: [],
    signelProduct: "",
    categories: [
      {
        title: "Smart Phones",
        route: "smartphones",
      },
      {
        title: "Laptops",
        route: "laptops",
      },
      {
        title: "Furniture",
        route: "furniture",
      },
      {
        title: "Fragrances",
        route: "fragrances",
      },
      {
        title: "Men's Watches",
        route: "mens-watches",
      },
      {
        title: "Women's Bags",
        route: "womens-bags",
      },
      {
        title: "Groceries",
        route: "groceries",
      },
    ],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          this.newProducts = res.data.products.filter(
            (el) => el.category === "laptops"
          );
          this.flashDeals = res.data.products.slice(0, 8);
          this.mobilePhones = res.data.products.filter(
            (el) => el.category === "smartphones"
          );
          this.fragrances = res.data.products.filter(
            (el) => el.category === "fragrances"
          );
          this.groceries = res.data.products.filter(
            (el) => el.category === "groceries"
          );
        })
        .catch((err) => console.log(err));
    },
    async getProductsByCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => (this.categoryProducts = res.data));
    },
    async getSingleProduct(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((res) => (this.signelProduct = res.data));
    },
  },
});
