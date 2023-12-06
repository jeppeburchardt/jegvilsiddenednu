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
          anchorPoint: isTargetBench(bench) ? 'BOTTOM_CENTER' : 'CENTER',
        }"
        @click="selectBench(bench)"
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
    <div class="map-nav">
      <BenchInfo />
      <nav>
        <a href="#" @click="panToMe()">
          <ResponsiveImage name="nav-loc" />
        </a>
        <a href="#" @click="selectClosest()">
          <ResponsiveImage name="nav-closest" />
        </a>
        <span class="spacer" />
        <router-link to="/dir">
          <ResponsiveImage name="nav-up" />
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { LocationKey } from "../types";
import { computed, inject, ref, watchEffect } from "vue";
import { GOOGLE_MAPS_API_KEY, SEARCH_RADIUS } from "../constants";
import { GoogleMap, Circle, CustomMarker, CustomControl } from "vue3-google-map";
import ResponsiveImage from "../components/ui/ResponsiveImage.vue";
import BenchInfo from "../components/ui/BenchInfo.vue";

const store = useStore();
const location = inject(LocationKey);
const gMapRef = ref<InstanceType<typeof GoogleMap>>();
const isInitialPositionSet = ref(false)

const nearbyBenches = computed(() => store.state.nearbyBenches);
const targetBench = computed(() => store.getters.targetBench);

const locationGmap = computed(() => ({
  lat: location?.value?.position.latitude || 0,
  lng: location?.value?.position.longitude || 0,
}));

function isTargetBench(bench: [number, number]) {
  if (!targetBench.value) return false;
  return bench[0] === targetBench.value[0] && bench[1] === targetBench.value[1];
}

function selectBench(bench: [number, number]) {
  store.dispatch(ActionTypes.SELECT_BENCH, bench);
  if (gMapRef.value?.ready) {
    gMapRef.value.map.panTo({ lat: bench[0], lng: bench[1] });
  }
}

function panToMe() {
  if (gMapRef.value?.ready) {
    gMapRef.value.map.panTo(locationGmap.value);
  }
}

async function selectClosest() {
  await store.dispatch(ActionTypes.SELECT_CLOSEST_BENCH);
  const bench = store.getters.targetBench;
  if (!bench) return;
  if (gMapRef.value?.ready) {
    gMapRef.value.map.panTo({ lat: bench[0], lng: bench[1] });
  }
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

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.7) 100%);
  padding: 0 24px 24px 24px;
  font-weight: 600;
  
  pointer-events: none;

  nav {
    display: flex;
    justify-content: flex-start;
    gap: 24px;

    .spacer {
      flex: 1 2 auto;
    }
  }

  a, button {
    pointer-events: all;
  } 

  .strong {
    font-size: 40px;
    font-weight: 600;
  }
}
</style>
