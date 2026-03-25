<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Quest} from "../types/game";

const quests = ref<Quest[]>([]);
const isLoading = ref(false);
const loadError = ref('');

async function loadQuests() {
  isLoading.value = true;
  loadError.value = '';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) {
      throw new Error('Failed to fetch quests');
    }

    quests.value = await response.json();
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : 'Unknown error';
  } finally {
    isLoading.value = false;
  }
}

function truncate(value: string, length: number) {
  if (value.length > length) {
    return value.substring(0, length) + "...";
  } else {
    return value;
  }
}

onMounted(() => {
  loadQuests();
});
</script>

<template>
  <button @click="loadQuests">Refresh Quests</button>

  <p v-if="isLoading">Loading Quests...</p>
  <p v-else-if="loadError">{{ loadError }}</p>
  <ol v-else>
    <li v-for="quest in quests" :key="quest.id">
      <strong>{{ quest.title }}</strong>
      <p>{{ truncate(quest.body, 100) }}</p>
    </li>
  </ol>
</template>