import { GetterTree } from "vuex";
import { Location, State } from "../types";

export type Getters = {
  amountOfNearbyBenches(state: State): number;
  totalBenches(state: State): number;
  targetBench(state: State): Location | null;
  deviceLocation(state: State): Location | null;
};

export const getters: GetterTree<State, State> & Getters = {
  amountOfNearbyBenches(state) {
    return state.nearbyBenches.length;
  },
  totalBenches(state) {
    return state.benches.length;
  },
  targetBench(state) {
    if (state.userSelectedBench) {
      return state.userSelectedBench;
    }
    return state.targetBench;
  },
  deviceLocation(state) {
    return state.deviceLocation;
  },
};
