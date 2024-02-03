<template>
  <div class="products-swiper pt-16 pb-5">
    <div class="title mb-10 px-5 d-flex align-center justify-space-between">
      <h2
        style="font-weight: 900; font-size: 30px"
        :class="[`text-${titleColor}`]"
      >
        {{ title }}
      </h2>
      <router-link
        class="text-black"
        style="font-size: 18px"
        :to="{
          name: 'products_category',
          query: {
            title: categories[index].title,
            category: categories[index].route,
          },
        }"
        >Shop All</router-link
      >
    </div>
    <v-container fluid v-if="!products.length">
      <v-row>
        <v-col class="pb-15 px-5 mt-13" cols="12">
          <v-row>
            <v-col cols="3" v-for="num in 4" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <swiper
      :modules="modules"
      :slides-per-view="4"
      :space-between="50"
      navigation
      @swiper="onSwiper"
      class="pb-15 px-5"
      @slideChange="onSlideChange"
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :Autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
      :breakpoints="breakpoints"
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <v-card elevation="0">
          <v-hover v-slot="{ isHovering, props }">
            <div
              class="img-parent position-relative"
              style="height: 200px; overflow: hidden"
            >
              <img
                :src="
                  showenItem[item.title]
                    ? showenItem[item.title]
                    : item.thumbnail
                "
                alt=""
                class="w-100"
                :style="`height: 100%; transition: 0.5s all ease-in-out; scale: ${
                  isHovering ? 1.05 : 1
                }; cursor: pointer;`"
                v-bind="props"
              />
              <v-btn
                density="compact"
                width="60"
                height="30"
                variant="outlined"
                class="bg-white quick-view-btn"
                style="
                  text-transform: none;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  border-radius: 30px;
                  font-size: 12px;
                  transition: 0.2 all ease-in-out;
                  opacity: 0;
                "
                @click="openQuickView(item)"
                >Quick View</v-btn
              >
            </div>
          </v-hover>
          <v-card-text class="pl-0 pb-1">
            {{
              `(${item.title}) ${item.description}`.length <= 57
                ? `(${item.title}) ${item.description}`
                : `(${item.title}) ${item.description}`.substring(0, 57) + "..."
            }}
          </v-card-text>
          <v-rating
            v-model="item.rating"
            half-increments
            readonly
            color="yellow-darken-2"
            size="x-small"
            density="cobact"
          ></v-rating>
          <v-card-text class="pl-0 pt-0">
            <del>${{ item.price }}</del> From
            <span class="text-red" style="font-weight: 900; font-size: 16px"
              >${{
                Math.ceil(
                  item.price - item.price * (item.discountPercentage / 100)
                )
              }}</span
            ></v-card-text
          >
          <v-btn-toggle v-model="showenItem[item.title]" mandatory>
            <v-btn
              v-for="(pic, i) in item.images"
              :value="pic"
              :key="i"
              size="x-small"
              rounded="xl"
              ><img
                :src="pic"
                alt=""
                width="30"
                height="30"
                style="
                  border-radius: 50%;
                  border: 1px solid rgb(180, 174, 174);
                "
            /></v-btn>
          </v-btn-toggle>
          <div class="mt-5">
            <v-btn
              density="combact"
              class="py-2 px-9"
              style="text-transform: none; border-radius: 30px"
              variant="outlined"
              @click="
                $router.push({
                  name: 'product_details',
                  params: { productId: item.id },
                })
              "
              >Choose Options</v-btn
            >
          </div>
        </v-card>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { productsModule } from "@/stores/Products";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { mapState } from "pinia";

export default {
  inject: ["Emitter"],
  methods: {
    openQuickView(product) {
      this.Emitter.emit("openQuickView", product);
    },
  },
  computed: {
    ...mapState(productsModule, ["categories"]),
  },
  props: {
    products: {
      type: Array,
    },
    title: {
      type: String,
    },
    titleColor: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  data: () => ({
    showenItem: {},
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      580: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      990: {
        slidesPerView: 4,
      },
    },
  }),
  components: {
    Swiper,
    SwiperSlide,
    VSkeletonLoader,
  },
};
</script>

<style lang="scss">
.products-swiper {
  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid rgb(95, 91, 91);
    background-color: white;
    top: 50%;
    &::after {
      font-size: 15px;
      font-weight: 900;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
@media (max-width: 580px) {
  .products-swiper {
    .img-parent {
      height: 300px !important;
    }
    .swiper-button-next,
    .swiper-button-prev {
      top: 53%;
    }
  }
}
</style>
