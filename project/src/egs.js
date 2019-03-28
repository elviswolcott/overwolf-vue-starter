import Vue from "vue";
import App from "./EGS.vue";

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");

overwolf.egs.setHeight(400, console.log);
