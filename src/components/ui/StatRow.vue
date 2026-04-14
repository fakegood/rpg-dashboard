<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>

<template>
  <div class="flex items-center justify-between gap-4 border-b border-slate-200 py-2 dark:border-slate-700">
    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ label }}</span>
    <span class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ value }}</span>
  </div>
</template>