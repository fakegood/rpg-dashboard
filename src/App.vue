<script setup lang="ts">
import {computed, reactive, ref, watch} from 'vue';
import ItemCard from './components/ItemCard.vue';
import ShopItemCard from "./components/ShopItemCard.vue";
import CreatePlayerForm from "./components/CreatePlayerForm.vue";
import {Item, Player, Search, ShopItem} from "./types/game";
import QuestBoard from "./components/QuestBoard.vue";

const title = 'RPG Dashboard'
const subtitle = 'Welcome, Hero'
const startingZone = 'Forgotten Forest'

const maxHp = 100;
const damageValue = 10;
const healValue = 10;

const maxMp = 100;
const magicCost = 10;
const magicRegen = 10;

const PLAYER_STORAGE_KEY = 'rpg-dashboard-player'
const INVENTORY_STORAGE_KEY = 'rpg-dashboard-inventory'

function loadStoredPlayer(): Player | null {
  const raw = localStorage.getItem(PLAYER_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Player
  } catch {
    return null
  }
}

function loadStoredInventory(): Item[] | null {
  const raw = localStorage.getItem(INVENTORY_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Item[]
  } catch {
    return null
  }
}

const storedPlayer = loadStoredPlayer()
const storedInventory = loadStoredInventory()

const player = reactive<Player>(storedPlayer ??
    {
      name: 'fakegood',
      class: 'Knight',
      hp: maxHp,
      mp: maxMp,
      strength: 12,
      agility: 10,
      baseDamage: 5,
      gold: 100
    });

const totalDamage = computed(() => (player.strength * 2) + player.baseDamage + classBonusDamage(player));
const criticalChance = computed(() => (player.agility * 0.5) + classBonusCritical(player));

const inventory = ref<Item[]>(storedInventory ??
    [
      {id: 1, name: 'Sword', type: 'Weapon', rarity: 0, equipped: false, effects: [{stat: 'weaponDamage', value: 5}]},
      {id: 2, name: 'Armor', type: 'Armor', rarity: 0, equipped: false, effects: [{stat: 'defence', value: 1}]},
      {id: 3, name: 'HP Potion', type: 'Consumable', rarity: 0, equipped: false, effects: [{stat: 'hp', value: 10}]}
    ]);

const inventorySearch = reactive<Search>({
  keyword: '',
  showEquippedOnly: false,
  showConsumableOnly: false,
})

const filteredInventory = computed(() => {
  const searchValue = inventorySearch.keyword.trim().toLowerCase();
  if (!searchValue && !inventorySearch.showEquippedOnly && !inventorySearch.showConsumableOnly) {
    return inventory.value;
  }

  return inventory.value.filter((item: Item) => {
    const matchesSearch =
        !searchValue ||
        item.name.toLowerCase().includes(searchValue) ||
        item.type.toLowerCase().includes(searchValue)

    const matchesEquipped =
        !inventorySearch.showEquippedOnly || item.equipped

    const matchesConsumable =
        !inventorySearch.showConsumableOnly || item.type === 'Consumable'

    return matchesSearch && matchesEquipped && matchesConsumable
  });
});

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

function savePlayer(formPlayer: Player) {
  player.name = formPlayer.name;
  player.class = formPlayer.class;
  player.strength = formPlayer.strength;
  player.agility = formPlayer.agility;
  player.baseDamage = formPlayer.baseDamage;
}

function takeDamage() {
  player.hp -= damageValue;
  if (player.hp <= 0) {
    player.hp = 0;
    died();
  }
}

function heal() {
  player.hp += healValue;
  if (player.hp > maxHp) {
    player.hp = maxHp;
  }
}

function died() {

}

function revive() {
  player.hp = Math.floor(maxHp * 0.5);
}

function useSkill() {
  player.mp -= magicCost;
  if (player.mp <= 0) {
    player.mp = 0;
  }
}

function regenMagic() {
  player.mp += magicRegen;
  if (player.mp > maxMp) {
    player.mp = maxMp;
  }
}

function resetStats() {
  player.hp = maxHp;
  player.mp = maxMp;
}

function classBonusDamage(target: Player) {
  switch (target.class) {
    case 'Knight':
      return 5;
    case 'Magician':
    case 'Archer':
    default:
      return 0;
  }
}

function classBonusCritical(target: Player) {
  switch (target.class) {
    case 'Knight':
      return 0;
    case 'Magician':
      return 3;
    case 'Archer':
      return 10;
    default:
      return 0;
  }
}

function equipItem(itemId: number) {
  for (let i = 0; i < inventory.value.length; i++) {
    if (inventory.value[i].id === itemId) {
      inventory.value[i].equipped = true;
      break;
    }
  }
}

function unequipItem(itemId: number) {
  for (let i = 0; i < inventory.value.length; i++) {
    if (inventory.value[i].id === itemId) {
      inventory.value[i].equipped = false;
      break;
    }
  }
}

function buyItem(itemId: number) {
  const item = shopItems.value.find((shopItem: ShopItem) => shopItem.id === itemId)
  if (!item) return;

  if (player.gold < item.price) {
    setShopMessage('Not enough gold', 'error');
    return;
  }

  inventory.value.push({
    ...item,
    id: Date.now()
  });

  player.gold -= item.price;

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

watch(() => player.hp,
    (newValue: number, oldValue: number) => {
      console.log(`HP changed from ${oldValue} to ${newValue}`);

      if (Math.abs(newValue - oldValue) > 5)
        console.log('Critical Damage!');
    });

watch(() => player.gold,
    (newValue: number) => {
      if (newValue < 20)
        setShopMessage('Gold is running low!', 'warning');
    }
);

watch(() => player.class, (newValue: string, oldValue: string) => {
  setShopMessage(`${player.name} changed class from ${oldValue} to ${newValue}`, 'success');
});

watch(
    player,
    (newPlayer: Player) => {
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(newPlayer))
    },
    {deep: true}
);

watch(
    inventory,
    (newInventory: Item[]) => {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(newInventory))
    },
    {deep: true}
);

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

    <CreatePlayerForm :player="player" @save="savePlayer"/>

    <p>{{ player.name }} the {{ player.class }} enters the {{ startingZone }}</p>
    <p>Stats:</p>
    <p>Str: {{ player.strength }}</p>
    <p>Agi: {{ player.agility }}</p>
    <p>Base Damage: {{ player.baseDamage }}</p>
    <p>Total Damage: {{ totalDamage }}</p>
    <p>Critical Chance: {{ criticalChance }}</p>

    <p>HP: {{ player.hp }}</p>
    <div class="background-bar">
      <div
          :style="{
        width: (player.hp / maxHp * 100) + '%',
        background: 'red',
        height: '10px'
      }"
      />
    </div>

    <p v-if="player.hp > maxHp * 0.25">Alive</p>
    <p v-else-if="player.hp > 0">Critical</p>
    <p v-else>Dead</p>

    <button :disabled="player.hp <= 0" @click="takeDamage">Take Damage</button>
    <button :disabled="player.hp >= maxHp" @click="heal">Heal</button>
    <button v-if="player.hp === 0" @click="revive">Revive</button>

    <br>
    <br>
    <p>MP: {{ player.mp }}</p>
    <div class="background-bar">
      <div
          :style="{
        width: (player.mp / maxMp * 100) + '%',
        background: 'blue',
        height: '10px'
      }"
      />
    </div>

    <p v-if="player.mp <= 0">No Mana</p>
    <p v-else-if="player.mp <= maxMp * 0.25">Low Mana</p>

    <button v-if="player.hp > 0" :disabled="player.mp < magicCost" @click="useSkill">Use Skill</button>
    <button v-if="player.hp > 0" :disabled="player.mp >= maxMp" @click="regenMagic">Regen</button>

    <button @click="resetStats">Reset</button>

    <br/>
    <QuestBoard/>

    <hr/>
    <h3>Gold: {{ player.gold }}</h3>
    <p v-if="shopInfo" :class="`status-${shopStatus}`">{{ shopInfo }}</p>
    <h3>Shop</h3>
    <ul>
      <ShopItemCard v-for="shopItem in shopItems" :key="shopItem.id" :item="shopItem"
                    :canAfford="shopItem.price <= player.gold" @buy="buyItem"/>
    </ul>

    <hr/>
    <label>
      Search inventory:
      <input v-model="inventorySearch.keyword" placeholder="Start typing to search inventory"/>
    </label>
    <label>
      Equipped:
      <input type="checkbox" v-model="inventorySearch.showEquippedOnly"/>
    </label>
    <label>
      Consumable
      <input type="checkbox" v-model="inventorySearch.showConsumableOnly"/>
    </label>

    <h3>Inventory</h3>
    <p v-if="filteredInventory.length === 0">No items match your filters</p>
    <ul>
      <ItemCard v-for="item in filteredInventory" :key="item.id" :item="item" @equip="equipItem"
                @unequip="unequipItem"/>
    </ul>
  </main>
</template>