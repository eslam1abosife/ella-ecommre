<template>
  <div class="home">
    <UpperBanner />
    <TheFeatures />
    <TopOffers />
    <ProductsComponent
      :products="flashDeals"
      title="Flash Deals"
      titleColor="red"
      :index="0"
    />
    <ToCats />
    <NewProducts :products="newProducts" :index="1" />
    <QualityFeatures />
    <ProductsComponent
      :products="mobilePhones"
      title="Top Mobile phones"
      titleColor="#404040"
      :index="0"
    />
    <v-container>
      <v-row>
        <v-col cols="6 " class="pr-5">
          <img
            src="@/assets/images/band-right-cover.webp"
            class="w-100"
            alt=""
          />
        </v-col>
        <v-col cols="6" class="pl-5">
          <img
            src="@/assets/images/band-left-cover.webp"
            class="w-100"
            alt=""
          />
        </v-col>
      </v-row>
    </v-container>
    <ProductsComponent
      :products="fragrances"
      title="Top Fragrances"
      titleColor="#404040"
      :index="3"
    />
    <img src="@/assets/images/tv-banner.webp" class="w-100" alt="" />
    <ProductsComponent
      :products="groceries"
      title="Top groceries"
      titleColor="#404040"
      :index="6"
    />
    <WhyShopWithUs />
  </div>
</template>

<script>
import UpperBanner from "@/components/home_page/UpperBanner.vue";
import TheFeatures from "@/components/home_page/TheFeatures.vue";
import TopOffers from "@/components/home_page/TopOffers.vue";
import ProductsComponent from "@/components/home_page/ProductsSwiper.vue";
import ToCats from "@/components/home_page/TopCategories.vue";
import NewProducts from "@/components/home_page/NewProducts.vue";
import QualityFeatures from "@/components/home_page/QualityFeatures.vue";
import WhyShopWithUs from "@/components/home_page/WhyShopWithUs.vue";
import { productsModule } from "@/stores/Products";
import { mapActions, mapState } from "pinia";
export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeatures,
    TopOffers,
    ProductsComponent,
    ToCats,
    NewProducts,
    QualityFeatures,
    WhyShopWithUs,
  },
  computed: {
    ...mapState(productsModule, [
      "flashDeals",
      "newProducts",
      "mobilePhones",
      "fragrances",
      "groceries",
    ]),
  },
  methods: {
    ...mapActions(productsModule, ["getProducts"]),
  },
  async mounted() {
    await this.getProducts();
  },
};
</script>
