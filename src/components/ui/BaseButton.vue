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
      class="base-button"
      :class="`base-button--${variant}`"
  >
    <slot/>
  </button>
</template>