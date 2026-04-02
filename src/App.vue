<script setup lang="ts">
import {watch} from 'vue';
import {usePlayerStore} from "./stores/player";
import {useInventoryStore} from "./stores/inventory";
import {useShopStore} from "./stores/shop";

const localPlayer = usePlayerStore();
const localInventory = useInventoryStore();
const localShop = useShopStore();

watch(() => localPlayer.player.hp,
    (newValue: number, oldValue: number) => {
      console.log(`HP changed from ${oldValue} to ${newValue}`);

      if (Math.abs(newValue - oldValue) > 5)
        console.log('Critical Damage!');
    });

watch(() => localPlayer.player.gold,
    (newValue: number) => {
      if (newValue < 20)
        localShop.setShopMessage('Gold is running low!', 'warning');
    }
);

watch(() => localPlayer.player.class, (newValue: string, oldValue: string) => {
  localShop.setShopMessage(`${localPlayer.player.name} changed class from ${oldValue} to ${newValue}`, 'success');
});

function clearSavedData() {
  localPlayer.clearPlayerData();
  localInventory.clearInventoryData();
}
</script>

<template>
  <main>
    <h1>RPG Dashboard</h1>

    <nav>
      <RouterLink to="/player">Player</RouterLink>
      <RouterLink to="/shop">Shop</RouterLink>
      <RouterLink to="/inventory">Inventory</RouterLink>
      <RouterLink to="/quests">Quests</RouterLink>
    </nav>

    <button @click="clearSavedData">Clear Save Data</button>

    <RouterView />


  </main>
</template>