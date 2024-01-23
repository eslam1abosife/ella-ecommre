<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CartDrawer :windowWidth="windowWidth" />
      <MenuDrrawer :windowWidth="windowWidth" />
      <v-main
        :style="`padding-top:${
          $route.name == 'check_out'
            ? '0px'
            : windowWidth <= 990
            ? '60px'
            : '150px'
        }`"
      >
        <slot></slot>
      </v-main>
      <AppNav v-if="$route.name != 'check_out' && windowWidth > 990" />
      <ResponsiveNav v-if="windowWidth <= 990 && $route.name != 'check_out'" />
      <FixedNav v-if="$route.name != 'check_out' && windowWidth > 990" />
      <AppFooter v-if="$route.name != 'check_out'" />
    </v-layout>
  </div>
</template>

<script>
import AppNav from "./AppNav.vue";
import FixedNav from "./FixedNav.vue";
import AppFooter from "./AppFooter.vue";
import CartDrawer from "./CartDrawer.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import MenuDrrawer from "./MenuDrrawer.vue";

export default {
  data: () => ({
    drawer: false,
    windowWidth: 0,
  }),
  components: {
    AppNav,
    AppFooter,
    CartDrawer,
    FixedNav,
    ResponsiveNav,
    MenuDrrawer,
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
};
</script>
