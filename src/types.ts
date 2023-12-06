import { InjectionKey, Ref } from "vue";

export type LocationWrapper = {
  position: {
    latitude: number;
    longitude: number;
  };
  accuracy: number;
};

export const LocationKey: InjectionKey<Ref<LocationWrapper | undefined>> =
  Symbol("Location");

export const OrientationKey: InjectionKey<Ref<number | undefined>> =
  Symbol("Orientation");

export type Location = [lat: number, long: number];

export type State = {
  benches: Location[];
  targetBench: Location | null;
  deviceLocation: Location | null;
  nearbyBenches: Location[];
  userSelectedBench: Location | null;
};
