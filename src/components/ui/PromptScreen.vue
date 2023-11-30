<template>
  <div>
    <!-- initial -->
    <div class="prompt" v-if="state === 'initial'">
      <p class="text">{{ headline }}</p>
      <PushButton @click="$emit('click')" :text="button" />
      <p class="description">{{ description }}</p>
    </div>

    <!-- loading -->
    <LoadingIndicator v-if="state === 'loading'" />

    <!-- error -->
    <div v-if="state === 'error'">
      <p>Der skete en fejl: {{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PushButton from "./PushButton.vue";
import LoadingIndicator from "./LoadingIndicator.vue";
export type PromptScreenState = "initial" | "loading" | "error" | "ok";

defineProps<{
  headline: string;
  description: string;
  state: PromptScreenState;
  error?: string;
  button: string;
}>();
</script>

<style lang="scss" scoped>
.prompt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  max-width: 400px;
  margin: auto;

  p {
    margin: 0;
    padding: 20px 0;
  }

  .text {
    font-size: 28px;
  }

  .description {
    font-size: 14px;
    font-style: italic;
    padding-top: 40px;
  }
}
</style>
