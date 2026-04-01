import {ref} from "vue";

export type Player = {
    name: string,
    class: string,
    hp: number,
    mp: number,
    strength: number,
    agility: number,
    baseDamage: number,
    gold: number
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