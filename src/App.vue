<script setup lang="ts">
import {ref, watch} from 'vue';
import ItemCard from './components/ItemCard.vue';
import ShopItemCard from "./components/ShopItemCard.vue";
import CreatePlayerForm from "./components/CreatePlayerForm.vue";
import {INVENTORY_STORAGE_KEY, Item, Player, PLAYER_STORAGE_KEY, Search, ShopItem} from "./types/game";
import QuestBoard from "./components/QuestBoard.vue";
import {usePlayer} from "./composables/usePlayer"
import {useInventory} from "./composables/useInventory";

const title = 'RPG Dashboard'
const subtitle = 'Welcome, Hero'
const startingZone = 'Forgotten Forest'

const localPlayer = usePlayer();
const localInventory = useInventory();
const filteredInventory = localInventory.filteredInventory

const shopInfo = ref('');
const shopStatus = ref<'success' | 'error' | 'warning' | ''>('')

const shopItems = ref<ShopItem[]>([
  {
    id: 101,
    name: 'Steel Sword',
    type: 'Weapon',
    rarity: 2,
    equipped: false,
    price: 40,
    effects: [{stat: 'Weapon Damage', value: 10}]
  },
  {
    id: 102,
    name: 'Chain Armor',
    type: 'Armor',
    rarity: 2,
    equipped: false,
    price: 35,
    effects: [{stat: 'Defense', value: 4}]
  },
  {
    id: 103,
    name: 'Mana Potion',
    type: 'Consumable',
    rarity: 1,
    equipped: false,
    price: 15,
    effects: [{stat: 'MP', value: 20}]
  }
])

function buyItem(itemId: number) {
  const item = shopItems.value.find((shopItem: ShopItem) => shopItem.id === itemId)
  if (!item) return;

  if (localPlayer.player.gold < item.price) {
    setShopMessage('Not enough gold', 'error');
    return;
  }

  localInventory.addItem(item);

  localPlayer.useGold(item.price);

  setShopMessage(`Purchased ${item.name}`, 'success');
}

function setShopMessage(message: string, type: 'success' | 'error' | 'warning') {
  shopInfo.value = message
  shopStatus.value = type

  setTimeout(() => {
    shopInfo.value = ''
    shopStatus.value = ''
  }, 3000)
}

watch(() => localPlayer.player.hp,
    (newValue: number, oldValue: number) => {
      console.log(`HP changed from ${oldValue} to ${newValue}`);

      if (Math.abs(newValue - oldValue) > 5)
        console.log('Critical Damage!');
    });

watch(() => localPlayer.player.gold,
    (newValue: number) => {
      if (newValue < 20)
        setShopMessage('Gold is running low!', 'warning');
    }
);

watch(() => localPlayer.player.class, (newValue: string, oldValue: string) => {
  setShopMessage(`${localPlayer.player.name} changed class from ${oldValue} to ${newValue}`, 'success');
});

function clearSavedData() {
  localStorage.removeItem(PLAYER_STORAGE_KEY)
  localStorage.removeItem(INVENTORY_STORAGE_KEY)
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
    <p v-if="shopInfo" :class="`status-${shopStatus}`">{{ shopInfo }}</p>
    <h3>Shop</h3>
    <ul>
      <ShopItemCard v-for="shopItem in shopItems" :key="shopItem.id" :item="shopItem"
                    :canAfford="shopItem.price <= localPlayer.player.gold" @buy="buyItem"/>
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