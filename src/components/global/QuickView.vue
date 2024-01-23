<template>
  <div class="quick-view mt-16">
    <v-dialog v-model="dialog" max-width="900" max-height="500">
      <v-icon
        style="
          position: absolute;
          right: -10px;
          top: -15px;
          background-color: rgb(85, 21, 82);
          color: rgb(204, 199, 199);
          font-size: 18px;
          padding: 13px;
          border-radius: 50%;
          z-index: 10;
        "
        @click="dialog = false"
        >mdi-close</v-icon
      >
      <v-card elevation="0" class="content_card">
        <v-container fluid class="bg-white pt-10 px-10">
          <v-row>
            <v-col cols="12" md="7">
              <img
                :src="tab ? tab : product.thumbnail"
                class="w-100"
                alt=""
                height="400"
                v-if="!loading"
              />
              <v-skeleton-loader
                v-if="loading"
                type="image,image,image"
              ></v-skeleton-loader>
              <v-tabs center-active height="130" v-model="tab" class="mt-10">
                <v-tab
                  v-for="(img, i) in product.images"
                  :key="i"
                  class="mx-10"
                  :value="img"
                >
                  <img :src="img" alt="" width="70" height="100"
                /></v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="12" md="5" class="pt-0 pl-6 mt-8 mt-md-0">
              <v-skeleton-loader
                v-if="loading"
                type="article,article,article"
              ></v-skeleton-loader>
              <v-card elevation="0" v-if="!loading">
                <v-card-title
                  class="px-0"
                  style="
                    font-size: 19px;
                    font-weight: bold;
                    white-space: pre-wrap;
                  "
                  >({{ product.title }})Sample - {{ product.category }} For
                  Sale</v-card-title
                >
                <div class="rating-paren d-flex align-center" style="gap: 10px">
                  <v-rating
                    v-model="product.rating"
                    half-increments
                    readonly
                    color="yellow-darken-2"
                    size="x-small"
                    density="compact"
                  ></v-rating>
                  <span
                    class="mt-1"
                    style="color: rgb(94, 90, 90); font-size: 13px"
                    >Stock: {{ product.stock }}</span
                  >
                </div>
                <v-card-text
                  style="color: rgb(94, 90, 90); font-size: 13px"
                  class="px-0 pt-0"
                  >Brand: {{ product.brand }}</v-card-text
                >
                <v-card-text
                  style="color: rgb(94, 90, 90); font-size: 13px"
                  class="px-0 pt-0"
                  >Availabilty:
                  {{
                    product.stock > 0 ? "In Stock" : "Out Of Stock"
                  }}</v-card-text
                >
                <v-card-text class="pl-0 pt-0">
                  <del>${{ product.price }}</del> From
                  <span style="font-weight: 900; font-size: 16px"
                    >${{
                      Math.ceil(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )
                    }}</span
                  ></v-card-text
                >
                <v-card-text class="pl-0 pt-0">Quantity</v-card-text>
                <div
                  class="counter px-1"
                  style="
                    border-radius: 30px;
                    border: 1px solid rgb(209, 199, 199);
                    width: fit-content;
                  "
                >
                  <v-icon size="22" @click="quantity > 1 ? quantity-- : false"
                    >mdi-minus</v-icon
                  >
                  <input
                    type="number"
                    style="
                      border: none;
                      outline: none;
                      width: 60px;
                      font-size: 13px;
                    "
                    class="text-center py-2"
                    min="1"
                    v-model="quantity"
                    :value="quantity"
                    id="numericInput"
                  />
                  <v-icon size="22" @click="quantity++">mdi-plus</v-icon>
                </div>
                <v-card-text class="pl-0">
                  Subtotal: ${{
                    Math.ceil(
                      product.price -
                        product.price * (product.discountPercentage / 100)
                    ) * quantity
                  }}
                </v-card-text>
                <v-card-actions class="mt-7 w-100 px-0">
                  <v-btn
                    variant="outlined"
                    style="
                      text-transform: none;
                      border-radius: 30px;
                      background-color: rgb(34, 34, 34);
                    "
                    class="w-75 text-white"
                    density="compact"
                    height="50"
                    @click="addToCart(product)"
                    :loading="btnLoading"
                    >Add To Cart</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
<script>
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { cartStore } from "@/stores/Cart";
import { mapActions } from "pinia";

export default {
  inject: ["Emitter"],
  components: {
    VSkeletonLoader,
  },
  methods: {
    ...mapActions(cartStore, ["addItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addItem(item);
        this.Emitter.emit("openCart");
        this.Emitter.emit("showMsg", item.title);
        this.dialog = false;
      }, 1000);
    },
  },
  data: () => ({
    loading: false,
    tab: "",
    dialog: false,
    quantity: 1,
    product: "",
    btnLoading: false,
  }),
  mounted() {
    this.Emitter.on("openQuickView", (data) => {
      this.loading = true;
      this.product = data;
      this.dialog = true;
      setTimeout(() => {
        this.loading = false;
      }, 800);
    });
  },
};
</script>
<style lang="scss">
.content_card {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: rgb(175, 167, 167);
  }
  &::-webkit-scrollbar-track {
    width: 5px;
    background-color: rgb(212, 192, 192);
  }
}
</style>
