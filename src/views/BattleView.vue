<script setup lang="ts">
import {useBattleStore} from "../stores/battle";
import BasePanel from "../components/ui/BasePanel.vue";
import {computed, onMounted} from "vue";
import ResourceBar from "../components/ui/ResourceBar.vue";

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
          </th>
          <th>
            <ResourceBar label="HP" :value="battleStore.boss.unit.hp" :max="battleStore.boss.maxHp" variant="hp"/>
          </th>
        </tr>
        </tbody>
      </table>

      <button v-if="isPlayerTurn" @click="battleStore.playerAction('Attack')">Attack</button>
      <button v-if="isPlayerTurn" @click="battleStore.playerAction('RestoreHeal')">Heal HP</button>
      <button v-if="isPlayerTurn" @click="battleStore.playerAction('RestoreMana')">Heal Mana</button>
      <button v-if="isPlayerTurn" @click="battleStore.playerAction('Run')">Escape</button>
    </div>

    <div v-if="battleStore.battleResult">
      <h1 v-if="battleStore.battleResult">{{ battleStore.battleResult }}</h1>
      <button @click="battleStore.init">Restart</button>
    </div>
  </BasePanel>
</template>