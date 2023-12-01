<template>
  <GoogleMap ref="gMapRef" :api-key="GOOGLE_MAPS_API_KEY" :center="locationGmap" class="map" :zoom="17">
    <Circle
      :options="{
        radius: SEARCH_RADIUS,
        center: locationGmap,
        fillOpacity: 0,
        strokeColor: '#00C2FF',
        strokeOpacity: 0.2,
        strokeWidth: 1,
      }"
    />
    <Circle
      v-if="!!location"
      :options="{
        radius: location.accuracy,
        center: locationGmap,
        fillColor: '#00C2FF',
        fillOpacity: 0.2,
        strokeOpacity: 0,
      }"
    />
    <CustomMarker
      v-for="bench in nearbyBenches"
      :options="{
        position: { lat: bench[0], lng: bench[1] },
        zIndex: isTargetBench(bench) ? 1 : 0,
      }"
    >
      <ResponsiveImage name="bench" v-if="!isTargetBench(bench)" />
      <ResponsiveImage name="target-bench" v-if="isTargetBench(bench)" />
    </CustomMarker>
    <CustomMarker :options="{ position: locationGmap, anchorPoint: 'BOTTOM_CENTER' }">
      <ResponsiveImage name="you-are-here" />
    </CustomMarker>
  </GoogleMap>
  
  <p>Viser {{ amount }} (ud af {{ total }}) bænke inden for {{ SEARCH_RADIUS }}m.</p>
</template>

<script setup lang="ts">
import { SEARCH_RADIUS } from "../constants";
import { useStore } from "../store";
import { LocationKey } from "../types";
import { computed, inject } from "vue";
import { GOOGLE_MAPS_API_KEY } from "../constants";
import { GoogleMap, Circle, CustomMarker } from "vue3-google-map";
import ResponsiveImage from "../components/ui/ResponsiveImage.vue";

const store = useStore();
const location = inject(LocationKey);

const nearbyBenches = computed(() => store.state.nearbyBenches);
const targetBench = computed(() => store.getters.targetBench);
const amount = computed(() => store.getters.amountOfNearbyBenches);
const total = computed(() => store.getters.totalBenches.toLocaleString('da-DK'));

const locationGmap = computed(() => ({
  lat: location?.value?.position.latitude || 0,
  lng: location?.value?.position.longitude || 0,
}));

function isTargetBench(bench: [number, number]) {
  if (!targetBench.value) return false;
  return bench[0] === targetBench.value[0] && bench[1] === targetBench.value[1];
}
</script>

<style lang="scss">
.map {
  flex: 1 2 auto;
  display: flex;
  flex-direction: column;
}
.mapdiv {
  flex: 1 2 auto;
}
p {
  text-align: center;
}
</style>
