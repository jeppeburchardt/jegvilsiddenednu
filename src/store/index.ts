import Vue from "vue";
import Vuex from "vuex";
import benchesRawData from "./benches.json";
import { Location, Store } from "@/types";
import { findNearbyLocations } from "@/utils";
import { getDistance } from "geolib";

Vue.use(Vuex);

const benches = benchesRawData as Location[];

export default new Vuex.Store<Store>({
  state: {
    benches,
    targetBench: null,
    deviceLocation: null,
    nearbyBenches: [],
    progress: 0,
  },
  getters: {
    targetBench(state) {
      return state.targetBench;
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
      state.targetBench = null;
    },
    setDeviceLocation(state, location: Location) {
      state.deviceLocation = location;
    },
    setTargetBench(state, bench: Location) {
      state.targetBench = bench;
    },
    setNearbyBenches(state, benches: Location[]) {
      state.nearbyBenches = benches;
    },
  },
  actions: {
    async updateDeviceLocation(context, location: Location) {
      const { deviceLocation } = context.state;

      const distance = deviceLocation
        ? getDistance(
            { latitude: deviceLocation[0], longitude: deviceLocation[1] },
            { latitude: location[0], longitude: location[1] }
          )
        : Number.MAX_VALUE;

      if (distance > 5) {
        // 5 meters
        context.commit("resetSearch");
        context.commit("setDeviceLocation", location);
        const { closest, nearby } = await findNearbyLocations(
          location,
          context.state.benches
        );
        context.commit("setTargetBench", closest);
        context.commit("setNearbyBenches", nearby);
      }
    },
  },
  modules: {},
});
