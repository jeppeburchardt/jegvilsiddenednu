import Vue from "vue";
import Vuex from "vuex";
import benchesRawData from "./benches.json";
import { Location, Store } from "@/types";
import { findClosest } from "@/utils";
import geoDistance from "geo-distance-helper";

Vue.use(Vuex);

const benches = benchesRawData as Location[];

export default new Vuex.Store<Store>({
  state: {
    benches,
    selectedBench: null,
    deviceLocation: null,
    nearbyBenches: [],
    progress: 0,
  },
  getters: {
    selectedBench(state) {
      return state.selectedBench;
    },
    deviceLocation(state) {
      return state.deviceLocation;
    },
    nearbyBenches(state) {
      return state.nearbyBenches;
    },
    amountOfNearbyBenches(state) {
      return state.nearbyBenches.length;
    },
  },
  mutations: {
    resetSearch(state) {
      state.selectedBench = null;
    },
    setDeviceLocation(state, location: Location) {
      state.deviceLocation = location;
    },
    setSelectedBench(state, bench: Location) {
      state.selectedBench = bench;
    },
    setCloseBenches(state, benches: Location[]) {
      state.nearbyBenches = benches;
    },
  },
  actions: {
    async updateDeviceLocation(context, location: Location) {
      const { deviceLocation } = context.state;

      const distance = deviceLocation
        ? (geoDistance(
            { lat: deviceLocation[0], lng: deviceLocation[1] },
            { lat: location[0], lng: location[1] }
          ) as number)
        : Number.MAX_VALUE;

      if (distance > 0.005) {
        // 5 meters
        context.commit("resetSearch");
        context.commit("setDeviceLocation", location);
        const { closest, nearby } = await findClosest(
          location,
          context.state.benches
        );
        context.commit("setSelectedBench", closest);
        context.commit("setCloseBenches", nearby);
      }
    },
  },
  modules: {},
});
