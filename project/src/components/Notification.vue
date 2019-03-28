<template>
  <div class="notification" :class="layout">
    <h1>{{notification.title}}</h1>
    <p>{{notification.message}}</p>
  </div>
</template>

<script>
export default {
  props: ["notification", "layout"],
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.notification {

}

.standalone {

}

.horizontal-compact {
  text-align: center;

  h1, p {
    display: inline-block;
  }
}
</style>
