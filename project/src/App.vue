<template>
  <div id="app">
    <WindowControls support="https://example.com"></WindowControls>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <div id="notifications">
      <Notification
        v-for="(notification, index) in notifications"
        :key="`notification-${index}`"
        notification="notification"
        layout="horizontal-compact"
      ></Notification>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: white;
  margin: 0px;
  overflow: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#notifications {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
}
</style>

<script>
import WindowControls from "@/components/WindowControls.vue";
import Notification from "@/components/Notification.vue";

import { connect } from "@/services/event-bus.js";

export default {
  components: {
    WindowControls,
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
