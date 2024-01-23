import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// pinia config
import { createPinia } from "pinia";

// Emitter configuration
import mitt from "mitt";
const Emitter = mitt();

// Swiper configuration
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .provide("Emitter", Emitter)
  .use(createPinia())
  .use(router)
  .mount("#app");
