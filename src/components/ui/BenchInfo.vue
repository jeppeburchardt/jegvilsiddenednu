<template>
  <div class="info">
    <div>
      <div><span class="big">{{ distance }}</span> M (+/-{{accuracy}} M)</div>
    </div>
    <div class="end">
      <div>{{ total }} kendte bænke i danmark</div>
      <div>{{ amount }} bænke inden for {{ SEARCH_RADIUS}} M</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { getDistance } from "geolib";
import { useStore } from "../../store";
import { LocationKey } from "../../types";
import { SEARCH_RADIUS } from "../../constants";

const store = useStore();
const location = inject(LocationKey);
const amount = computed(() => store.getters.amountOfNearbyBenches);
const total = computed(() => store.getters.totalBenches.toLocaleString('da-DK'));
const deviceLocation = computed(() => store.getters.deviceLocation);
const targetBench = computed(() => store.getters.targetBench);
const distance = computed(() => {
  if (!deviceLocation.value || !targetBench.value) return 0;

  return getDistance(
    makeLatLng(deviceLocation.value),
    makeLatLng(targetBench.value)
  );
});
const accuracy = computed(() => {
  return Math.round(location?.value?.accuracy || 0);
});

function makeLatLng(value:[number, number]) {
  return { latitude: value[0], longitude: value[1] };
}
</script>

<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 12px;
  font-weight: 400;

  margin: 24px 0;
}
.end {
  display: flex;

  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}
.big {
  font-size: 34px;
  font-weight: 600;
}
</style>