import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
import {INVENTORY_STORAGE_KEY, Item, Search, ShopItem} from "../types/game";

export const useInventoryStore = defineStore('inventory', () => {

    function loadStoredInventory(): Item[] | null {
        const raw = localStorage.getItem(INVENTORY_STORAGE_KEY)
        if (!raw) return null

        try {
            return JSON.parse(raw) as Item[]
        } catch {
            return null
        }
    }

    const storedInventory = loadStoredInventory()

    const inventory = ref<Item[]>(storedInventory ??
        [
            {
                id: 1,
                name: 'Sword',
                type: 'Weapon',
                rarity: 0,
                equipped: false,
                effects: [{stat: 'weaponDamage', value: 5}]
            },
            {id: 2, name: 'Armor', type: 'Armor', rarity: 0, equipped: false, effects: [{stat: 'defence', value: 1}]},
            {
                id: 3,
                name: 'HP Potion',
                type: 'Consumable',
                rarity: 0,
                equipped: false,
                effects: [{stat: 'hp', value: 10}]
            }
        ]);

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

    function equipItem(itemId: number) {
        for (let i = 0; i < inventory.value.length; i++) {
            if (inventory.value[i].id === itemId) {
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

    function addItem(item: ShopItem) {
        const {id, ...rest} = item;
        inventory.value.push({
            ...rest,
            id: Date.now()
        });
    }

    function clearInventoryData() {
        localStorage.removeItem(INVENTORY_STORAGE_KEY);
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
        equipItem,
        unequipItem,
        addItem,
        clearInventoryData
    }
});