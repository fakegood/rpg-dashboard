<script setup lang="ts">
withDefaults(defineProps<{
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
}>(), {
  disabled: false,
  variant: 'primary',
  type: 'button'
})
</script>

<template>
  <button
      :type="type"
      :disabled="disabled"
      :class="[
      'rounded-lg px-4 py-2 font-medium transition',
      'disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'primary' && 'bg-slate-900 text-white hover:opacity-90',
      variant === 'secondary' && 'bg-slate-500 text-white hover:opacity-90',
      variant === 'danger' && 'bg-red-700 text-white hover:opacity-90'
    ]"
  >
    <slot/>
  </button>
</template>