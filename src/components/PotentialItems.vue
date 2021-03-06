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

    const { chest, inventory } = useInventory()
    const { items, canMake } = useItems()

    const toNames = (selectionItems: DeepReadonly<ItemSelection[]>) =>
      selectionItems.filter(item => item).map(item => item.name)

    const findPotentials = (possession: string[], partial: boolean) => {
      return items.filter(
        item => item.sources && canMake(item.name, possession, partial)
      )
    }

    const potentials = computed(() => {
      const inv = inventory()
      const chestItems = chest()
      if (!inv.length && !chestItems.length) {
        return []
      }
      const base = findPotentials(toNames(inv), true)
      const set1 = findPotentials(toNames([...inv, chestItems[0]]), true)
      const set2 = findPotentials(toNames([...inv, chestItems[1]]), true)
      const set3 = findPotentials(toNames([...inv, chestItems[2]]), true)

      return new Set([...base, ...set1, ...set2, ...set3])
    })

    return { potentials }
  },
})
</script>

<style scoped></style>
