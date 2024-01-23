<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="50%" persistent>
      <v-card class="text-center py-7">
        <div class="text-center">
          <v-icon
            size="75"
            color="green"
            style="
              background: white;
              color: green;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              font-size: 76px;
              border: 1px solid green;
            "
            >mdi-check</v-icon
          >
        </div>
        <v-card-title
          style="font-size: 30px; font-weight: bold; color: rgb(94, 91, 91)"
          >Order Placed Successfuly!</v-card-title
        >
        <v-card-text style="font-size: 17px; color: rgb(141, 139, 139)"
          >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
          laborum atque ad eum obcaecati, ipsa enim doloribus pariatur totam
          quam beatae repudiandae quae magnam nemo voluptatem reiciendis
          laboriosam quibusdam esse.</v-card-text
        >
        <v-card-actions class="mt-5 justify-center">
          <v-btn variant="elevated" color="blue" @click="resetData"
            >Got it!</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { cartStore } from "@/stores/Cart";
import { mapActions } from "pinia";
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    popup: {
      type: Boolean,
    },
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$emit("close_popup");
        }, 200);
      }
    },
  },
  methods: {
    ...mapActions(cartStore, ["resetItems"]),
    resetData() {
      this.resetItems();
      this.dialog = false;
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
    this.dialog = this.popup;
  },
};
</script>
