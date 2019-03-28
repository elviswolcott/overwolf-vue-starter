<template>
  <div class="notification" :class="layout" @click="onClick">
    <h1>{{ notification.title }}</h1>
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { restore } from "../services/ow-async.js";

export default {
  props: ["notification", "layout"],
  methods: {
    onClick: function() {
      if (this.$props.notification.custom !== undefined) {
        this.$props.notification.custom();
      } else {
        restore("main");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  background-color: white;
}

.standalone {
}

.horizontal-compact {
  text-align: center;

  h1,
  p {
    display: inline-block;
  }
}
</style>
