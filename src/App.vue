<template>
  <LocationProvider>
    <OrientationProvider>
      <MapView />
      <router-view v-slot="{ Component, route }">
        <transition name="drawer">
          <component :is="Component" :key="route.path" class="route-view" />
        </transition>
      </router-view>
    </OrientationProvider>
  </LocationProvider>
</template>

<script lang="ts" setup>
import LocationProvider from "./components/LocationProvider.vue";
import OrientationProvider from "./components/OrientationProvider.vue";
import MapView from "./views/MapView.vue";
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
} 
.route-view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.drawer-enter-active {
  transition: transform 400ms;
  transition-timing-function: ease-out;
  transform: translateY(100%);
}
.drawer-leave-active {
  transition: transform 400ms;
  transition-timing-function: ease-in;
  transform: translateY(0);
}
.drawer-enter-to {
  transform: translateY(0);
}
.drawer-leave-to {
  transform: translateY(100%);
}


</style>
