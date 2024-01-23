<template>
  <div class="shop-with-us py-14">
    <div class="title">
      <h2 class="text-center"><span>Why Shop</span>With Us?</h2>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" class="mb-4 mb-lg-0">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/free-shipping.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 900"
            >
              Free Shipping on First Order
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </v-card-text>
            <a href="#" style="color: white; font-size: 20px; font-weight: 700"
              >Learn More</a
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="mb-4">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/weekly-flash-sales.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 900"
            >
              Weekly Flash Sale
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </v-card-text>
            <a
              href="#"
              class="mt-10"
              style="color: white; font-size: 20px; font-weight: 700"
              >Learn More</a
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="mb-4">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/discount.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 900"
            >
              Anual Payment Discount
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </v-card-text>
            <a href="#" style="color: white; font-size: 20px; font-weight: 700"
              >Learn More</a
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="mb-4">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <div class="img-parent">
              <img src="@/assets/images/cash-back.png" alt="" />
            </div>
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 900"
            >
              Anual payment Discount
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </v-card-text>
            <a href="#" style="color: white; font-size: 20px; font-weight: 700"
              >Learn More</a
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.shop-with-us {
  background-image: url(../../assets/images/why-shop-with-us-banner.webp);
  background-repeat: no-repeat;
  background-size: cover;
  h2 {
    color: white;
    font-size: 45px;
    font-weight: 900;
    span {
      color: rgb(45 251 223);
    }
  }
}
</style>
