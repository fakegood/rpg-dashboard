<script setup lang="ts">

import CreatePlayerForm from "../components/CreatePlayerForm.vue";
import type {usePlayer} from "../composables/usePlayer";
import type {useInventory} from "../composables/useInventory";
import type {useShop} from "../composables/useShop";

type ViewProps = {
  localPlayer: ReturnType<typeof usePlayer>
  localInventory: ReturnType<typeof useInventory>
  localShop: ReturnType<typeof useShop>
  startingZone: string
}

const {
  localPlayer,
  startingZone
} = defineProps<ViewProps>()
</script>

<template>
  <CreatePlayerForm :player="localPlayer.player" @save="localPlayer.savePlayer"/>

  <p>{{ localPlayer.player.name }} the {{ localPlayer.player.class }} enters the {{ startingZone }}</p>
  <p>Stats:</p>
  <p>Str: {{ localPlayer.player.strength }}</p>
  <p>Agi: {{ localPlayer.player.agility }}</p>
  <p>Base Damage: {{ localPlayer.player.baseDamage }}</p>
  <p>Total Damage: {{ localPlayer.totalDamage }}</p>
  <p>Critical Chance: {{ localPlayer.criticalChance }}</p>

  <p>HP: {{ localPlayer.player.hp }}</p>
  <div class="background-bar">
    <div
        :style="{
        width: (localPlayer.player.hp / localPlayer.maxHp * 100) + '%',
        background: 'red',
        height: '10px'
      }"
    />
  </div>

  <p v-if="localPlayer.player.hp > localPlayer.maxHp * 0.25">Alive</p>
  <p v-else-if="localPlayer.player.hp > 0">Critical</p>
  <p v-else>Dead</p>

  <button :disabled="localPlayer.player.hp <= 0" @click="localPlayer.takeDamage">Take Damage</button>
  <button :disabled="localPlayer.player.hp >= localPlayer.maxHp" @click="localPlayer.heal">Heal</button>
  <button v-if="localPlayer.player.hp === 0" @click="localPlayer.revive">Revive</button>

  <br>
  <br>
  <p>MP: {{ localPlayer.player.mp }}</p>
  <div class="background-bar">
    <div
        :style="{
        width: (localPlayer.player.mp / localPlayer.maxMp * 100) + '%',
        background: 'blue',
        height: '10px'
      }"
    />
  </div>

  <p v-if="localPlayer.player.mp <= 0">No Mana</p>
  <p v-else-if="localPlayer.player.mp <= localPlayer.maxMp * 0.25">Low Mana</p>

  <button v-if="localPlayer.player.hp > 0" :disabled="localPlayer.player.mp < localPlayer.magicCost"
          @click="localPlayer.useSkill">Use Skill
  </button>
  <button v-if="localPlayer.player.hp > 0" :disabled="localPlayer.player.mp >= localPlayer.maxMp"
          @click="localPlayer.regenMagic">Regen
  </button>

  <button @click="localPlayer.resetStats">Reset</button>
</template>