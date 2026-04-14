<script setup lang="ts">
import {watch} from 'vue';
import {usePlayerStore} from "./stores/player";
import {useInventoryStore} from "./stores/inventory";
import {useShopStore} from "./stores/shop";
import {useQuestStore} from "./stores/quest";
import {useBattleStore} from "./stores/battle";
import BaseButton from "./components/ui/BaseButton.vue";

const localPlayer = usePlayerStore();
const localInventory = useInventoryStore();
const localShop = useShopStore();
const localQuest = useQuestStore();
const localBattle = useBattleStore();

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
  localQuest.resetQuestState();
  localBattle.resetBattleState();
  localShop.resetShopState();
}
</script>

<template>
  <main class="min-h-screen bg-slate-100 px-6 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="mx-auto flex max-w-5xl flex-col gap-6">
      <header class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold tracking-tight">RPG Dashboard</h1>

        <nav class="flex flex-wrap gap-2">
          <RouterLink to="/player" class="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Player</RouterLink>
          <RouterLink to="/shop" class="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Shop</RouterLink>
          <RouterLink to="/inventory" class="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Inventory</RouterLink>
          <RouterLink to="/quests" class="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Quests</RouterLink>
          <RouterLink to="/battle" class="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Battle</RouterLink>
        </nav>

        <BaseButton variant="danger" @click="clearSavedData">Clear Save Data</BaseButton>
      </header>
    </div>


    <section class="flex flex-col gap-4">
      <RouterView/>
    </section>


  </main>
</template>