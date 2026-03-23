<script setup lang="ts">
import {computed, reactive, ref, watch} from 'vue';
import ItemCard from './components/ItemCard.vue';
import ShopItemCard from "./components/ShopItemCard.vue";

const title = 'RPG Dashboard'
const subtitle = 'Welcome, Hero'
const startingZone = 'Forgotten Forest'

const maxHp = 100;
const damageValue = 10;
const healValue = 10;

const maxMp = 100;
const magicCost = 10;
const magicRegen = 10;

const availableClasses = ['Knight', 'Magician', 'Archer'];

type Player = {
  name: string,
  class: string,
  hp: number,
  mp: number,
  strength: number,
  agility: number,
  baseDamage: number,
  gold: number
}

const player = reactive<Player>({
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

type Item = {
  id: number,
  name: string,
  type: 'Weapon' | 'Armor' | 'Consumable',
  rarity: number,
  equipped: boolean,
  effects: Effect[]
}

type Effect = {
  stat: string,
  value: number
}

const inventory = ref<Item[]>([
  {id: 1, name: 'Sword', type: 'Weapon', rarity: 0, equipped: false, effects: [{stat: 'weaponDamage', value: 5}]},
  {id: 2, name: 'Armor', type: 'Armor', rarity: 0, equipped: false, effects: [{stat: 'defence', value: 1}]},
  {id: 3, name: 'HP Potion', type: 'Consumable', rarity: 0, equipped: false, effects: [{stat: 'hp', value: 10}]}
]);

type Search = {
  keyword: string;
  showEquippedOnly: boolean;
  showConsumableOnly: boolean
}

const inventorySearch = reactive<Search>({
  keyword: '',
  showEquippedOnly: false,
  showConsumableOnly: false,
})

const filteredInventory = computed(() => {
      const searchValue = inventorySearch.keyword.toLowerCase();
      if (!searchValue && !inventorySearch.showEquippedOnly && !inventorySearch.showConsumableOnly) {
        return inventory.value;
      }

      return inventory.value.filter<Item[]>((item: Item) => {
        if (inventorySearch.showEquippedOnly && inventorySearch.showConsumableOnly) {
          return ((item.name.toLowerCase().includes(searchValue) && item.type.toLowerCase().includes('consumable')) && item.equipped)
        } else if (inventorySearch.showConsumableOnly) {
          return (item.name.toLowerCase().includes(searchValue) && item.type.toLowerCase().includes('consumable'))
        } else if (inventorySearch.showEquippedOnly) {
          return ((item.name.toLowerCase().includes(searchValue) || item.type.toLowerCase().includes(searchValue)) && item.equipped)
        }

        return (item.name.toLowerCase().includes(searchValue) || item.type.toLowerCase().includes(searchValue))
      });
    })
;

const shopInfo = ref('');

type ShopItem = {
  id: number,
  name: string,
  type: 'Weapon' | 'Armor' | 'Consumable',
  rarity: number,
  equipped: boolean,
  price: number,
  effects: Effect[]
}

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
  player.hp = maxHp * 0.5;
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

function equipItem(itemId: Number) {
  for (let i = 0; i < inventory.value.length; i++) {
    if (inventory.value[i].id === itemId) {
      inventory.value[i].equipped = true;
      break;
    }
  }
}

function unequipItem(itemId: Number) {
  for (let i = 0; i < inventory.value.length; i++) {
    if (inventory.value[i].id === itemId) {
      inventory.value[i].equipped = false;
      break;
    }
  }
}

function buyItem(itemId: Number) {
  const item = shopItems.value.find((shopItem: { id: Number; }) => shopItem.id === itemId)
  if (!item) return;

  if (player.gold < item.price) {
    shopInfo.value = 'Not enough gold';
    return;
  }

  inventory.value.push({
    ...item,
    id: Date.now()
  });

  player.gold -= item.price;
  shopInfo.value = `Purchased ${item.name}`;
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
        shopInfo.value = 'Gold is running low!';
    }
);

watch(() => player.class, (newValue: string, oldValue: string) => {
  shopInfo.value = `${player.name} changed class from ${oldValue} to ${newValue}`
});
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <label>
      Character Name:
      <input v-model="player.name"/>
    </label>

    <label>
      Character Class:
      <select v-model="player.class">
        <option v-for="option in availableClasses" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>

    <p>{{ player.name }} the {{ player.class }} enters the {{ startingZone }}</p>
    <p>Stats:</p>
    <p>Str: {{ player.strength }}</p>
    <p>Agi: {{ player.agility }}</p>
    <p>Base Damage: {{ player.baseDamage }}</p>
    <p>Total Damage: {{ totalDamage }}</p>
    <p>Critical Chance: {{ criticalChance }}</p>

    <p>HP: {{ player.hp }}</p>

    <p v-if="player.hp > maxHp * 0.25">Alive</p>
    <p v-else-if="player.hp > 0">Critical</p>
    <p v-else>Dead</p>

    <button v-if="player.hp > 0" @click="takeDamage">Take Damage</button>
    <button v-if="player.hp > 0" @click="heal">Heal</button>
    <button v-if="player.hp === 0" @click="revive">Revive</button>

    <br>
    <br>
    <p>MP: {{ player.mp }}</p>

    <p v-if="player.mp <= 0">No Mana</p>
    <p v-else-if="player.mp <= maxMp * 0.25">Low Mana</p>

    <button v-if="player.hp > 0" @click="useSkill">Use Skill</button>
    <button v-if="player.hp > 0" @click="regenMagic">Regen</button>

    <button @click="resetStats">Reset</button>

    <hr/>
    <h3>Gold: {{ player.gold }}</h3>
    <p v-if="shopInfo !== ''">{{ shopInfo }}</p>
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
    <p v-if="filteredInventory.length === 0">'{{ inventorySearch.keyword }}' cannot be found.</p>
    <ul>
      <ItemCard v-for="item in filteredInventory" :key="item.id" :item="item" @equip="equipItem"
                @unequip="unequipItem"/>
    </ul>
  </main>
</template>