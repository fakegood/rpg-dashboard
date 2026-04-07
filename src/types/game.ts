import {usePlayer} from "../composables/usePlayer";
import {useInventory} from "../composables/useInventory";
import {useShop} from "../composables/useShop";

export type Player = Unit & {
    gold: number
}

export type Unit = {
    name: string,
    class: 'Knight' | 'Archer' | 'Magician',
    hp: number,
    mp: number,
    strength: number,
    agility: number,
    baseDamage: number,
    state: 'Idle' | 'Dead'
}

export type Item = {
    id: number,
    name: string,
    type: 'Weapon' | 'Armor' | 'Consumable',
    rarity: number,
    equipped: boolean,
    effects: Effect[]
}

export type Effect = {
    stat: string,
    value: number
}

export type Search = {
    keyword: string;
    showEquippedOnly: boolean;
    showConsumableOnly: boolean
}

export type ShopItem = Item & {
    price: number
}

export type Quest = {
    id: number
    title: string
    body: string
}

export const INVENTORY_STORAGE_KEY = 'rpg-dashboard-inventory'
export const PLAYER_STORAGE_KEY = 'rpg-dashboard-player'