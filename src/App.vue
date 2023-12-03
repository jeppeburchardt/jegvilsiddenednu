<template>
  <LocationProvider>
    <OrientationProvider>
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition as string">
          <component :is="Component" :key="route.path" class="route-view" />
        </transition>
      </router-view>
    </OrientationProvider>
  </LocationProvider>
</template>

<script lang="ts" setup>
import LocationProvider from "./components/LocationProvider.vue";
import OrientationProvider from "./components/OrientationProvider.vue";
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

.left-enter-active {
  transition: opacity 400ms, transform 400ms;
  opacity: .6;
  transform: translateX(100%);
}
.left-leave-active {
  transition: opacity 400ms, transform 400ms;
  opacity: 1;
  transform: translateX(0);
}
.left-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.left-leave-to {
  opacity: .6;
  transform: translateX(-100%);
}

.right-enter-active {
  transition: opacity 400ms, transform 400ms;
  opacity: .6;
  transform: translateX(-100%);
}
.right-leave-active {
  transition: opacity 400ms, transform 400ms;
  opacity: 1;
  transform: translateX(0);
}
.right-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.right-leave-to {
  opacity: .6;
  transform: translateX(100%);
}

</style>
