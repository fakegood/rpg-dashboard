<script setup>
import {ref} from 'vue';

const title = 'RPG Dashboard'
const subtitle = 'Welcome, Hero'
const playerClass = 'Knight'
const startingZone = 'Forgotten Forest'

const hp = ref(100);
const maxHp = 100;
const damageValue = 10;
const healValue = 10;

function TakeDamage() {
  hp.value -= damageValue;
  if (hp.value <= 0) {
    hp.value = 0;
    Died();
  }
}

function Heal() {
  hp.value += healValue;
  if (hp.value > maxHp) {
    hp.value = maxHp;
  }
}

function Died() {

}
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <p>Class: {{ playerClass }}</p>
    <p>Starting Zone: {{ startingZone }}</p>

    <p>HP: {{ hp }}</p>

    <button @click="TakeDamage()">Take Damage</button>
    <button @click="Heal()">Heal</button>
  </main>
</template>