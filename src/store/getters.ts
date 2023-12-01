import { GetterTree } from "vuex";
import { State } from "../types";

export type Getters = {
  amountOfNearbyBenches(state: State): number;
  totalBenches(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  amountOfNearbyBenches(state) {
    return state.nearbyBenches.length;
  },
  totalBenches(state) {
    return state.benches.length;
  },
};
