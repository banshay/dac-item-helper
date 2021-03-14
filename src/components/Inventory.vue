<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    What I have goes here
  </span>
  <div class="flex items-center">
    <DropArea @click="modal = true">
      <Modal
        v-if="modal"
        :icon-mode="true"
        :show-source="false"
        @modalClosed="updateInventory"
      />
    </DropArea>
    <Item
      v-for="item in inventory()"
      :key="item.name"
      :item="item"
      class="bg-nord3"
      :amount-selected="item.amount"
      @contextmenu.prevent="removeFromInventory(item.name)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue'
import useInventory from '@/hooks/inventory'
import useSelection from '@/hooks/itemSelection.ts'
import DropArea from '@/components/DropArea.vue'
import Modal from '@/components/Modal.vue'
import Item from '@/components/Item.vue'

export default defineComponent({
  name: 'Inventory',
  components: { DropArea, Item, Modal },
  setup() {
    provide('iconMode', true)
    provide('showSource', false)
    provide('multiSelect', true)

    const { inventory, removeFromInventory, addToInventory } = useInventory()
    const { getAllSelected, clearAllSelection } = useSelection()

    const inv = reactive({
      modal: false,
    })

    const updateInventory = () => {
      getAllSelected.value.map(item => addToInventory(item))
      clearAllSelection()
      inv.modal = false
    }

    return { inventory, removeFromInventory, updateInventory, ...toRefs(inv) }
  },
})
</script>

<style scoped></style>
