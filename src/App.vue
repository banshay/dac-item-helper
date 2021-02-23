<template>
  <div class="flex text-primary flex-wrap h-full p-5 content-start">
    <div class="container w-1/5 m-3 h-32 bg-nord1">
      <Chest @chestOpen="onToggleChestModal" />
    </div>
    <div class="container m-3 h-32 bg-nord1">
      <Inventory />
    </div>
    <div class="container w-1/5 m-3 bg-nord1 h-4/5 flex flex-col">
      <Craftlist />
    </div>
    <div class="container bg-nord1 w-3/4 m-3 flex flex-col">
      <PotentialItems />
    </div>
  </div>
  <dialog
    v-if="chestModal"
    open
    class="fixed top-3 left-3 w-5/6 h-5/6 bg-nord2 overflow-y-scroll flex flex-col"
  >
    <div class="w-full h-4 flex justify-end h-auto">
      <button
        class="bg-red-600 text-white h-12 w-32 text-xl uppercase tracking-wide"
        @click="closeModal"
      >
        Close
      </button>
    </div>
    <ItemList :showSource="false" :iconMode="true" />
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Chest from '@/components/Chest.vue'
import Inventory from '@/components/Inventory.vue'
import Craftlist from '@/components/Craftlist.vue'
import PotentialItems from '@/components/PotentialItems.vue'
import ItemList from '@/components/ItemList.vue'

export default defineComponent({
  name: 'App',
  components: {
    ItemList,
    PotentialItems,
    Craftlist,
    Inventory,
    Chest,
  },
  setup() {
    const chestModal = ref(false)

    const onToggleChestModal = (value: boolean) => (chestModal.value = value)
    const closeModal = () => {
      chestModal.value = false
      console.log('chestModal', chestModal.value)
    }

    return { chestModal, onToggleChestModal, closeModal }
  },
})
</script>

<style></style>
