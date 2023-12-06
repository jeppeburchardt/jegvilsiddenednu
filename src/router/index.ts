import { createRouter, createWebHistory } from "vue-router";
import DirectionView from "../views/DirectionView.vue";

const routes = [
  {
    path: "/dir",
    name: "direction",
    component: DirectionView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
