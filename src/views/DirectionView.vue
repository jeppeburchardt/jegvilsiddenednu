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
import { useStore } from "../store";
import { bearing } from "../utils";
import { LocationKey, OrientationKey } from "../types";
import { computed, inject } from "vue";
import { getPreciseDistance } from "geolib";

const store = useStore();
const deviceLocation = computed(() => store.getters.deviceLocation);
const targetBench = computed(() => store.state.targetBench);

const orientation = inject(OrientationKey);
const location = inject(LocationKey);

const distance = computed(() => {
  if (!deviceLocation.value || !targetBench.value) return 0;

  return getPreciseDistance(
    { latitude: deviceLocation.value[0], longitude: deviceLocation.value[1] },
    { latitude: targetBench.value[0], longitude: targetBench.value[1] }
  );
});

const bearingDegree = computed(() => {
  if (!deviceLocation.value || !targetBench.value) return 0;
  
  const b = bearing(deviceLocation.value[0], deviceLocation.value[1], targetBench.value[0], targetBench.value[1]);
  return ((orientation?.value ?? 0) - b + 360) % 360;
});

const accuracy = computed(() => {
  return Math.round(location?.value?.accuracy || 0);
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
