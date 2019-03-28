<template>
  <div id="app">
    <div class="notifications">
      <Notification
        :notification="notification"
        layout="standalone"
        v-for="(notification, index) in notifications"
        :key="`notification-${index}`"
      ></Notification>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.noitifications {
  display: flex;
  flex-direction: column;
}
.notification {
  margin-bottom: 8px;
}
</style>

<script>
import Notification from "./components/Notification.vue";
import { connect } from "./services/event-bus.js";

export default {
  components: {
    Notification
  },
  data: () => {
    return {
      notifications: []
    };
  },
  methods: {
    showNotification: function(notification) {
      window.lastNotification = notification;
      this.$data.notifications.push(notification);
      // remove it in a few seconds
    }
  },
  created: async function() {
    const bus = await connect();
    bus.on("notification", this.showNotification);
  }
};
</script>
