import {Item, Unit} from "../types/game";
import {computed, ref} from "vue";

export function createUnit(unitName: string, hp: number, mp: number, inventory: Item[]) {

    const maxHp = hp;
    const maxMp = mp;

    const unit = ref<Unit>({
        name: unitName,
        class: 'Knight',
        hp: maxHp,
        mp: maxMp,
        strength: 10,
        agility: 0,
        baseDamage: 10,
        state: 'Idle',
    });

    const unitInventory = computed(() => inventory);

    const totalDamage = computed(() => unit.value.baseDamage);

    function heal(amount: number) {
        unit.value.hp += amount;
        if (unit.value.hp > maxHp) {
            unit.value.hp = maxHp;
        }
    }

    function applyDamage(amount: number) {
        unit.value.hp -= Math.max(0, amount - unit.value.agility);
        if (unit.value.hp <= 0) {
            unit.value.hp = 0;
            unit.value.state = 'Dead';
        }
    }

    function revive() {
        unit.value.hp = maxHp;
        unit.value.mp = maxMp;
    }

    return {
        unit,
        totalDamage,
        maxHp,
        maxMp,
        unitInventory,
        heal,
        applyDamage,
        revive
    }
}