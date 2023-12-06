<template>
    <!-- initial -->
    <div class="prompt" v-if="state === 'initial'">
      <div class="mood" :style="{ backgroundImage: `url(${getMoodIamge()}` }" />
      <div class="grid">
        <h2>{{ headline }}</h2>
        <p>{{ description }}</p>
        <PushButton @click="$emit('onAccept')" :text="button" class="push-button" />
      </div>
    </div>

    <!-- loading -->
    <div class="loading-container"> 
      <LoadingIndicator v-if="state === 'loading'" />
    </div>

    <!-- error -->
    <!-- todo: find sad mood image -->
    <!-- todo: retry -->
    <div class="prompt" v-if="state === 'error'">
      <div class="mood" :style="{ backgroundImage: `url(${getMoodIamge()}` }" /> 
      <div class="grid">
        <h2>{{ headline }}</h2>
        <p>Der skete desværre en fejl. Har du husket HTTPS?</p>
        <pre>{{ error }}</pre>
      </div>
    </div>
</template>

<script lang="ts" setup>
import PushButton from "./PushButton.vue";
import LoadingIndicator from "./LoadingIndicator.vue";
export type PromptScreenState = "initial" | "loading" | "error" | "ok";

function getMoodIamge() {
  return new URL(`../../../public/img/mood.jpg`, import.meta.url).href
}

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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
}
.mood {
  flex: 1 2 auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 400ms;

  background-color: #003737;
}

.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  margin: 24px 24px 48px 24px;
}
h2 {
  grid-column: 1 / all;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}
p {
  grid-column: 1 / all;
  font-size: 14px;
  margin: 0;
}
.push-button {
  grid-column: 1 / all;
}
</style>
