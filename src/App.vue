<script setup>
import {computed, ref} from 'vue';
import ItemCard from './components/ItemCard.vue';

const title = 'RPG Dashboard'
const subtitle = 'Welcome, Hero'
const selectedClass = ref('Knight');
const startingZone = 'Forgotten Forest'

const characterName = ref('fakegood');

const hp = ref(100);
const maxHp = 100;
const damageValue = 10;
const healValue = 10;

const mp = ref(100);
const maxMp = 100;
const magicCost = 10;
const magicRegen = 10;

const strength = ref(12);
const weaponDamage = ref(8);
const agility = ref(10);

const totalDamage = computed(() => (strength.value * 2) + weaponDamage.value + classBonusDamage());
const criticalChance = computed(() => (agility.value * 0.5) + classBonusCritical());

const availableClasses = ['Knight', 'Magician', 'Archer'];

const inventory = ref([
  {id: 1, name: 'Sword', type: 'Weapon', rarity: 0, equipped: false, effects: [{stat: 'weaponDamage', value: 5}]},
  {id: 2, name: 'Armor', type: 'Armor', rarity: 0, equipped: false, effects: [{stat: 'defence', value: 1}]},
  {id: 3, name: 'HP Potion', type: 'Consumable', rarity: 0, equipped: false, effects: [{stat: 'hp', value: 10}]}
]);

function takeDamage() {
  hp.value -= damageValue;
  if (hp.value <= 0) {
    hp.value = 0;
    died();
  }
}

function heal() {
  hp.value += healValue;
  if (hp.value > maxHp) {
    hp.value = maxHp;
  }
}

function died() {

}

function revive() {
  hp.value = maxHp * 0.5;
}

function useSkill() {
  mp.value -= magicCost;
  if (mp.value <= 0) {
    mp.value = 0;
  }
}

function regenMagic() {
  mp.value += magicRegen;
  if (mp.value > maxMp) {
    mp.value = maxMp;
  }
}

function resetStats() {
  hp.value = maxHp;
  mp.value = maxMp;
}

function classBonusDamage() {
  switch (selectedClass.value) {
    case 'Knight':
      return 5;
    case 'Magician':
    case 'Archer':
    default:
      return 0;
  }
}

function classBonusCritical() {
  switch (selectedClass.value) {
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

function equipItem(itemId) {
  for (let i = 0; i < inventory.value.length; i++) {
    if (inventory.value[i].id === itemId) {
      inventory.value[i].equipped = true;
      break;
    }
  }
}

function unequipItem(itemId) {
  for (let i = 0; i < inventory.value.length; i++) {
    if (inventory.value[i].id === itemId) {
      inventory.value[i].equipped = false;
      break;
    }
  }
}
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>

    <label>
      Character Name:
      <input v-model="characterName"/>
    </label>

    <label>
      Character Class:
      <select v-model="selectedClass">
        <option v-for="option in availableClasses" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>

    <p>{{ characterName }} the {{ selectedClass }} enters the {{ startingZone }}</p>
    <p>Stats:</p>
    <p>Str: {{ strength }}</p>
    <p>Agi: {{ agility }}</p>
    <p>Weapon: {{ weaponDamage }}</p>
    <p>Total Damage: {{ totalDamage }}</p>
    <p>Critical Chance: {{ criticalChance }}</p>

    <p>HP: {{ hp }}</p>

    <p v-if="hp > maxHp * 0.25">Alive</p>
    <p v-else-if="hp > 0">Critical</p>
    <p v-else>Dead</p>

    <button v-if="hp > 0" @click="takeDamage">Take Damage</button>
    <button v-if="hp > 0" @click="heal">Heal</button>
    <button v-if="hp === 0" @click="revive">Revive</button>

    <br>
    <br>
    <p>MP: {{ mp }}</p>

    <p v-if="mp <= 0">No Mana</p>
    <p v-else-if="mp <= maxMp * 0.25">Low Mana</p>

    <button v-if="hp > 0" @click="useSkill">Use Skill</button>
    <button v-if="hp > 0" @click="regenMagic">Regen</button>

    <button @click="resetStats">Reset</button>

    <hr/>
    <h3>Inventory</h3>
    <ul>
      <ItemCard v-for="item in inventory" :key="item.id" :item="item" @equip="equipItem" @unequip="unequipItem"/>
    </ul>
  </main>
</template>