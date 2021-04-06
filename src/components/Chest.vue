<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    Chest
  </span>
  <DropArea v-if="chest().length === 0" @click="modal = true">
    <Modal
      v-if="modal"
      :icon-mode="true"
      :show-source="false"
      :selectionAmount="selectionAmount"
      @modalClosed="closeModal"
      @selectionHit="fillChest"
    />
  </DropArea>
  <div v-else class="flex">
    <Item
      v-for="item in chest()"
      :key="item.name"
      :item="item"
      class="bg-nord3"
      @click="chooseItemFromChest(item)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue'
import Modal from '@/components/Modal.vue'
import Item from '@/components/Item.vue'
import useInventory from '@/hooks/inventory'
import DropArea from '@/components/DropArea.vue'
import useSelection, { ItemSelection } from '@/hooks/itemSelection.ts'

export default defineComponent({
  name: 'Chest',
  components: { DropArea, Item, Modal },
  emits: ['chestOpen'],
  setup() {
    provide('showSource', false)
    provide('iconMode', true)
    provide('multiSelect', false)
    provide('tags', ['chestDrop'])

    const { addToInventory, addAllToChest, clearChest, chest } = useInventory()
    const { getAllSelected, clearAllSelection } = useSelection()

    const selectionAmount = 3
    const state = reactive({
      modal: false,
    })

    const chooseItemFromChest = (item: ItemSelection) => {
      clearChest()
      addToInventory(item)
    }

    const fillChest = () => {
      addAllToChest(getAllSelected.value)
      state.modal = false
      clearAllSelection()
    }

    const closeModal = () => {
      state.modal = false
      clearAllSelection()
    }

    return {
      ...toRefs(state),
      selectionAmount,
      addToInventory,
      chooseItemFromChest,
      fillChest,
      closeModal,
      chest,
    }
  },
})
</script>

<style scoped></style>
