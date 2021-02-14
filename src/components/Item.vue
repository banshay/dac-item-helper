<template>
  <div
    class="bg-nord2 flex text-center mb-3 cursor-pointer select-none border-2 border-transparent text-primary"
    :class="{
      'border-yellow-500': selected,
      'border-2': selected,
    }"
  >
    <img :src="itemImage(item.name)" :alt="item.name" />
    <div class="w-screen flex justify-between">
      <div class="p-4">
        <p class="text-2xl font-black">
          {{ displayName }}
          <span v-if="amountSelected > 1">x{{ amountSelected }}</span>
        </p>
      </div>
      <div class="flex flex-row justify-around items-center pr-4">
        <img
          :key="sourceIcon"
          v-for="sourceIcon in sourceIcons"
          :src="itemImage(sourceIcon)"
          :alt="sourceIcon"
          class="w-14 h-14 p-1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Item } from '@/data/items'
import useTitleCase from '@/hooks/titleCase'
import useItems from '@/hooks/items'
import useSelection from '@/hooks/selection'

export default defineComponent({
  name: 'Item',
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
    selected: Boolean,
  },
  setup(props) {
    const { itemSourceIcons } = useItems()
    const { titleCase } = useTitleCase()
    const { getAmount } = useSelection()

    const iconName = props.item.name.replaceAll('-', '_')
    const displayName = titleCase(props.item.name.replaceAll('-', ' '))
    const sourceIcons = itemSourceIcons(props.item) || []
    const amountSelected = computed(() => getAmount(props.item.name))

    console.log(sourceIcons)

    const itemImage = (name: string) => {
      if (name) {
        const fileName = name.replaceAll('-', '_')
        return require(`../assets/icons/${fileName}_icon.png`)
      }
      return ''
    }

    return {
      props,
      iconName,
      displayName,
      sourceIcons,
      amountSelected,
      itemImage,
    }
  },
})
</script>

<style scoped></style>
