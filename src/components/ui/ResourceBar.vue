<script setup lang="ts">

defineProps<{
  label: string,
  value: number,
  max: number,
  variant: 'hp' | 'mp'
}>();
</script>

<template>
  <div class="space-y-1">
    <div class="flex items-center justify-between text-sm">
      <span class="font-medium text-slate-700 dark:text-slate-200">{{ label }}</span>
      <span class="text-slate-600 dark:text-slate-300">{{ value }}/{{ max }}</span>
    </div>

    <div class="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div
          :class="[
          'h-full transition-all duration-300',
          variant === 'hp' && 'bg-red-500',
          variant === 'mp' && 'bg-blue-500'
        ]"
          :style="{ width: ((max > 0 ? value / max : 0) * 100) + '%' }"
      />
    </div>
  </div>
</template>