<template>
  <div class="flex text-primary flex-wrap h-full p-5 content-start">
    <div class="container w-1/5 m-3 h-32 bg-nord1">
      <Chest @chestOpen="chestModal = true" />
    </div>
    <div class="container m-3 h-32 bg-nord1">
      <Inventory />
    </div>
    <div class="container w-1/5 m-3 bg-nord1 h-4/5 flex flex-col">
      <Craftlist />
    </div>
    <div class="container bg-nord1 w-3/4 m-3 flex flex-col">
      <!--      <PotentialItems />-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chest from '@/components/Chest.vue'
import Inventory from '@/components/Inventory.vue'
import Craftlist from '@/components/Craftlist.vue'

export default defineComponent({
  name: 'App',
  components: {
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
