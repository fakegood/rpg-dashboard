<script setup lang="ts">
defineProps<{ message: string, type: 'success' | 'warning' | 'error' | '' }>();
</script>

<template>
  <p v-if="message" :class="`status-${type}`">
    {{ message }}
  </p>
</template>