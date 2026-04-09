<script setup lang="ts">
import {useBattleStore} from "../stores/battle";
import BasePanel from "../components/ui/BasePanel.vue";
import {computed, onMounted} from "vue";
import ResourceBar from "../components/ui/ResourceBar.vue";
import StatusMessage from "../components/ui/StatusMessage.vue";
import BaseButton from "../components/ui/BaseButton.vue";

const battleStore = useBattleStore();

onMounted(() => {
  battleStore.init();
})

const isPlayerTurn = computed(() => battleStore.battleState === 'PlayerTurn');
</script>

<template>
  <BasePanel title="Battle Field">
    <div v-if="!battleStore.battleResult">
      <p>{{ battleStore.battleState }}</p>
      <table>
        <thead>
        <tr>
          <th>{{ battleStore.playerStore.player.name }}</th>
          <th>{{ battleStore.boss.unit.name }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>
            <ResourceBar label="HP" :value="battleStore.playerStore.player.hp" :max="battleStore.playerStore.maxHp"
                         variant="hp"/>
            <ResourceBar label="MP" :value="battleStore.playerStore.player.mp" :max="battleStore.playerStore.maxMp"
                         variant="mp"/>
          </th>
          <th>
            <ResourceBar label="HP" :value="battleStore.boss.unit.hp" :max="battleStore.boss.maxHp" variant="hp"/>
            <ResourceBar label="MP" :value="battleStore.boss.unit.mp" :max="battleStore.boss.maxMp" variant="mp"/>
          </th>
        </tr>
        </tbody>
      </table>

      <BaseButton v-if="isPlayerTurn" @click="battleStore.playerAction('Attack')">Attack</BaseButton>
      <BaseButton v-if="isPlayerTurn" @click="battleStore.playerAction('RestoreHeal')">Heal HP</BaseButton>
      <BaseButton v-if="isPlayerTurn" @click="battleStore.playerAction('RestoreMana')">Heal Mana</BaseButton>
      <BaseButton v-if="isPlayerTurn" @click="battleStore.playerAction('Rest')">Rest</BaseButton>
    </div>

    <div v-if="battleStore.battleResult">
      <h1 v-if="battleStore.battleResult">{{ battleStore.battleResult }}</h1>
      <StatusMessage :message="battleStore.battleMessage" type="success"/>
      <BaseButton @click="battleStore.init">Restart</BaseButton>
    </div>
  </BasePanel>
</template>