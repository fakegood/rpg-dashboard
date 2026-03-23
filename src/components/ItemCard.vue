<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['equip', 'unequip']);
</script>

<template>
  <li>
    <strong>{{ item.name }}</strong>
    - Type: {{ item.type }}
    - Rarity: {{ item.rarity }}
    <span v-if="item.equipped"> (Equipped)</span>
    <br/>
    <p>Affected Stats:</p>
    <ul>
      <li v-for="(stat, index) in item.effects" :key="index">
        {{ stat.stat }}: {{ stat.value }}
      </li>
    </ul>
    <button v-if="item.equipped === false && item.type !== 'Consumable'" @click="emit('equip', item.id)">Equip</button>
    <button v-else-if="item.type !== 'Consumable'" @click="emit('unequip', item.id)">Unequip</button>
  </li>
</template>