import {defineStore} from "pinia";
import {ref} from "vue";
import {ShopItem} from "../types/game";
import {usePlayerStore} from "./player";
import {useInventoryStore} from "./inventory";

export const useShopStore = defineStore('shop', () => {
    const playerStore = usePlayerStore();
    const inventoryStore = useInventoryStore();

    const shopInfo = ref('');
    const shopStatus = ref<'success' | 'error' | 'warning' | ''>('')

    const shopItems = ref<ShopItem[]>([
        {
            id: 101,
            name: 'Steel Sword',
            type: 'Weapon',
            rarity: 2,
            equipped: false,
            price: 40,
            effects: [{stat: 'weaponDamage', value: 10}]
        },
        {
            id: 102,
            name: 'Chain Armor',
            type: 'Armor',
            rarity: 2,
            equipped: false,
            price: 35,
            effects: [{stat: 'defense', value: 4}]
        },
        {
            id: 103,
            name: 'HP Potion',
            type: 'Consumable',
            rarity: 1,
            equipped: false,
            price: 15,
            effects: [{stat: 'hp', value: 10}]
        },
        {
            id: 104,
            name: 'Mana Potion',
            type: 'Consumable',
            rarity: 1,
            equipped: false,
            price: 15,
            effects: [{stat: 'mp', value: 20}]
        }
    ])

    function buyItem(itemId: number) {
        const item = shopItems.value.find((shopItem) => shopItem.id === itemId)
        if (!item) return;

        if (playerStore.player.gold < item.price) {
            setShopMessage('Not enough gold', 'error');
            return;
        }

        inventoryStore.addItem(item);

        playerStore.spendGold(item.price);

        setShopMessage(`Purchased ${item.name}`, 'success');
    }

    function setShopMessage(message: string, type: 'success' | 'error' | 'warning') {
        shopInfo.value = message
        shopStatus.value = type

        setTimeout(() => {
            shopInfo.value = ''
            shopStatus.value = ''
        }, 3000)
    }

    return {
        shopItems,
        shopInfo,
        shopStatus,
        buyItem,
        setShopMessage
    }
});