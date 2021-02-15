<template>
  <div class="flex flex-wrap items-start space-x-4">
    <Item
      v-for="item in potentials"
      :key="item.name"
      :item="item"
      class="relative w-1/5 p-2"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Item from '@/components/Item.vue'
import useItems from '@/hooks/items'
import useSelection from '@/hooks/selection'

export default defineComponent({
  name: 'PotentialItems',
  components: {
    Item,
  },
  setup() {
    const { getAllPotentialMakes } = useItems()
    const { getAllSelected } = useSelection()

    const allSelected = computed(() => getAllSelected.value.map(i => i.name))
    const potentials = computed(() =>
      getAllPotentialMakes()
        .filter(i => !allSelected.value.includes(i.name))
        .sort((a, b) => (a.tier < b.tier ? -1 : 1))
    )

    return { potentials }
  },
})
</script>

<style scoped></style>
