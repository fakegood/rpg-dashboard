<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {Player} from "../types/game";

const props = defineProps<{ player: Player }>();

const characterForm = reactive({
  name: props.player.name,
  class: props.player.class,
  strength: props.player.strength,
  agility: props.player.agility,
  baseDamage: props.player.baseDamage
})

const availableClasses = ['Knight', 'Magician', 'Archer'];
const formMessage = ref('');

const emit = defineEmits<{ (e: 'save', value: Player): void }>();

const formErrors = computed(() => {
  const errors: string[] = []

  if (!characterForm.name.trim()) {
    errors.push('Name is required')
  }

  if (characterForm.strength < 1) {
    errors.push('Strength must be at least 1')
  } else if (characterForm.class === 'Knight' && characterForm.strength < 10) {
    errors.push(`Knight's Strength must be at least 10`)
  }

  if (characterForm.agility < 1) {
    errors.push('Agility must be at least 1')
  } else if (characterForm.class === 'Archer' && characterForm.agility < 10) {
    errors.push(`Archer's Agility must be at least 10`)
  }

  if (characterForm.baseDamage < 0) {
    errors.push('Base damage cannot be negative')
  }

  return errors
})

function saveCharacter() {
  if (formErrors.value.length > 0) return

  formMessage.value = 'Character updated successfully'

  emit('save', {
    ...props.player,
    name: characterForm.name,
    class: characterForm.class,
    strength: characterForm.strength,
    agility: characterForm.agility,
    baseDamage: characterForm.baseDamage
  });
}

function reset() {
  characterForm.name = props.player.name;
  characterForm.class = props.player.class;
  characterForm.strength = props.player.strength;
  characterForm.agility = props.player.agility;
  characterForm.baseDamage = props.player.baseDamage;
}

</script>

<template>
  <h3>Character Editor</h3>
  <label>
    Name: <input type="text" v-model="characterForm.name"/>
  </label>

  <label>
    Character Class:
    <select v-model="characterForm.class">
      <option v-for="option in availableClasses" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </label>

  <label>
    Strength:
    <input type="number" v-model.number="characterForm.strength"/>
  </label>

  <label>
    Agility:
    <input type="number" v-model.number="characterForm.agility"/>
  </label>

  <label>
    Damage:
    <input type="number" v-model.number="characterForm.baseDamage"/>
  </label>

  <ul v-if="formErrors.length > 0">
    <li v-for="(error, index) in formErrors" :key="index">
      {{ error }}
    </li>
  </ul>

  <p v-if="formMessage">{{ formMessage }}</p>

  <button @click="saveCharacter" :disabled="formErrors.length > 0">Save</button>
  <button @click="reset">Reset</button>
</template>