<template>
  <Fragment>
    <GmapMap
      ref="gMapRef"
      :center="locationGmap"
      :zoom="17"
      class="map"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in nearbyBenches"
        :position="{
          lat: m[0],
          lng: m[1],
        }"
        :clickable="false"
        :draggable="false"
      />
      <GmapCircle
        v-if="!!location"
        key="rangeCircle"
        :options="{
          fillOpacity: 0,
          strokeColor: '#00f',
          strokeOpacity: 0.1,
          strokeWidth: 1,
        }"
        :visible="true"
        :radius="1000"
        :center="locationGmap"
      />
      <GmapCircle
        v-if="!!location"
        key="deviceAccuracy"
        :options="{
          fillColor: '#f00',
          fillOpacity: 0.1,
          strokeColor: '#f00',
          strokeOpacity: 0.1,
          strokeWidth: 1,
        }"
        :visible="true"
        :radius="location.accuracy"
        :center="locationGmap"
      />
      <GmapMarker v-if="!!location" key="device" :position="locationGmap" />
    </GmapMap>
    <p>Viser {{ amount }} bænke inden for 1km.</p>
  </Fragment>
</template>

<script setup lang="ts">
import store from "@/store";
import { LocationKey } from "@/types";
import { computed, inject, onMounted } from "vue";
import { Fragment } from "vue-fragment";
const location = inject(LocationKey);
const nearbyBenches = computed(() => store.getters.nearbyBenches);
const amount = computed(() => store.getters.amountOfNearbyBenches);
const locationGmap = computed(() => ({
  lat: location?.value.position.latitude || 0,
  lng: location?.value.position.longitude || 0,
}));

onMounted(() => {
  this.$refs.gMapRef.$mapPromise.then((map) => {
    map.panTo(locationGmap.value);
  });
});
</script>

<style scoped lang="scss">
.map {
  flex: 1 2 auto;
}
p {
  text-align: center;
}
</style>
