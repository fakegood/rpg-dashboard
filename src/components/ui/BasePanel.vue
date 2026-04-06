<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <section class="page">
    <div class="panel">
      <h2 v-if="title">{{ title }}</h2>
      <slot></slot>
    </div>
  </section>
</template>