<template>
  <LocationProvider>
    <OrientationProvider>
      <MapView />
      <router-view v-slot="{ Component, route }">
        <transition name="drawer">
          <component :is="Component" :key="route.path" class="drawer" />
        </transition>
      </router-view>
    </OrientationProvider>
  </LocationProvider>
</template>

<script lang="ts" setup>
import LocationProvider from "./components/sensors/LocationProvider.vue";
import OrientationProvider from "./components/sensors/OrientationProvider.vue";
import MapView from "./components/Map.vue";
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
} 
.drawer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.drawer-enter-active {
  transition: transform 600ms;
  transition-timing-function: ease-out;
  transform: translateY(calc(100% - 230px));
}
.drawer-leave-active {
  transition: transform 600ms;
  transition-timing-function: ease-in;
  transform: translateY(0);
}
.drawer-enter-to {
  transform: translateY(0);
}
.drawer-leave-to {
  transform: translateY(calc(100% - 230px));
}
</style>
