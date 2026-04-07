import {defineStore} from "pinia";
import {ref} from "vue";
import {ShopItem} from "../types/game";
import {usePlayerStore} from "./player";
import {useInventoryStore} from "./inventory";
import {ITEM_CATALOG} from "../data/items";

export const useShopStore = defineStore('shop', () => {
    const playerStore = usePlayerStore();
    const inventoryStore = useInventoryStore();

    const shopInfo = ref('');
    const shopStatus = ref<'success' | 'error' | 'warning' | ''>('')

    const shopItems = ref<ShopItem[]>([
        {...ITEM_CATALOG.steelSword},
        {...ITEM_CATALOG.chainArmor},
        {...ITEM_CATALOG.hpPotion},
        {...ITEM_CATALOG.manaPotion},
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