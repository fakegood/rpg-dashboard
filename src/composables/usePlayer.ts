import {Player} from "../types/game";
import {computed, reactive, ref, watch} from "vue";

export function usePlayer() {
    const PLAYER_STORAGE_KEY = 'rpg-dashboard-player'

    const maxHp = 100;
    const damageValue = 10;
    const healValue = 10;

    const maxMp = 100;
    const magicCost = 10;
    const magicRegen = 10;

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
            gold: 100
        });

    const totalDamage = computed(() => (player.strength * 2) + player.baseDamage + classBonusDamage(player));
    const criticalChance = computed(() => (player.agility * 0.5) + classBonusCritical(player));

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

    function useGold(amount: number) {
        player.gold -= amount;
    }

    function savePlayer(formPlayer: Player) {
        player.name = formPlayer.name;
        player.class = formPlayer.class;
        player.strength = formPlayer.strength;
        player.agility = formPlayer.agility;
        player.baseDamage = formPlayer.baseDamage;
    }

    function resetPlayer() {
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
        heal,
        revive,
        useSkill,
        regenMagic,
        resetStats,
        savePlayer,
        useGold,
        resetPlayer
    }
}