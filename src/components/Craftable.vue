<template>
  <div class="flex">
    <ItemComponent :item="item" />
    <span v-if="destroy.length > 0">destroy: </span>
    <ItemComponent
      v-for="destroyItem in destroy"
      :key="`destroy_${destroyItem.name}`"
      :item="destroyItem"
    />
    <span>ingredients: </span>
    <ItemComponent
      v-for="ingredient in ingredients"
      :key="`ingredient_${ingredient.name}`"
      :item="ingredient"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, reactive, toRefs } from 'vue'
import ItemComponent from '@/components/Item.vue'
import { Item } from '@/data/items'
import useInventory from '@/hooks/inventory'
import useItems from '@/hooks/items'

interface State {
  destroy: Item[]
  chest: Item[]
  ingredients: Item[]
}

export default defineComponent({
  name: 'Craftable',
  components: { ItemComponent },
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props) {
    provide('showSource', false)

    const { inventory, chest } = useInventory()
    const { getItem, getItemAndRemove } = useItems()

    const state = reactive<State>({
      destroy: [],
      chest: [],
      ingredients: [],
    })

    const sources = props.item.sources || []
    let remaining = inventory()

    sources.forEach(source => {
      const item = getItem(source.name)

      const iterate = getItemAndRemove(item, remaining, source.amount)
      remaining = iterate.remaining
      if (iterate.toDestroy) {
        state.destroy.push(getItem(iterate.toDestroy.name))
      }

      for (let i = 0; i < source.amount; i++) {
        state.ingredients.push(item)
      }
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style scoped></style>
