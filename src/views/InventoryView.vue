<script setup lang="ts">

import ItemCard from "../components/ItemCard.vue";
import {useInventoryStore} from "../stores/inventory";

const localInventory = useInventoryStore();

const filteredInventory = localInventory.filteredInventory;

</script>

<template>
  <section class="page">
    <h2>Inventory</h2>
    <label>
      Search inventory:
      <input v-model="localInventory.inventorySearch.keyword" placeholder="Start typing to search inventory"/>
    </label>
    <label>
      Equipped:
      <input type="checkbox" v-model="localInventory.inventorySearch.showEquippedOnly"/>
    </label>
    <label>
      Consumable
      <input type="checkbox" v-model="localInventory.inventorySearch.showConsumableOnly"/>
    </label>

    <h3>Inventory</h3>
    <p v-if="filteredInventory.length === 0" class="empty-state">No items match your filters</p>
    <ul>
      <ItemCard v-for="item in filteredInventory" :key="item.id" :item="item"
                @equip="localInventory.equipItem"
                @unequip="localInventory.unequipItem"/>
    </ul>
  </section>
</template>