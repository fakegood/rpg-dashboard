<script setup lang="ts">
import {watch} from 'vue';
import ItemCard from './components/ItemCard.vue';
import ShopItemCard from "./components/ShopItemCard.vue";
import CreatePlayerForm from "./components/CreatePlayerForm.vue";
import QuestBoard from "./components/QuestBoard.vue";
import {usePlayer} from "./composables/usePlayer"
import {useInventory} from "./composables/useInventory";
import {useShop} from "./composables/useShop";

const title = 'RPG Dashboard'
const subtitle = 'Welcome, Hero'
const startingZone = 'Forgotten Forest'

const localPlayer = usePlayer();
const localInventory = useInventory();
const filteredInventory = localInventory.filteredInventory
const localShop = useShop(localPlayer , localInventory);
const shopItems = localShop.shopItems;

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
  localPlayer.resetPlayer();
  localInventory.clearInventory();
}
</script>

<template>
  <main>
    <button @click="clearSavedData">Clear Save Data</button>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <CreatePlayerForm :player="localPlayer.player" @save="localPlayer.savePlayer"/>

    <p>{{ localPlayer.player.name }} the {{ localPlayer.player.class }} enters the {{ startingZone }}</p>
    <p>Stats:</p>
    <p>Str: {{ localPlayer.player.strength }}</p>
    <p>Agi: {{ localPlayer.player.agility }}</p>
    <p>Base Damage: {{ localPlayer.player.baseDamage }}</p>
    <p>Total Damage: {{ localPlayer.totalDamage }}</p>
    <p>Critical Chance: {{ localPlayer.criticalChance }}</p>

    <p>HP: {{ localPlayer.player.hp }}</p>
    <div class="background-bar">
      <div
          :style="{
        width: (localPlayer.player.hp / localPlayer.maxHp * 100) + '%',
        background: 'red',
        height: '10px'
      }"
      />
    </div>

    <p v-if="localPlayer.player.hp > localPlayer.maxHp * 0.25">Alive</p>
    <p v-else-if="localPlayer.player.hp > 0">Critical</p>
    <p v-else>Dead</p>

    <button :disabled="localPlayer.player.hp <= 0" @click="localPlayer.takeDamage">Take Damage</button>
    <button :disabled="localPlayer.player.hp >= localPlayer.maxHp" @click="localPlayer.heal">Heal</button>
    <button v-if="localPlayer.player.hp === 0" @click="localPlayer.revive">Revive</button>

    <br>
    <br>
    <p>MP: {{ localPlayer.player.mp }}</p>
    <div class="background-bar">
      <div
          :style="{
        width: (localPlayer.player.mp / localPlayer.maxMp * 100) + '%',
        background: 'blue',
        height: '10px'
      }"
      />
    </div>

    <p v-if="localPlayer.player.mp <= 0">No Mana</p>
    <p v-else-if="localPlayer.player.mp <= localPlayer.maxMp * 0.25">Low Mana</p>

    <button v-if="localPlayer.player.hp > 0" :disabled="localPlayer.player.mp < localPlayer.magicCost" @click="localPlayer.useSkill">Use Skill</button>
    <button v-if="localPlayer.player.hp > 0" :disabled="localPlayer.player.mp >= localPlayer.maxMp" @click="localPlayer.regenMagic">Regen</button>

    <button @click="localPlayer.resetStats">Reset</button>

    <br/>
    <QuestBoard/>

    <hr/>
    <h3>Gold: {{ localPlayer.player.gold }}</h3>
    <p v-if="localShop.shopInfo" :class="`status-${localShop.shopStatus}`">{{ localShop.shopInfo }}</p>
    <h3>Shop</h3>
    <ul>
      <ShopItemCard v-for="shopItem in shopItems" :key="shopItem.id" :item="shopItem"
                    :canAfford="shopItem.price <= localPlayer.player.gold" @buy="localShop.buyItem"/>
    </ul>

    <hr/>
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
  </main>
</template>