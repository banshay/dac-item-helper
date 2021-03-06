<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 text-primary flex flex-wrap p-5 content-start"
  >
    <div class="w-1/5 m-2 h-32 bg-nord1">
      <Chest @chestOpen="chestModal = true" />
    </div>
    <div class="m-2 h-32 bg-nord1 flex-grow">
      <Inventory />
    </div>
    <div class="w-3/4 m-2 bg-nord1 h-4/5 flex flex-col h-5/6">
      <Craftlist />
    </div>
    <div
      class="bg-nord1 w-1/5 m-2 flex flex-col flex-grow overflow-y-auto min-h-0 h-5/6"
    >
      <PotentialItems />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chest from '@/components/Chest.vue'
import Inventory from '@/components/Inventory.vue'
import Craftlist from '@/components/Craftlist.vue'
import PotentialItems from '@/components/PotentialItems.vue'

export default defineComponent({
  name: 'App',
  components: {
    PotentialItems,
    Craftlist,
    Inventory,
    Chest,
  },
  setup() {
    return {}
  },
})
</script>

<style></style>
