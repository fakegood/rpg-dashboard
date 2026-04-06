<script setup lang="ts">

defineProps<{
  label: string,
  value: number,
  max: number,
  variant: 'hp' | 'mp'
}>();
</script>

<template>
  <p>{{ label }}: {{ value }}/{{ max }}</p>
  <div class="bar-container">
    <div
        class="bar"
        :class="variant"
        :style="{ width: (max > 0 ? (value / max * 100) : 0) + '%' }"
    />
  </div>
</template>