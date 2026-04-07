import {defineStore} from "pinia";
import {Player, PLAYER_STORAGE_KEY} from "../types/game";
import {computed, reactive, watch} from "vue";
import {useInventoryStore} from "./inventory";

export const usePlayerStore = defineStore('player', () => {

    const maxHp = 100;

    const maxMp = 100;
    const magicCost = 10;

    const inventoryStore = useInventoryStore();

    function loadStoredPlayer(): Player | null {
        const raw = localStorage.getItem(PLAYER_STORAGE_KEY)
        if (!raw) return null

        try {
            return JSON.parse(raw) as Player
        } catch {
            return null
        }
    }

    const storedPlayer = loadStoredPlayer()

    const player = reactive<Player>(storedPlayer ??
        {
            name: 'fakegood',
            class: 'Knight',
            hp: maxHp,
            mp: maxMp,
            strength: 12,
            agility: 10,
            baseDamage: 5,
            gold: 100,
            state: 'Idle'
        });

    const totalDamage = computed(() => (player.strength * 2) + player.baseDamage + inventoryStore.equippedWeaponBonus + classBonusDamage(player));
    const criticalChance = computed(() => (player.agility * 0.5) + classBonusCritical(player));

    function takeDamage(damageValue: number) {
        const receivedDamage = Math.max(0, damageValue - inventoryStore.equippedArmorBonus);
        player.hp -= receivedDamage;
        if (player.hp <= 0) {
            player.hp = 0;
            died();
        }
    }

    function restoreHp(amount: number) {
        player.hp += amount;
        if (player.hp > maxHp) {
            player.hp = maxHp;
        }
    }

    function died() {

    }

    function revive() {
        player.hp = maxHp;
    }

    function useSkill() {
        player.mp -= magicCost;
        if (player.mp <= 0) {
            player.mp = 0;
        }
    }

    function restoreMp(amount: number) {
        player.mp += amount;
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

    function spendGold(amount: number) {
        player.gold -= amount;
    }

    function earnGold(amount: number) {
        player.gold += amount;
    }

    function savePlayer(formPlayer: Player) {
        player.name = formPlayer.name;
        player.class = formPlayer.class;
        player.strength = formPlayer.strength;
        player.agility = formPlayer.agility;
        player.baseDamage = formPlayer.baseDamage;
    }

    function clearPlayerData() {
        localStorage.removeItem(PLAYER_STORAGE_KEY)
    }

    watch(
        player,
        (newPlayer: Player) => {
            localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(newPlayer))
        },
        {deep: true}
    );

    return {
        player,
        totalDamage,
        criticalChance,
        maxHp,
        maxMp,
        magicCost,
        takeDamage,
        restoreHp,
        revive,
        useSkill,
        restoreMp,
        resetStats,
        savePlayer,
        spendGold,
        earnGold,
        clearPlayerData
    }
})