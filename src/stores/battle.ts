import {defineStore} from "pinia";
import {ref} from "vue";
import {usePlayerStore} from "./player";
import {createUnit} from "./unit";
import {ITEM_CATALOG} from "../data/items";
import {useInventoryStore} from "./inventory";

export const useBattleStore = defineStore('battle', () => {

    const battleState = ref<'Init' | 'PlayerTurn' | 'EnemyTurn' | 'EndTurn' | 'Game' | 'End'>('Init');
    const playerStore = usePlayerStore();
    const inventoryStore = useInventoryStore();

    const boss = ref(createUnit("Abu", 100, 100, [{...ITEM_CATALOG.chainArmor}]));

    const battleResult = ref<'Win' | 'Lose' | 'Tie' | ''>('');
    const battleMessage = ref('');

    function init() {
        setBattleState('Init');
    }

    function setBattleState(state: 'Init' | 'PlayerTurn' | 'EnemyTurn' | 'EndTurn' | 'Game' | 'End') {
        battleState.value = state;
        processGameState();
    }

    function processGameState() {
        switch (battleState.value) {
            case 'Init':
                battleResult.value = '';
                boss.value = createUnit("Abu", 100, 100, [{...ITEM_CATALOG.chainArmor}]);
                playerStore.revive()

                setBattleState('Game');
                break;
            case 'Game':
                setBattleState('PlayerTurn');
                break;
            case 'PlayerTurn':
                break;
            case 'EnemyTurn':
                enemyAction();
                break;
            case 'EndTurn':
                setBattleState('Game');
                break;
            case 'End':
                if (playerStore.player.hp > 0) {
                    battleResult.value = 'Win';

                    const itemNames: string[] = [];
                    boss.value.unitInventory.forEach((item) => {
                        inventoryStore.addItem(item)

                        itemNames.push(item.name);
                    });

                    if (itemNames.length > 0) {
                        battleMessage.value = `Received ${itemNames.join(", ")}`;
                    }

                } else if (boss.value.unit.hp > 0) {
                    battleResult.value = 'Lose';
                } else {
                    battleResult.value = 'Tie';
                }
                break;
        }
    }

    function playerAction(action: 'Attack' | 'RestoreHeal' | 'RestoreMana' | 'Rest') {
        switch (action) {
            case "Attack":
                boss.value.applyDamage(playerStore.totalDamage);
                break;
            case "RestoreHeal":
                playerStore.restoreHp(10);
                break;
            case "RestoreMana":
                playerStore.restoreMp(10);
                break;
            case "Rest":
                playerStore.restoreHp(10);
                playerStore.restoreMp(10);
                break;
        }

        checkEndCondition();
    }

    function enemyAction() {
        const dice = Math.random() * 100;
        if (dice >= 50) {
            playerStore.takeDamage(boss.value.totalDamage);
        } else {
            playerStore.takeDamage(boss.value.totalDamage * 0.5);
        }

        checkEndCondition();
    }

    function checkEndCondition() {
        if (playerStore.player.hp <= 0 || boss.value.unit.hp <= 0) {
            setBattleState('End');
            return;
        }

        if (battleState.value === 'EnemyTurn')
            setBattleState('Game');
        else
            setBattleState('EnemyTurn');
    }

    return {
        playerStore,
        boss,
        init,
        battleState,
        battleResult,
        battleMessage,
        playerAction
    }
})