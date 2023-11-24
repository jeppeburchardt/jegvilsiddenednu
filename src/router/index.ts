import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import DirectionView from "../views/DirectionView.vue";
import MapView from "../views/MapView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "direction",
    component: DirectionView,
  },
  {
    path: "/map",
    name: "map",
    component: MapView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes,
});

export default router;
