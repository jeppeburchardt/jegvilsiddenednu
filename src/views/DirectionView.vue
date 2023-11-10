<template>
  <div class="home">
    <div class="wrapper">
      <div
        class="arrow"
        :style="{ transform: `rotate(-${bearingDegree}deg)` }"
      ></div>
    </div>
    <div class="distance">{{ distance }}<span>m</span></div>
    <div class="accuracy">{{ accuracy }} meters nøjagtighed</div>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import { bearing } from "@/utils";
import { LocationKey, OrientationKey } from "@/types";
import { computed, inject } from "vue";
import geoDistance from "geo-distance-helper";

const device = store.getters.deviceLocation;
const selected = store.getters.selectedBench;

const distance = computed(() => {
  if (!device || !selected) return 0;

  return Math.floor(
    (geoDistance(
      { lat: device[0], lng: device[0] },
      { lat: selected[0], lng: selected[0] }
    ) as number) * 1000
  );
});

const bearingDegree = computed(() => {
  const b = bearing(device[0], device[1], selected[0], selected[1]);
  return ((orientation?.value ?? 0) - b + 360) % 360;
});

const orientation = inject(OrientationKey);
const location = inject(LocationKey);

const accuracy = computed(() => {
  return Math.round(location?.value.accuracy || 0);
});
</script>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

p {
  margin-bottom: 30px;
}
.arrow {
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-bottom: 112px solid #fff;
}
.wrapper {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.distance {
  font-size: 56px;
  margin-top: 16px;
  text-align: center;

  span {
    font-size: 48px;
    margin-left: 5px;
  }
}

.accuracy {
  font-size: 22px;
  margin-top: 16px;
  text-align: center;
}
</style>
