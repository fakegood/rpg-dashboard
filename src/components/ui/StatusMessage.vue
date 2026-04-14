<script setup lang="ts">
defineProps<{ message: string, type: 'success' | 'warning' | 'error' | '' }>();
</script>

<template>
  <p v-if="message" :class="[
      'my-2 w-fit rounded-lg px-3 py-2 text-sm font-medium',
      type === 'success' && 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      type === 'warning' && 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      type === 'error' && 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
    ]">
    {{ message }}
  </p>
</template>