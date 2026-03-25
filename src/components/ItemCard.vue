<script setup lang="ts">

import {Item} from "../types/game";

const props = defineProps<{ item: Item }>();

const emit = defineEmits<{
  (e: 'equip', id: number): void
  (e: 'unequip', id: number): void
}>()

</script>

<template>
  <li>
    <strong>{{ props.item.name }}</strong>
    - Type: {{ props.item.type }}
    - Rarity: {{ props.item.rarity }}
    <span v-if="props.item.equipped"> (Equipped)</span>
    <br/>
    <p>Affected Stats:</p>
    <ul>
      <li v-for="(stat, index) in props.item.effects" :key="index">
        {{ stat.stat }}: {{ stat.value }}
      </li>
    </ul>
    <button v-if="props.item.equipped === false && props.item.type !== 'Consumable'" @click="emit('equip', props.item.id)">Equip</button>
    <button v-else-if="props.item.type !== 'Consumable'" @click="emit('unequip', props.item.id)">Unequip</button>
  </li>
</template>