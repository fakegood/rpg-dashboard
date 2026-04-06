<script setup lang="ts">

import CreatePlayerForm from "../components/CreatePlayerForm.vue";
import {usePlayerStore} from "../stores/player";

const playerStore = usePlayerStore();
const startingZone = 'Forgotten Forest'
</script>

<template>
  <section class="page">
    <div class="panel">
      <h2>Player</h2>
      <CreatePlayerForm :player="playerStore.player" @save="playerStore.savePlayer"/>

      <p>{{ playerStore.player.name }} the {{ playerStore.player.class }} enters the {{ startingZone }}</p>
      <p>Stats:</p>
      <p>Str: {{ playerStore.player.strength }}</p>
      <p>Agi: {{ playerStore.player.agility }}</p>
      <p>Base Damage: {{ playerStore.player.baseDamage }}</p>
      <p>Total Damage: {{ playerStore.totalDamage }}</p>
      <p>Critical Chance: {{ playerStore.criticalChance }}</p>

      <p>HP: {{ playerStore.player.hp }}</p>
      <div class="bar-container">
        <div
            class="bar hp"
            :style="{ width: (playerStore.player.hp / playerStore.maxHp * 100) + '%' }"
        />
      </div>

      <p v-if="playerStore.player.hp > playerStore.maxHp * 0.25">Alive</p>
      <p v-else-if="playerStore.player.hp > 0">Critical</p>
      <p v-else>Dead</p>

      <button :disabled="playerStore.player.hp <= 0" @click="playerStore.takeDamage">Take Damage</button>
      <button :disabled="playerStore.player.hp >= playerStore.maxHp" @click="playerStore.heal">Heal</button>
      <button v-if="playerStore.player.hp === 0" @click="playerStore.revive">Revive</button>

      <br>
      <br>
      <p>MP: {{ playerStore.player.mp }}</p>
      <div class="bar-container ">
        <div
            class="bar mp"
            :style="{ width: (playerStore.player.mp / playerStore.maxMp * 100) + '%' }"
        />
      </div>

      <p v-if="playerStore.player.mp <= 0">No Mana</p>
      <p v-else-if="playerStore.player.mp <= playerStore.maxMp * 0.25">Low Mana</p>

      <button v-if="playerStore.player.hp > 0" :disabled="playerStore.player.mp < playerStore.magicCost"
              @click="playerStore.useSkill">Use Skill
      </button>
      <button v-if="playerStore.player.hp > 0" :disabled="playerStore.player.mp >= playerStore.maxMp"
              @click="playerStore.regenMagic">Regen
      </button>

      <button @click="playerStore.resetStats">Reset</button>
    </div>
  </section>
</template>