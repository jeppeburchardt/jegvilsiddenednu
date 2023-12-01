import { ActionContext, ActionTree } from "vuex";
import { MutationTypes, Mutations } from "./mutations";
import { Location, State } from "../types";
import { getDistance } from "geolib";
import { findNearbyLocations } from "../utils";

export enum ActionTypes {
  UPDATE_DEVICE_LOCATION = "updateDeviceLocation",
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.UPDATE_DEVICE_LOCATION](
    { commit }: AugmentedActionContext,
    payload: Location
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.UPDATE_DEVICE_LOCATION](
    { commit, state },
    location: Location
  ) {
    const { deviceLocation } = state;

    const distance = deviceLocation
      ? getDistance(
          { latitude: deviceLocation[0], longitude: deviceLocation[1] },
          { latitude: location[0], longitude: location[1] }
        )
      : Number.MAX_VALUE;

    if (distance > 5) {
      // 5 meters
      commit(MutationTypes.RESET_SEARCH);
      commit(MutationTypes.SET_DEVICE_LOCATION, location);
      const { closest, nearby } = await findNearbyLocations(
        location,
        state.benches
      );
      commit(MutationTypes.SET_TARGET_BENCH, closest);
      commit(MutationTypes.SET_NEARBY_BENCHES, nearby);
    }
  },
};
