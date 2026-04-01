<script setup lang="ts">

import QuestBoard from "../components/QuestBoard.vue";
import type {usePlayer} from "../composables/usePlayer";
import type {useInventory} from "../composables/useInventory";
import type {useShop} from "../composables/useShop";

type ViewProps = {
  localPlayer: ReturnType<typeof usePlayer>
  localInventory: ReturnType<typeof useInventory>
  localShop: ReturnType<typeof useShop>
  startingZone: string
}

defineProps<ViewProps>()
</script>

<template>
  <QuestBoard/>
</template>