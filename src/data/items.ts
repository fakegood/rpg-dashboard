import {ShopItem} from "../types/game";

export const ITEM_CATALOG = {
    hpPotion: {
        id: 1001,
        name: "HP Potion",
        type: "Consumable",
        rarity: 1,
        equipped: false,
        price: 15,
        effects: [{stat: "hp", value: 10}]
    },
    manaPotion: {
        id: 1002,
        name: "Mana Potion",
        type: "Consumable",
        rarity: 1,
        equipped: false,
        price: 15,
        effects: [{stat: "mp", value: 20}]
    },
    steelSword: {
        id: 1003,
        name: "Steel Sword",
        type: "Weapon",
        rarity: 2,
        equipped: false,
        price: 40,
        effects: [{stat: "weaponDamage", value: 10}]
    },
    chainArmor: {
        id: 1004,
        name: "Chain Armor",
        type: "Armor",
        rarity: 2,
        equipped: false,
        price: 35,
        effects: [{stat: "defense", value: 4}]
    }
} satisfies Record<string, ShopItem>