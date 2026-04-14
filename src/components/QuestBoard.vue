<script setup lang="ts">

import {onMounted} from "vue";
import {useQuestStore} from "../stores/quest";
import StatusMessage from "./ui/StatusMessage.vue";
import BaseButton from "./ui/BaseButton.vue";

const questStore = useQuestStore();

function truncate(value: string, length: number) {
  if (value.length > length) {
    return value.substring(0, length) + "...";
  } else {
    return value;
  }
}

onMounted(() => {
  if (questStore.quests.length === 0) {
    questStore.loadQuests();
  }
});
</script>

<template>
  <BaseButton variant="danger" @click="questStore.loadQuests">Refresh Quests</BaseButton>

  <StatusMessage :message="questStore.questMessage" type="success"/>

  <div class="space-y-4">
    <p v-if="questStore.isLoading">Loading Quests...</p>
    <p v-else-if="questStore.loadError">{{ questStore.loadError }}</p>
    <p v-else-if="questStore.quests.length === 0" class="empty-state">
      No quests available.
    </p>
    <ol v-else>
      <li v-for="quest in questStore.quests" :key="quest.id">
        <strong>{{ quest.title }}</strong>
        <p>{{ truncate(quest.body, 100) }}</p>
        <button @click="questStore.completeQuest(quest.id)">Complete Quest</button>
      </li>
    </ol>
  </div>
</template>