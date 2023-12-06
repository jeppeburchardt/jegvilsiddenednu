import {
  createStore,
  Store as VuexStore,
  useStore as baseUseStore,
  createLogger,
} from "vuex";
import benchesRawData from "./benches.json";
import { Location, State } from "../types";
import { InjectionKey } from "vue";
import { Mutations, mutations } from "./mutations";
import { Actions, actions } from "./actions";
import { Getters, getters } from "./getters";

type Store = Omit<VuexStore<State>, "commit" | "dispatch" | "getters"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>;
};

const benches = benchesRawData as Location[];

export const key: InjectionKey<VuexStore<State>> = Symbol();

export function useStore() {
  return baseUseStore(key) as Store;
}

export const store = createStore<State>({
  state: {
    benches,
    targetBench: null,
    deviceLocation: null,
    nearbyBenches: [],
    userSelectedBench: null,
  },
  getters,
  mutations,
  actions,
  modules: {},
  plugins: [createLogger()],
});
