import { createRouter, createWebHistory } from "vue-router";
import DirectionView from "../views/DirectionView.vue";
import MapView from "../views/MapView.vue";

const routes = [
  {
    path: "/",
    name: "direction",
    component: DirectionView,
    meta: { transition: "right" },
  },
  {
    path: "/map",
    name: "map",
    component: MapView,
    meta: { transition: "left" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
