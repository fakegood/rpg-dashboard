import {describe, it, expect, beforeEach} from 'vitest'
import {setupTestPinia} from './test-utils'
import {useQuestStore} from '../stores/quest'
import {usePlayerStore} from '../stores/player'
import {useInventoryStore} from '../stores/inventory'

describe('questStore', () => {
    beforeEach(() => {
        setupTestPinia()
        localStorage.clear()
    })

    it('completes quest and rewards gold', () => {
        const questStore = useQuestStore()
        const playerStore = usePlayerStore()

        questStore.quests = [
            {id: 1, title: 'Test Quest', body: 'Test body'}
        ]

        const startingGold = playerStore.player.gold

        questStore.completeQuest(1)

        expect(playerStore.player.gold).toBeGreaterThan(startingGold)
        expect(questStore.quests.length).toBe(0)
        expect(questStore.questMessage).toContain('Completed quest')
    })

    it('completes odd quest and rewards an HP potion', () => {
        const questStore = useQuestStore()
        const inventoryStore = useInventoryStore()

        questStore.quests = [
            {id: 1, title: 'Potion Quest', body: 'Test body'}
        ]

        const beforeCount = inventoryStore.inventory.length

        questStore.completeQuest(1)

        expect(inventoryStore.inventory.length).toBe(beforeCount + 1)

        const rewardedPotion = inventoryStore.inventory[inventoryStore.inventory.length - 1]
        expect(rewardedPotion.name).toBe('HP Potion')
    })
})