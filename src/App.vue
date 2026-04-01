<script setup lang="ts">
import {watch} from 'vue';
import {usePlayer} from "./composables/usePlayer"
import {useInventory} from "./composables/useInventory";
import {useShop} from "./composables/useShop";

const startingZone = 'Forgotten Forest'

const localPlayer = usePlayer();
const localInventory = useInventory();
const localShop = useShop({
  getGold: () => localPlayer.player.gold,
  spendGold: localPlayer.spendGold,
  addItem: localInventory.addItem
});

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

    <RouterView v-slot="{ Component }">
      <component :is="Component"
                 :local-player="localPlayer"
                 :local-inventory="localInventory"
                 :local-shop="localShop"
                 :starting-zone="startingZone"/>
    </RouterView>


  </main>
</template>