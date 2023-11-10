<template>
  <button @click="$emit('click')">{{ text }}</button>
</template>

<script lang="ts" setup>
defineProps({
  text: String,
});
</script>

<style lang="scss" scoped>
button {
  color: #2c3e50;
  background-color: #f7f4e1;

  padding: 10px 0;
  font-size: 18px;

  border: 0;
  border-radius: 4px;

  width: 100%;
}
</style>
