<template>
  <slot v-if="uiState === 'ok' || uiState === 'error'" />
  <PromptScreen
    v-else
    headline="Hvor kigger du hen?"
    description="For at vise dig hvilken vej du skal gå skal vi bruge retningen på din enhed"
    button="Find min retning"
    :error="error"
    :state="uiState"
    @onAccept="onGetOrientationClick"
  />
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from "vue";
import { OrientationKey } from "../../types.js";
import PromptScreen, { PromptScreenState } from "../ui/PromptScreen.vue";

const error = ref<string>();
const uiState = ref<PromptScreenState>("initial");
const orientation = ref<number>();
provide(OrientationKey, orientation);

function onDeviceOrientation(e: DeviceOrientationEvent | Event) {
  if (
    "webkitCompassHeading" in e &&
    typeof e.webkitCompassHeading === "number"
  ) {
    orientation.value = e.webkitCompassHeading;
    uiState.value = "ok";
    return;
  }

  if ("alpha" in e && typeof e.alpha === "number") {
    orientation.value = Math.abs(e.alpha - 360);
    uiState.value = "ok";
    return;
  }

  if ("alpha" in e && e.alpha === null) {
    uiState.value = "ok";
  }
}

function onGetOrientationClick() {
  uiState.value = "loading";
  sessionStorage.setItem("previouslyGrantedOrientation", "YES");

  if (
    "requestPermission" in DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission().then((response: string) => {
      if (response === "granted") {
        window.addEventListener("deviceorientation", onDeviceOrientation, true);
        return;
      }

      error.value = response;
      uiState.value = "error";
    });
  } else {
    uiState.value = "error";
    error.value = "DeviceOrientationEvent not supported";
  }
  // experimental:
  // else {
  //   const sensor = new AbsoluteOrientationSensor();
  //   Promise.all([
  //     navigator.permissions.query({ name: "accelerometer" as PermissionName }),
  //     navigator.permissions.query({ name: "magnetometer" as PermissionName }),
  //     navigator.permissions.query({ name: "gyroscope" as PermissionName }),
  //   ]).then((results) => {
  //     if (results.every((result) => result.state === "granted")) {
  //       sensor.addEventListener("reading", () => {
  //         console.log("sensor.quaternion", sensor.quaternion);
  //       });
  //       sensor.addEventListener("error", () => {
  //         uiState.value = "error";
  //         error.value = "Sensor is not available.";
  //       });

  //       uiState.value = "ok";
  //     } else {
  //       console.log("No permissions to use AbsoluteOrientationSensor.");
  //       uiState.value = "error";
  //       error.value = "No permissions to use AbsoluteOrientationSensor.";
  //     }
  //   });
  // }
}

onMounted(() => {
  if (sessionStorage.getItem("previouslyGrantedOrientation") === "YES") {
    onGetOrientationClick();
  }
});
</script>
