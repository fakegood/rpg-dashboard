<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>

<template>
  <div class="stat-row">
    <span class="stat-row__label">{{ label }}</span>
    <span class="stat-row__value">{{ value }}</span>
  </div>
</template>