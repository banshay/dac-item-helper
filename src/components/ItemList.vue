<template>
  <div class="grid grid-cols-5 gap-6 m-5 text-primary">
    <div v-for="i in 5" :key="i">
      <p>Tier {{ i }}</p>
      <Item
        v-for="item in itemsByTier(i)"
        :key="item.name"
        :item="item"
        :selected="isSelected(item.name)"
        @click="select(item.name)"
        @contextmenu="clear(item.name, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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

    const clear = (name: string, event: Event) => {
      event.preventDefault()
      clearSelection(name)
    }

    return { boa, itemsByTier, select, isSelected, clear }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
