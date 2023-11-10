import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import DirectionView from "../views/DirectionView.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/MapView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
