<script setup lang="ts">

import ShopItemCard from "../components/ShopItemCard.vue";
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
  localShop
} = defineProps<ViewProps>()

const shopItems = localShop.shopItems;
</script>

<template>
  <h3>Gold: {{ localPlayer.player.gold }}</h3>
  <p v-if="localShop.shopInfo" :class="`status-${localShop.shopStatus}`">{{ localShop.shopInfo }}</p>
  <h3>Shop</h3>
  <ul>
    <ShopItemCard v-for="shopItem in shopItems" :key="shopItem.id" :item="shopItem"
                  :canAfford="shopItem.price <= localPlayer.player.gold" @buy="localShop.buyItem"/>
  </ul>
</template>