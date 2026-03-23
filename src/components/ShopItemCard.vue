<script setup lang="ts">
type ShopItem = {
  id: number,
  name: string,
  type: 'Weapon' | 'Armor' | 'Consumable',
  rarity: number,
  equipped: boolean,
  price: number,
  effects: Effect[]
}

type Effect = {
  stat: string,
  value: number
}

defineProps<{ item: ShopItem, canAfford: boolean }>();

const emit = defineEmits<{
  (e: 'buy', id: number): void
}>();
</script>

<template>
  <li>
    <strong>{{ item.name }}</strong> - Type: {{ item.type }} - Rarity: {{ item.rarity }} | Price: {{ item.price }}
    <br/>
    <p>Affected Stats:</p>
    <ul>
      <li v-for="(stat, index) in item.effects" :key="index">
        {{ stat.stat }}: {{ stat.value }}
      </li>
    </ul>
    <button :disabled="!canAfford" @click="emit('buy', item.id)">Buy</button>
  </li>
</template>