<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <section class="flex flex-col gap-4">
    <div class="rounded-2xl border border-slate-200 bg-gray-500 p-5 shadow-sm">
      <h2 v-if="title" class="mb-3 text-2xl font-semibold text-slate-900">{{ title }}</h2>
      <slot></slot>
    </div>
  </section>
</template>