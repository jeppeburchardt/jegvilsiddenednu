<template>
  <GoogleMap ref="gMapRef" :api-key="GOOGLE_MAPS_API_KEY" :center="locationGmap" class="map" :zoom="17">
    <Circle
      :options="{
        radius: SEARCH_RADIUS,
        center: locationGmap,
        fillOpacity: 0,
        strokeColor: '#00f',
        strokeOpacity: 0.1,
        strokeWidth: 1,
      }"
    />
    <Circle
      v-if="!!location"
      :options="{
        radius: location.accuracy,
        center: locationGmap,
        fillColor: '#f00',
        fillOpacity: 0.1,
        strokeColor: '#f00',
        strokeOpacity: 0.1,
        strokeWidth: 1,
      }"
    />
    <Marker
      v-for="(bench) in nearbyBenches"
      :options="{
        label: 'B',
        title: 'Bænk',
        position: { lat: bench[0], lng: bench[1] },
      }"
    />
    <Marker :options="{ position: locationGmap }" />
  </GoogleMap>
  
  <p>Viser {{ amount }} bænke inden for {{ SEARCH_RADIUS }}m.</p>
</template>

<script setup lang="ts">
import { SEARCH_RADIUS } from "../constants";
import { useStore } from "../store";
import { LocationKey } from "../types";
import { computed, inject } from "vue";
import { GOOGLE_MAPS_API_KEY } from "../constants";
import { GoogleMap, Marker, Circle } from "vue3-google-map";

const store = useStore();
const location = inject(LocationKey);

const nearbyBenches = computed(() => store.getters.nearbyBenches);
// const targetBench = computed(() => store.getters.targetBench);
const amount = computed(() => store.getters.amountOfNearbyBenches);

const locationGmap = computed(() => ({
  lat: location?.value?.position.latitude || 0,
  lng: location?.value?.position.longitude || 0,
}));
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
