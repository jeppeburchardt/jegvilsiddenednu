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
    <div class="dir-nav">
      <nav>
        <router-link to="/">
          <ResponsiveImage name="nav-down" />
        </router-link>
      </nav>
      <BenchInfo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "../store";
import { bearing } from "../utils";
import { OrientationKey } from "../types";
import { computed, inject } from "vue";
import ResponsiveImage from "../components/ui/ResponsiveImage.vue";
import BenchInfo from "../components/ui/BenchInfo.vue";

const store = useStore();
const deviceLocation = computed(() => store.getters.deviceLocation);
const targetBench = computed(() => store.getters.targetBench);
const orientation = inject(OrientationKey);

const bearingDegree = computed(() => {
  if (!deviceLocation.value || !targetBench.value) return 0;
  
  const b = bearing(deviceLocation.value[0], deviceLocation.value[1], targetBench.value[0], targetBench.value[1]);
  return ((orientation?.value ?? 0) - b + 360) % 360;
});



</script>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(10px);
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
  width: 210px;
  height: 210px;
}

.dir-nav {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  padding: 24px;

  nav {
    text-align: right;
  }
}
</style>
