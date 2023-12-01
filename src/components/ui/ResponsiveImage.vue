<template>
  <img
    v-if="props.name"
    :src="getImageUrl(props.name)"
    :srcset="getImageSet(props.name)"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{ name?: string }>();

function getImageUrl(name:string) {
  return new URL(`../../../public/img/${name}.png`, import.meta.url).href
}

function getImageSet(name:string) {
  return `${getImageUrl(name)} 1x, ${getImageUrl(`${name}@2x`)} 2x`;
}
</script>