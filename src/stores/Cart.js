import { defineStore } from "pinia";

export const cartStore = defineStore("cartStore", {
  state: () => ({
    cardItems: [],
  }),
  actions: {
    addItem(item) {
      let exists = false;
      for (let i = 0; i < this.cardItems.length; i++) {
        if (this.cardItems[i].id == item.id) {
          this.cardItems[i].quantity += item.quantity;
          exists = true;
          break;
        }
      }
      if (!exists) {
        this.cardItems.push(JSON.parse(JSON.stringify(item)));
      }
      localStorage.setItem("cart-items", JSON.stringify(this.cardItems));
      console.log(this.cardItems);
    },
    getCartItems() {
      if (localStorage.getItem("cart-items")) {
        this.cardItems = JSON.parse(localStorage.getItem("cart-items"));
      }
      console.log(this.cardItems);
    },
    deleteItem(id) {
      for (let i = 0; i < this.cardItems.length; i++) {
        if (this.cardItems[i].id === id) {
          this.cardItems.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("cart-items", JSON.stringify(this.cardItems));
    },
    setToLocalStorage() {
      localStorage.setItem("cart-items", JSON.stringify(this.cardItems));
    },
    resetItems() {
      this.cardItems = [];
      localStorage.removeItem("cart-items");
    },
  },
});
