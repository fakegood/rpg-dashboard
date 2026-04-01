import { createRouter, createWebHistory } from 'vue-router'
import PlayerView from '../views/PlayerView.vue'
import ShopView from '../views/ShopView.vue'
import InventoryView from '../views/InventoryView.vue'
import QuestView from '../views/QuestView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/player' },
        { path: '/player', component: PlayerView },
        { path: '/shop', component: ShopView },
        { path: '/inventory', component: InventoryView },
        { path: '/quests', component: QuestView }
    ]
})

export default router