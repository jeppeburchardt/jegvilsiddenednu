<template>
  <div class="map">
    <GoogleMap ref="gMapRef" :api-key="GOOGLE_MAPS_API_KEY" class="map" :zoom="17" :zoomControl="false" :street-view-control="false" :map-type-control="false" :fullscreen-control="false">
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
          fillColor: '#4994A5',
          fillOpacity: 0.16,
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
      <CustomMarker :options="{ position: locationGmap, anchorPoint: 'CENTER' }">
        <ResponsiveImage name="you-are-here" />
      </CustomMarker>
      <CustomControl position="BOTTOM_LEFT">
        
      </CustomControl>
    </GoogleMap>
    <nav class="map-nav">
      <div>
        <div>Bænke inden for {{ SEARCH_RADIUS }} m</div>
        <div class="strong">{{ amount }}</div>
      </div>
      <router-link to="/">
          <ResponsiveImage name="nav-dir" />
        </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store";
import { LocationKey } from "../types";
import { computed, inject, ref, watchEffect } from "vue";
import { GOOGLE_MAPS_API_KEY, SEARCH_RADIUS } from "../constants";
import { GoogleMap, Circle, CustomMarker, CustomControl } from "vue3-google-map";
import ResponsiveImage from "../components/ui/ResponsiveImage.vue";

const store = useStore();
const location = inject(LocationKey);
const gMapRef = ref<InstanceType<typeof GoogleMap>>();
const isInitialPositionSet = ref(false)

const nearbyBenches = computed(() => store.state.nearbyBenches);
const targetBench = computed(() => store.getters.targetBench);
const amount = computed(() => store.getters.amountOfNearbyBenches);
// const total = computed(() => store.getters.totalBenches.toLocaleString('da-DK'));

const locationGmap = computed(() => ({
  lat: location?.value?.position.latitude || 0,
  lng: location?.value?.position.longitude || 0,
}));

function isTargetBench(bench: [number, number]) {
  if (!targetBench.value) return false;
  return bench[0] === targetBench.value[0] && bench[1] === targetBench.value[1];
}

watchEffect(() => {
  if (gMapRef.value?.ready && locationGmap.value && !isInitialPositionSet.value) {
    gMapRef.value.map.panTo(locationGmap.value);
    isInitialPositionSet.value = true;
  }
});
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
p.footer {
  text-align: center;
  font-size: 12px;
}
.map-nav {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
  padding: 24px 24px 48px 24px;
  
  font-weight: 600;

  .strong {
    font-size: 40px;
    font-weight: 600;
  }
}
</style>
