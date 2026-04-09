import {describe, it, expect, beforeEach} from 'vitest'
import {setupTestPinia} from './test-utils'
import {useInventoryStore} from '../stores/inventory'
import {usePlayerStore} from '../stores/player'

describe('playerStore', () => {
    beforeEach(() => {
        setupTestPinia()
        localStorage.clear()
    })

    it('increases total damage when weapon is equipped', () => {
        const inventoryStore = useInventoryStore()
        const playerStore = usePlayerStore()

        const baseDamage = playerStore.totalDamage

        const weapon = inventoryStore.inventory.find((item) => item.type === 'Weapon')
        expect(weapon).toBeTruthy()

        inventoryStore.equipItem(weapon!.id)

        expect(playerStore.totalDamage).toBeGreaterThan(baseDamage)
    })
})