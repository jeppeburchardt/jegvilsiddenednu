import { MutationTree } from "vuex";
import { Location, State } from "../types";

export enum MutationTypes {
  RESET_SEARCH = "resetSearch",
  SET_DEVICE_LOCATION = "setDeviceLocation",
  SET_TARGET_BENCH = "setTargetBench",
  SET_NEARBY_BENCHES = "setNearbyBenches",
  SET_USER_SELECTED_BENCH = "setUserSelectedBench",
}

export type Mutations<S = State> = {
  [MutationTypes.RESET_SEARCH](state: S): void;
  [MutationTypes.SET_DEVICE_LOCATION](state: S, location: Location): void;
  [MutationTypes.SET_TARGET_BENCH](state: S, bench: Location): void;
  [MutationTypes.SET_NEARBY_BENCHES](state: S, benches: Location[]): void;
  [MutationTypes.SET_USER_SELECTED_BENCH](
    state: S,
    bench: Location | null
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.RESET_SEARCH](state: State) {
    state.targetBench = null;
  },
  [MutationTypes.SET_DEVICE_LOCATION](state: State, location: Location) {
    state.deviceLocation = location;
  },
  [MutationTypes.SET_TARGET_BENCH](state: State, bench: Location) {
    state.targetBench = bench;
  },
  [MutationTypes.SET_NEARBY_BENCHES](state: State, benches: Location[]) {
    state.nearbyBenches = benches;
  },
  [MutationTypes.SET_USER_SELECTED_BENCH](
    state: State,
    bench: Location | null
  ) {
    state.userSelectedBench = bench;
  },
};
