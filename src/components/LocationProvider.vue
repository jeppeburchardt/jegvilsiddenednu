<template>
  <fragment v-if="uiState === 'ok'">
    <slot />
  </fragment>
  <PromptScreen
    v-else
    headline="Hvor er du?"
    description="For at vise dig vej til den nærmeste bænk skal vi bruge din position, klik på knappen for automatisk at finde din position"
    button="Find min position"
    :error="error"
    :state="uiState"
    @click="onGetLocationClick"
  />
</template>

<script lang="ts" setup>
import { onUnmounted, provide, ref } from "vue";
import { LocationKey, LocationWrapper } from "@/types";
import PromptScreen, { PromptScreenState } from "./ui/PromptScreen.vue";
import store from "@/store";

const pollTimerId = ref<number>();
const error = ref<string>();
const uiState = ref<PromptScreenState>("initial");
const location = ref<LocationWrapper>();
provide(LocationKey, location);

function updateLocation(gepPos: GeolocationPosition) {
  console.log("updateLocation", gepPos.coords.accuracy);
  location.value = {
    position: {
      longitude: gepPos.coords.longitude,
      latitude: gepPos.coords.latitude,
    },
    accuracy: gepPos.coords.accuracy,
  };
  store.dispatch("updateDeviceLocation", [
    gepPos.coords.latitude,
    gepPos.coords.longitude,
  ]);
  uiState.value = "ok";
}

function failed(e: GeolocationPositionError) {
  uiState.value = "error";
  error.value = e.message;
}

function onGetLocationClick() {
  navigator.permissions
    .query({ name: "geolocation" })
    .then((status: PermissionStatus) => {
      if (status.state === "granted" || status.state === "prompt") {
        const poll = () => {
          navigator.geolocation.getCurrentPosition(updateLocation, failed, {
            enableHighAccuracy: true,
          });
        };

        pollTimerId.value = setInterval(poll, 5000);
        return poll();
      }
      uiState.value = "error";
      error.value = status.state;
    });

  uiState.value = "loading";
}

onUnmounted(() => {
  if (pollTimerId.value) {
    navigator.geolocation.clearWatch(pollTimerId.value);
  }
  clearTimeout(pollTimerId.value);
});
</script>
