<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    I can craft this
  </span>
  <div
    class="align-middle border-dashed border-nord8 rounded-md border-4 m-2 h-full"
  >
    <Craftable v-for="item in craftable" :key="item.name" :item="item" />
  </div>
</template>

<script lang="ts">
import { computed, DeepReadonly, defineComponent, provide } from 'vue'
import useInventory from '@/hooks/inventory'
import useItems from '@/hooks/items'
import { ItemSelection } from '@/hooks/itemSelection'
import Craftable from '@/components/Craftable.vue'

export default defineComponent({
  name: 'Craftlist',
  components: { Craftable },
  setup() {
    provide('showSource', true)
    provide('iconMode', true)
    provide('multiSelect', false)

    const { chest, inventory } = useInventory()
    const { canMake, items } = useItems()

    const findCraftable = (possession: DeepReadonly<ItemSelection[]>) =>
      items.filter(item => {
        console.group(item.name)
        const ret = item.sources && canMake(item, possession)
        console.groupEnd()
        return ret
      })

    const craftable = computed(() => {
      const inv = inventory()
      const chestItems = chest()

      const base = inv.length ? findCraftable(inv) : []
      const set1 = chestItems.length
        ? findCraftable([...inv, chestItems[0]])
        : []
      const set2 = chestItems.length
        ? findCraftable([...inv, chestItems[1]])
        : []
      const set3 = chestItems.length
        ? findCraftable([...inv, chestItems[2]])
        : []

      return [...new Set([...base, ...set1, ...set2, ...set3])].sort((a, b) =>
        a.tier > b.tier ? 1 : 0
      )
    })

    return {
      craftable,
    }
  },
})
</script>

<style scoped></style>
