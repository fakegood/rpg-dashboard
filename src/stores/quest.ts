import {defineStore} from "pinia";
import {ref} from "vue";
import type {Quest, ShopItem} from "../types/game";
import {usePlayerStore} from "./player";
import {useInventoryStore} from "./inventory";
import {ITEM_CATALOG} from "../data/items";

export const useQuestStore = defineStore('quest', () => {

    const playerStore = usePlayerStore();
    const inventoryStore = useInventoryStore();

    const quests = ref<Quest[]>([]);
    const isLoading = ref(false);
    const loadError = ref('');
    const questMessage = ref('');

    async function loadQuests() {
        isLoading.value = true;
        loadError.value = '';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
            if (!response.ok) {
                throw new Error('Failed to fetch quests');
            }

            quests.value = await response.json();
        } catch (error) {
            loadError.value = error instanceof Error ? error.message : 'Unknown error';
        } finally {
            isLoading.value = false;
        }
    }

    function createQuestReward(item: ShopItem): ShopItem {
        return {
            ...item, price: 0
        }
    }

    function completeQuest(questId: number) {
        const quest = quests.value.find((quest) => quest.id === questId);
        if (!quest)
            return;

        const questReward = 20 + quest.id;
        let rewardName = '';
        playerStore.earnGold(questReward);

        if (quest.id % 2 === 1) {
            const questItemReward = createQuestReward(ITEM_CATALOG.hpPotion);
            inventoryStore.addItem(questItemReward);
            rewardName = questItemReward.name;
        } else {
            const questItemReward = createQuestReward(ITEM_CATALOG.manaPotion);
            inventoryStore.addItem(questItemReward);
            rewardName = questItemReward.name;
        }

        quests.value = quests.value.filter((quest) => quest.id !== questId);
        setCompleteMessage(quest.title, questReward, rewardName);
    }

    function setCompleteMessage(questName: string, rewardAmount: number, additionalReward: string) {
        if (additionalReward)
            questMessage.value = `Completed quest ${questName}, received ${rewardAmount} gold(s) and ${additionalReward}`;
        else
            questMessage.value = `Completed quest ${questName}, received ${rewardAmount} gold(s).`;
        setTimeout(() => questMessage.value = '', 3000);
    }

    function resetQuestState() {
        quests.value = [];
        isLoading.value = false;
        loadError.value = '';
        questMessage.value = '';
    }

    return {
        quests,
        isLoading,
        loadError,
        questMessage,
        loadQuests,
        completeQuest,
        resetQuestState,
    }
})