import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";
import { Fragment } from "vue-fragment";
import LocationProvider from "./components/LocationProvider.vue";
import OrientationProvider from "./components/OrientationProvider.vue";
import PromptScreenVue from "./components/ui/PromptScreen.vue";
// import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.component("location-provider", LocationProvider);
Vue.component("orientation-provider", OrientationProvider);
Vue.component("prompt-screen", PromptScreenVue);
Vue.component("vue-fragment", Fragment);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyBpQeu9S2WdphfxS_2rzKtdsfI00NCNOQc",
//   },
// });
