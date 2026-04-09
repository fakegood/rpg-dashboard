<script setup lang="ts">

import CreatePlayerForm from "../components/CreatePlayerForm.vue";
import {usePlayerStore} from "../stores/player";
import BasePanel from "../components/ui/BasePanel.vue";
import ResourceBar from "../components/ui/ResourceBar.vue";
import {useInventoryStore} from "../stores/inventory";
import {computed} from "vue";
import BaseButton from "../components/ui/BaseButton.vue";
import StatRow from "../components/ui/StatRow.vue";

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
    <h3>Stats</h3>
    <StatRow label="Strength" :value="playerStore.player.strength"/>
    <StatRow label="Agility" :value="playerStore.player.agility"/>
    <StatRow label="Base Damage" :value="playerStore.player.baseDamage"/>
    <StatRow label="Total Damage" :value="playerStore.totalDamage"/>
    <StatRow label="Critical Chance" :value="playerStore.criticalChance"/>
    <StatRow v-if="equippedWeapon" label="Weapon" :value="`${equippedWeapon.name} +${inventoryStore.equippedWeaponBonus}`"/>
    <StatRow v-if="equippedArmor" label="Armor" :value="`${equippedArmor.name} +${inventoryStore.equippedArmorBonus}`"/>

    <ResourceBar label="HP" :value="playerStore.player.hp" :max="playerStore.maxHp" variant="hp"/>

    <p v-if="playerStore.player.hp > playerStore.maxHp * 0.25">Alive</p>
    <p v-else-if="playerStore.player.hp > 0">Critical</p>
    <p v-else>Dead</p>

    <BaseButton :disabled="playerStore.player.hp <= 0" @click="playerStore.takeDamage">Take Damage</BaseButton>
    <BaseButton v-if="playerStore.player.hp === 0" @click="playerStore.revive">Revive</BaseButton>

    <br>
    <br>

    <ResourceBar label="MP" :value="playerStore.player.mp" :max="playerStore.maxMp" variant="mp"/>

    <p v-if="playerStore.player.mp <= 0">No Mana</p>
    <p v-else-if="playerStore.player.mp <= playerStore.maxMp * 0.25">Low Mana</p>

    <BaseButton v-if="playerStore.player.hp > 0" :disabled="playerStore.player.mp < playerStore.magicCost"
                @click="playerStore.useSkill">Use Skill
    </BaseButton>

    <BaseButton @click="playerStore.resetStats">Reset</BaseButton>
  </BasePanel>
</template>