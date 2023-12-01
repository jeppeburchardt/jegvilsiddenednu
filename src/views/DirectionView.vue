<template>
  <div class="home">
    <div class="wrapper">
      <ResponsiveImage
        name="compass"
        class="compass"
        :style="{ transform: `rotate(-${orientation}deg)` }"
      />
      <ResponsiveImage
        name="direction"
        class="direction"
        :style="{ transform: `rotate(-${bearingDegree}deg)` }"
      />
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
import { getDistance } from "geolib";
import ResponsiveImage from "../components/ui/ResponsiveImage.vue";

const store = useStore();
const deviceLocation = computed(() => store.getters.deviceLocation);
const targetBench = computed(() => store.state.targetBench);

const orientation = inject(OrientationKey);
const location = inject(LocationKey);

const distance = computed(() => {
  if (!deviceLocation.value || !targetBench.value) return 0;

  return getDistance(
    makeLatLng(deviceLocation.value),
    makeLatLng(targetBench.value)
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

function makeLatLng(value:[number, number]) {
  return { latitude: value[0], longitude: value[1] };
}


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
.direction {
  position: absolute;
  width: 100%;
  height: 100%;
}
.compass {
  position: absolute;
  width: 100%;
  height: 100%;
}
.wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  margin-bottom: 20px;
}

.distance {
  font-size: 56px;
  margin-top: 16px;
  text-align: center;
}
.distance span {
  font-size: 48px;
  margin-left: 5px;
}

.accuracy {
  font-size: 22px;
  margin-top: 16px;
  text-align: center;
}
</style>
