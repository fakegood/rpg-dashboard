import {defineStore} from "pinia";
import {ref} from "vue";
import {Quest} from "../types/game";
import {usePlayerStore} from "./player";

export const useQuestStore = defineStore('quest', () => {

    const playerStore = usePlayerStore();

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

    function completeQuest(questId: number) {
        const quest = quests.value.find((quest) => quest.id === questId);
        if (!quest)
            return;

        const questReward = quest.id;
        playerStore.earnGold(questReward);

        quests.value = quests.value.filter((quest) => quest.id !== questId);
        setCompleteMessage(quest);
    }

    function setCompleteMessage(quest: Quest) {
        questMessage.value = `Completed quest ${quest.title}, received ${quest.id} gold(s).`;
        setTimeout(() => questMessage.value = '', 3000);
    }

    return {
        quests,
        isLoading,
        loadError,
        questMessage,
        loadQuests,
        completeQuest,
    }
})