<script setup lang="ts">

import ShopItemCard from "../components/ShopItemCard.vue";
import {useShopStore} from "../stores/shop";
import {usePlayerStore} from "../stores/player";

const shopStore = useShopStore();
const playerStore = usePlayerStore();

const shopItems = shopStore.shopItems;
</script>

<template>
  <section class="page">
    <h2>Shop</h2>
    <h3>Gold: {{ playerStore.player.gold }}</h3>
    <p v-if="shopStore.shopInfo" :class="`status-${shopStore.shopStatus}`">{{ shopStore.shopInfo }}</p>
    <h3>Shop</h3>
    <ul>
      <ShopItemCard v-for="shopItem in shopItems" :key="shopItem.id" :item="shopItem"
                    :canAfford="shopItem.price <= playerStore.player.gold" @buy="shopStore.buyItem"/>
    </ul>
  </section>
</template>