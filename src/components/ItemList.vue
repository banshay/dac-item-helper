<template>
  <div class="flex flex-col">
    <template v-for="i in maxTier" :key="i">
      <span class="uppercase tracking-wider text-nord8">Tier {{ i }}</span>
      <div class="flex flex-row flex-wrap justify-start content-start">
        <ItemComponent
          v-for="item in itemsByTier(i)"
          :key="item.name"
          :item="item"
          :selected="isSelected(item.name)"
          :amount-selected="getAmount(item.name)"
          @click="selectItem(item.name)"
          @contextmenu.prevent="clearSelection(item.name)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import ItemComponent from '@/components/Item.vue'
import useItems from '@/hooks/items'
import useSelection from '@/hooks/itemSelection.ts'

export default defineComponent({
  name: 'ItemList',
  components: {
    ItemComponent,
  },
  setup() {
    const { itemsByTag, getAllItems } = useItems()
    const { isSelected, select, clearSelection, getAmount } = useSelection()
    const multiSelect = inject('multiSelect')
    const tags = inject('tags', [])

    const items = computed(() =>
      tags.length ? itemsByTag(tags) : getAllItems()
    )

    const maxTier = computed(() =>
      items.value.reduce((acc, current) => {
        if (current.tier > acc) {
          return current.tier
        }
        return acc
      }, 0)
    )

    const itemsByTier = (tier: number) =>
      items.value.filter(item => item.tier === tier)

    const selectItem = (itemName: string) => {
      if (multiSelect) {
        select(itemName)
      } else if (!isSelected(itemName)) {
        select(itemName)
      }
    }

    return {
      items,
      itemsByTier,
      isSelected,
      selectItem,
      clearSelection,
      getAmount,
      maxTier,
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
