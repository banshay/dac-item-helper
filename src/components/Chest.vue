<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    Chest
  </span>
  <DropArea v-if="items.length === 0" @click="modal = true">
    <Modal
      v-if="modal"
      :icon-mode="true"
      :show-source="false"
      :selectionAmount="selectionAmount"
      @modalClosed="modal = false"
      @selectionHit="fillChest"
    />
  </DropArea>
  <div v-else class="flex">
    <Item
      v-for="item in items"
      :key="item.name"
      :item="item"
      class="bg-nord3"
      @click="chooseItemFromChest(item.name)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue'
import Modal from '@/components/Modal.vue'
import Item from '@/components/Item.vue'
import useInventory from '@/hooks/inventory'
import DropArea from '@/components/DropArea.vue'
import useSelection from '@/hooks/selection'

export default defineComponent({
  name: 'Chest',
  components: { DropArea, Item, Modal },
  emits: ['chestOpen'],
  setup() {
    provide('showSource', false)
    provide('iconMode', true)
    provide('multiSelect', false)

    const { addToInventory } = useInventory()
    const { getAllSelected, clearAllSelection } = useSelection()

    const selectionAmount = 3
    const chest = reactive({
      items: [],
      modal: false,
    })

    const chooseItemFromChest = (itemName: string) => {
      chest.items = []
      addToInventory(itemName)
    }

    const fillChest = () => {
      Object.assign(chest.items, getAllSelected.value)
      chest.modal = false
      clearAllSelection()
    }

    return {
      ...toRefs(chest),
      selectionAmount,
      addToInventory,
      chooseItemFromChest,
      fillChest,
    }
  },
})
</script>

<style scoped></style>
