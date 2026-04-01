<script setup lang="ts">

import ItemCard from "../components/ItemCard.vue";
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
  localInventory
} = defineProps<ViewProps>()

const filteredInventory = localInventory.filteredInventory;

</script>

<template>
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
  <p v-if="filteredInventory.length === 0">No items match your filters</p>
  <ul>
    <ItemCard v-for="item in filteredInventory" :key="item.id" :item="item"
              @equip="localInventory.equipItem"
              @unequip="localInventory.unequipItem"/>
  </ul>
</template>