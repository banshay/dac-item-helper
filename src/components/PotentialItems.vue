<template>
  <div class="flex flex-wrap">
    <Item
      v-for="item in potentials"
      :key="item.name"
      :item="item"
      class="relative"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Item from '@/components/Item.vue'
import useItems from '@/hooks/items'

export default defineComponent({
  name: 'PotentialItems',
  components: {
    Item,
  },
  setup() {
    const { getAllPotentialMakes } = useItems()
    const potentials = computed(() => getAllPotentialMakes())

    return { potentials }
  },
})
</script>

<style scoped></style>
