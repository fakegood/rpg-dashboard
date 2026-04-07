import {defineStore} from "pinia";
import {ref} from "vue";
import {usePlayerStore} from "./player";
import {createUnit} from "./unit";

export const useBattleStore = defineStore('battle', () => {

    const battleState = ref<'Init' | 'PlayerTurn' | 'EnemyTurn' | 'EndTurn' | 'Game' | 'End'>('Init');
    const playerStore = usePlayerStore();

    const boss = createUnit("Abu", 100, 100);

    const battleResult = ref<'Win' | 'Lose' | 'Tie' | ''>();

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
                boss.revive();
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
                } else if (boss.unit.value.hp > 0) {
                    battleResult.value = 'Lose';
                } else {
                    battleResult.value = 'Tie';
                }
                break;
        }
    }

    function playerAction(action: 'Attack' | 'RestoreHeal' | 'RestoreMana' | 'Run') {
        switch (action) {
            case "Attack":
                boss.applyDamage(playerStore.totalDamage);
                break;
            case "RestoreHeal":
                playerStore.restoreHp(10);
                break;
            case "RestoreMana":
                playerStore.restoreMp(10);
                break;
            case "Run":
                break;
        }

        checkEndCondition();
    }

    function enemyAction() {
        const dice = Math.random() * 100;
        if (dice >= 50) {
            playerStore.takeDamage(boss.totalDamage.value);
        } else {
            playerStore.takeDamage(boss.totalDamage.value * 0.5);
        }

        checkEndCondition();
    }

    function checkEndCondition() {
        if (playerStore.player.hp <= 0 || boss.unit.value.hp <= 0) {
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
        playerAction
    }
})