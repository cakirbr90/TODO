<script setup lang="ts">
defineProps<{ label: string; disabled?: boolean }>();
defineEmits<{ click: [event: MouseEvent] }>();
</script>

<template>
  <button type="button" class="base-button" :disabled="disabled" @click="$emit('click', $event)">
    {{ label }}
  </button>
</template>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  border: 1px solid #1d4ed8;
  border-radius: 0.375rem;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
}

.base-button:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
