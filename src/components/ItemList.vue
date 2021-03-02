<template>
  <div class="flex flex-col">
    <template v-for="i in 5" :key="i">
      <span class="uppercase tracking-wider text-nord8">Tier {{ i }}</span>
      <div class="flex flex-row flex-wrap justify-start content-start">
        <Item
          v-for="item in itemsByTier(i)"
          :key="item.name"
          :item="item"
          :selected="isSelected(item.name)"
          @click="selectItem(item.name)"
          @contextmenu.prevent="clearSelection(item.name)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Item from '@/components/Item.vue'
import { items } from '@/data/items'
import useItems from '@/hooks/items'
import useSelection from '@/hooks/selection'

export default defineComponent({
  name: 'ItemList',
  components: {
    Item,
  },
  setup() {
    const { itemsByTier } = useItems()
    const boa = items.find(item => item.name === 'blades-of-attack')
    const { isSelected, select, clearSelection } = useSelection()
    const multiSelect = inject('multiSelect')

    const selectItem = (itemName: string) => {
      if (multiSelect) {
        select(itemName)
      } else if (!isSelected(itemName)) {
        select(itemName)
      }
    }

    return { boa, itemsByTier, isSelected, selectItem, clearSelection }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
