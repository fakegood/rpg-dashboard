import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {INVENTORY_STORAGE_KEY, Item, Search, ShopItem} from "../types/game";
import {usePlayerStore} from "./player";
import {ITEM_CATALOG} from "../data/items";

export const useInventoryStore = defineStore('inventory', () => {

    const playerStore = usePlayerStore();

    function loadStoredInventory(): Item[] | null {
        const raw = localStorage.getItem(INVENTORY_STORAGE_KEY)
        if (!raw) return null

        try {
            return JSON.parse(raw) as Item[]
        } catch {
            return null
        }
    }

    const inventory = ref<Item[]>(loadStoredInventory() ?? createDefaultInventory());

    function createDefaultInventory(): Item[] {
        return [
            { ...ITEM_CATALOG.steelSword, id: 1, equipped: false },
            { ...ITEM_CATALOG.chainArmor, id: 2, equipped: false },
            { ...ITEM_CATALOG.hpPotion, id: 3, equipped: false }
        ];
    }

    const inventorySearch = reactive<Search>({
        keyword: '',
        showEquippedOnly: false,
        showConsumableOnly: false,
    })

    const filteredInventory = computed(() => {
        const searchValue = inventorySearch.keyword.trim().toLowerCase();
        if (!searchValue && !inventorySearch.showEquippedOnly && !inventorySearch.showConsumableOnly) {
            return inventory.value;
        }

        return inventory.value.filter((item: Item) => {
            const matchesSearch =
                !searchValue ||
                item.name.toLowerCase().includes(searchValue) ||
                item.type.toLowerCase().includes(searchValue)

            const matchesEquipped =
                !inventorySearch.showEquippedOnly || item.equipped

            const matchesConsumable =
                !inventorySearch.showConsumableOnly || item.type === 'Consumable'

            return matchesSearch && matchesEquipped && matchesConsumable
        });
    });

    function findEquippedItem(type: 'Weapon' | 'Armor') {
        return inventory.value.find((item: Item) => item.equipped && item.type === type);
    }

    const equippedWeaponBonus = computed(() => {
        const equippedWeapon = findEquippedItem('Weapon');

        if (!equippedWeapon)
            return 0;

        const weaponDamageEffect = equippedWeapon.effects.find((effect) => effect.stat === 'weaponDamage');

        return weaponDamageEffect ? weaponDamageEffect.value : 0;
    })

    const equippedArmorBonus = computed(() => {
        const equippedArmor = findEquippedItem('Armor');

        if (!equippedArmor)
            return 0;

        const defenseEffect = equippedArmor.effects.find((effect) => effect.stat === 'defense');

        return defenseEffect ? defenseEffect.value : 0;
    })

    function equipItem(itemId: number) {
        for (let i = 0; i < inventory.value.length; i++) {
            if (inventory.value[i].id === itemId) {

                const itemType = inventory.value[i].type;
                if (itemType !== 'Consumable') {
                    const equippedType = findEquippedItem(itemType);
                    if (equippedType) {
                        equippedType.equipped = false;
                    }
                }

                inventory.value[i].equipped = true;
                break;
            }
        }
    }

    function unequipItem(itemId: number) {
        for (let i = 0; i < inventory.value.length; i++) {
            if (inventory.value[i].id === itemId) {
                inventory.value[i].equipped = false;
                break;
            }
        }
    }

    function addItem(item: Item) {
        const {id, ...rest} = item;
        inventory.value.push({
            ...rest,
            id: Date.now()
        });
    }

    function removeItem(itemId: number) {
        const index = inventory.value.findIndex((item) => item.id === itemId);
        if (index >= 0) {
            inventory.value.splice(index, 1);
        }
    }

    function useConsumable(itemId: number) {
        const item = inventory.value.find((item) => item.id === itemId);
        if (!item)
            return;

        if (item.type !== 'Consumable')
            return;

        let used = false;

        for (const effect of item.effects) {
            if (effect.stat === 'hp' && playerStore.player.hp < playerStore.maxHp) {
                playerStore.restoreHp(effect.value);
                used = true;
            }

            if (effect.stat === 'mp' && playerStore.player.mp < playerStore.maxMp) {
                playerStore.restoreMp(effect.value);
                used = true;
            }
        }

        if (used) {
            removeItem(itemId);
        }
    }

    function clearInventoryData() {
        localStorage.removeItem(INVENTORY_STORAGE_KEY);
        resetInventoryState();
    }

    function resetInventoryState() {
        inventory.value = createDefaultInventory();
        inventorySearch.keyword = '';
        inventorySearch.showConsumableOnly = false;
        inventorySearch.showEquippedOnly = false;
    }

    watch(
        inventory,
        (newInventory: Item[]) => {
            localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(newInventory))
        },
        {deep: true}
    );

    return {
        inventory,
        filteredInventory,
        inventorySearch,
        equippedWeaponBonus,
        equippedArmorBonus,
        findEquippedItem,
        equipItem,
        unequipItem,
        addItem,
        useConsumable,
        clearInventoryData
    }
});