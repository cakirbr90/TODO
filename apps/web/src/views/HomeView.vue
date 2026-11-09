<script setup lang="ts">
import { useCounterStore } from '../stores/counter';
import BaseButton from '../components/BaseButton.vue';

const counter = useCounterStore();
</script>

<template>
  <main class="home">
    <h1>Todo App</h1>
    <p>Clicks: {{ counter.count }}</p>
    <BaseButton label="Increment" @click="counter.increment" />
  </main>
</template>

<style scoped>
.home {
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
