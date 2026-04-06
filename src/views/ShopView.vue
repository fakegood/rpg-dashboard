<script setup lang="ts">

import ShopItemCard from "../components/ShopItemCard.vue";
import {useShopStore} from "../stores/shop";
import {usePlayerStore} from "../stores/player";
import BasePanel from "../components/ui/BasePanel.vue";
import StatusMessage from "../components/ui/StatusMessage.vue";

const shopStore = useShopStore();
const playerStore = usePlayerStore();

</script>

<template>
  <BasePanel title="Shop">
    <h3>Gold: {{ playerStore.player.gold }}</h3>
    <StatusMessage :message="shopStore.shopInfo" :type="shopStore.shopStatus" />
    <h3>Shop</h3>
    <ul>
      <ShopItemCard v-for="shopItem in shopStore.shopItems" :key="shopItem.id" :item="shopItem"
                    :canAfford="shopItem.price <= playerStore.player.gold" @buy="shopStore.buyItem"/>
    </ul>
  </BasePanel>
</template>