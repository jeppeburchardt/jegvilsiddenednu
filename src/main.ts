import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";
import { Plugin } from "vue-fragment";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(Plugin);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBpQeu9S2WdphfxS_2rzKtdsfI00NCNOQc",
  },
});
