<script setup lang="ts">

import CreatePlayerForm from "../components/CreatePlayerForm.vue";
import {usePlayerStore} from "../stores/player";
import BasePanel from "../components/ui/BasePanel.vue";
import ResourceBar from "../components/ui/ResourceBar.vue";
import {useInventoryStore} from "../stores/inventory";
import {computed} from "vue";

const playerStore = usePlayerStore();
const inventoryStore = useInventoryStore();
const startingZone = 'Forgotten Forest'

const equippedWeapon = computed(() => inventoryStore.findEquippedItem('Weapon'));
const equippedArmor = computed(() => inventoryStore.findEquippedItem('Armor'));
</script>

<template>
  <BasePanel title="Player">
    <CreatePlayerForm :player="playerStore.player" @save="playerStore.savePlayer"/>

    <p>{{ playerStore.player.name }} the {{ playerStore.player.class }} enters the {{ startingZone }}</p>
    <p>Stats:</p>
    <p>Str: {{ playerStore.player.strength }}</p>
    <p>Agi: {{ playerStore.player.agility }}</p>
    <p>Base Damage: {{ playerStore.player.baseDamage }}</p>
    <p>Total Damage: {{ playerStore.totalDamage }}</p>
    <p>Critical Chance: {{ playerStore.criticalChance }}</p>
    <p v-if="equippedWeapon">Weapon: {{ equippedWeapon.name }} +{{ inventoryStore.equippedWeaponBonus }}</p>
    <p v-if="equippedArmor">Armor: {{ equippedArmor.name }} +{{ inventoryStore.equippedArmorBonus }}</p>

    <ResourceBar label="HP" :value="playerStore.player.hp" :max="playerStore.maxHp" variant="hp"/>

    <p v-if="playerStore.player.hp > playerStore.maxHp * 0.25">Alive</p>
    <p v-else-if="playerStore.player.hp > 0">Critical</p>
    <p v-else>Dead</p>

    <button :disabled="playerStore.player.hp <= 0" @click="playerStore.takeDamage">Take Damage</button>
    <button v-if="playerStore.player.hp === 0" @click="playerStore.revive">Revive</button>

    <br>
    <br>

    <ResourceBar label="MP" :value="playerStore.player.mp" :max="playerStore.maxMp" variant="mp"/>

    <p v-if="playerStore.player.mp <= 0">No Mana</p>
    <p v-else-if="playerStore.player.mp <= playerStore.maxMp * 0.25">Low Mana</p>

    <button v-if="playerStore.player.hp > 0" :disabled="playerStore.player.mp < playerStore.magicCost"
            @click="playerStore.useSkill">Use Skill
    </button>

    <button @click="playerStore.resetStats">Reset</button>
  </BasePanel>
</template>