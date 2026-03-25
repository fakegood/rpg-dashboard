<script setup lang="ts">
import {ShopItem} from "../types/game";

const props = defineProps<{ item: ShopItem, canAfford: boolean }>();

const emit = defineEmits<{
  (e: 'buy', id: number): void
}>();
</script>

<template>
  <li>
    <strong>{{ props.item.name }}</strong> - Type: {{ props.item.type }} - Rarity: {{ props.item.rarity }} | Price:
    {{ props.item.price }}
    <br/>
    <p>Affected Stats:</p>
    <ul>
      <li v-for="(stat, index) in props.item.effects" :key="index">
        {{ stat.stat }}: {{ stat.value }}
      </li>
    </ul>
    <button :disabled="!props.canAfford" @click="emit('buy', props.item.id)">Buy</button>
  </li>
</template>