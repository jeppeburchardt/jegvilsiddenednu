<template>
  <button @click="$emit('click')">{{ text }}</button>
</template>

<script lang="ts" setup>
defineProps<{ text: string }>();
</script>

<style lang="scss" scoped>
button {
  color: white;
  background-color: #3FB396;
  border: 0;

  padding: 10px 0;
  border-radius: 20px;

  font-size: 14px;

  transition: opacity 400ms;
}
</style>
