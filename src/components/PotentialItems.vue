<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    Your potential
  </span>
  <div
    class="align-middle border-dashed border-nord8 rounded-md border-4 m-2 h-full overflow-y-auto"
  >
    <ItemComponent
      v-for="item in potentials"
      :key="item.name"
      :item="item"
      class="relative w-1/5 p-2"
    />
  </div>
</template>

<script lang="ts">
import { computed, DeepReadonly, defineComponent, provide } from 'vue'
import ItemComponent from '@/components/Item.vue'
import useItems from '@/hooks/items'
import useInventory from '@/hooks/inventory'
import { ItemSelection } from '@/hooks/itemSelection'

export default defineComponent({
  name: 'PotentialItems',
  components: {
    ItemComponent,
  },
  setup() {
    provide('showSource', true)
    provide('iconMode', true)
    provide('multiSelect', false)

    const { chest, inventory } = useInventory()
    const { items, canMakePartial, itemNames } = useItems()

    const findPotentials = (possession: string[]) =>
      items.filter(item => item.sources && canMakePartial(item, possession))

    const potentials = computed(() => {
      const inv = inventory()
      const chestItems = chest()
      if (!inv.length && !chestItems.length) {
        return []
      }
      const base = findPotentials(itemNames(inv))
      const set1 = findPotentials(itemNames([...inv, chestItems[0]]))
      const set2 = findPotentials(itemNames([...inv, chestItems[1]]))
      const set3 = findPotentials(itemNames([...inv, chestItems[2]]))

      return [...new Set([...base, ...set1, ...set2, ...set3])].sort((a, b) =>
        a.tier > b.tier ? 1 : 0
      )
    })

    return { potentials }
  },
})
</script>

<style scoped></style>
