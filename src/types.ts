import { InjectionKey, Ref } from "vue";

export type LocationWrapper = {
  position: {
    latitude: number;
    longitude: number;
  };
  accuracy: number;
};

export const LocationKey: InjectionKey<Ref<LocationWrapper>> =
  Symbol("Location");

export const OrientationKey: InjectionKey<Ref<number>> = Symbol("Orientation");

export type Location = [lat: number, long: number];

export type Store = {
  benches: Location[];
  selectedBench: Location | null;
  deviceLocation: Location | null;
  progress: number;
  nearbyBenches: Location[];
};
