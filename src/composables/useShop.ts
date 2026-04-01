import {ref} from "vue";
import {ShopItem} from "../types/game";

type ShopPlayerDependency = {
    player: {
        gold: number
    }
    useGold: (amount: number) => void
}

type ShopInventoryDependency = {
    addItem: (item: ShopItem) => void
}

export function useShop(player: ShopPlayerDependency, inventory: ShopInventoryDependency) {
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
            effects: [{stat: 'Weapon Damage', value: 10}]
        },
        {
            id: 102,
            name: 'Chain Armor',
            type: 'Armor',
            rarity: 2,
            equipped: false,
            price: 35,
            effects: [{stat: 'Defense', value: 4}]
        },
        {
            id: 103,
            name: 'Mana Potion',
            type: 'Consumable',
            rarity: 1,
            equipped: false,
            price: 15,
            effects: [{stat: 'MP', value: 20}]
        }
    ])

    function buyItem(itemId: number) {
        const item = shopItems.value.find((shopItem: ShopItem) => shopItem.id === itemId)
        if (!item) return;

        if (player.player.gold < item.price) {
            setShopMessage('Not enough gold', 'error');
            return;
        }

        inventory.addItem(item);

        player.useGold(item.price);

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
}