<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  canAfford: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['buy']);
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