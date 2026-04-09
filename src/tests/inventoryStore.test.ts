import {describe, it, expect, beforeEach} from 'vitest'
import {setupTestPinia} from './test-utils'
import {useInventoryStore} from '../stores/inventory'
import {usePlayerStore} from '../stores/player'

describe('inventoryStore', () => {
    beforeEach(() => {
        setupTestPinia()
        localStorage.clear()
    })

    it('uses HP potion and restores player HP', () => {
        const playerStore = usePlayerStore()
        const inventoryStore = useInventoryStore()

        playerStore.player.hp = 50

        const hpPotion = inventoryStore.inventory.find(
            (item) => item.type === 'Consumable' && item.effects.some((effect) => effect.stat === 'hp')
        )

        expect(hpPotion).toBeTruthy()

        inventoryStore.useConsumable(hpPotion!.id)

        expect(playerStore.player.hp).toBe(60)
        expect(inventoryStore.inventory.find((item) => item.id === hpPotion!.id)).toBeFalsy()
    })

    it('does not consume HP potion if HP is already full', () => {
        const playerStore = usePlayerStore()
        const inventoryStore = useInventoryStore()

        playerStore.player.hp = playerStore.maxHp

        const hpPotion = inventoryStore.inventory.find(
            (item) => item.type === 'Consumable' && item.effects.some((effect) => effect.stat === 'hp')
        )

        expect(hpPotion).toBeTruthy()

        inventoryStore.useConsumable(hpPotion!.id)

        expect(playerStore.player.hp).toBe(playerStore.maxHp)
        expect(inventoryStore.inventory.find((item) => item.id === hpPotion!.id)).toBeTruthy()
    })
})