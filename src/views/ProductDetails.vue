<template>
  <div class="product-details mt-16">
    <v-container>
      <v-row>
        <v-col cols="12" md="7">
          <img
            :src="tab ? tab : signelProduct.thumbnail"
            class="w-100"
            alt=""
            height="500"
            v-if="!loading"
          />
          <v-skeleton-loader
            v-if="loading"
            type="image,image,image"
          ></v-skeleton-loader>
          <v-tabs center-active height="220" v-model="tab" class="mt-10">
            <v-tab
              v-for="(img, i) in signelProduct.images"
              :key="i"
              class="mx-10"
              :value="img"
            >
              <img :src="img" alt="" width="100" height="200"
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
              style="font-size: 19px; font-weight: bold"
              >({{ signelProduct.title }})Sample -
              {{ signelProduct.category }} For Sale</v-card-title
            >
            <div class="rating-paren d-flex align-center" style="gap: 10px">
              <v-rating
                v-model="signelProduct.rating"
                half-increments
                readonly
                color="yellow-darken-2"
                size="x-small"
                density="compact"
              ></v-rating>
              <span class="mt-1" style="color: rgb(94, 90, 90); font-size: 13px"
                >Stock: {{ signelProduct.stock }}</span
              >
            </div>
            <v-card-text
              style="color: rgb(94, 90, 90); font-size: 13px"
              class="px-0 pt-0"
              >Brand: {{ signelProduct.brand }}</v-card-text
            >
            <v-card-text
              style="color: rgb(94, 90, 90); font-size: 13px"
              class="px-0 pt-0"
              >Availabilty:
              {{
                signelProduct.stock > 0 ? "In Stock" : "Out Of Stock"
              }}</v-card-text
            >
            <v-card-text class="pl-0 pt-0">
              <del>${{ signelProduct.price }}</del> From
              <span style="font-weight: 900; font-size: 16px"
                >${{
                  Math.ceil(
                    signelProduct.price -
                      signelProduct.price *
                        (signelProduct.discountPercentage / 100)
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
                  signelProduct.price -
                    signelProduct.price *
                      (signelProduct.discountPercentage / 100)
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
                @click="addToCart(signelProduct)"
                :loading="btnLoading"
                >Add To Cart</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
import { productsModule } from "@/stores/Products";
import { mapActions, mapState } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { cartStore } from "@/stores/Cart";

export default {
  inject: ["Emitter"],
  computed: {
    ...mapState(productsModule, ["signelProduct"]),
  },
  methods: {
    ...mapActions(productsModule, ["getSingleProduct"]),
    ...mapActions(cartStore, ["addItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addItem(item);
        this.Emitter.emit("openCart");
        this.Emitter.emit("showMsg", item.title);
      }, 1000);
    },
  },
  components: {
    VSkeletonLoader,
  },
  data: () => ({
    loading: false,
    tab: "",
    quantity: 1,
    btnLoading: false,
  }),
  async beforeMount() {
    this.loading = true;
    await this.getSingleProduct(this.$route.params.productId);
    this.loading = false;
  },
};
</script>
