<template>
  <div
    class="flex text-center items-center cursor-pointer select-none border-2 border-transparent text-primary w-40 h-16 m-1 bg-nord1"
    :class="{
      'border-yellow-500': selected,
      'border-2': selected,
    }"
  >
    <img :src="itemImage(item.name)" :alt="item.name" class="bg-cover w-20" />
    <!--    <div class="flex justify-between flex-shrink-0 item">-->
    <div class="p-4 font-black text-dynamic whitespace-nowrap flex-shrink">
      <span v-if="!iconMode">{{ displayName }}</span>
      <span v-if="amountSelected > 1">x{{ amountSelected }}</span>
    </div>
    <template v-if="showSource">
      <div
        :key="index"
        v-for="(sourceIcon, index) in sourceIcons"
        :class="{
          'ml-auto': index === 0,
        }"
      >
        <img
          :src="itemImage(sourceIcon)"
          :alt="sourceIcon"
          class="p-1 w-14 h-auto"
        />
      </div>
    </template>
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, inject } from 'vue'
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
    const showSource = inject('showSource')
    const iconMode = inject('iconMode')
    const { itemSourceIcons } = useItems()
    const { titleCase } = useTitleCase()
    const { getAmount } = useSelection()

    const displayName = titleCase(props.item.name.replaceAll('_', ' '))
    const sourceIcons = itemSourceIcons(props.item) || []
    const amountSelected = computed(() => getAmount(props.item.name))

    const itemImage = (name: string) =>
      require(`../assets/icons/${name}_icon.png`)

    return {
      props,
      displayName,
      sourceIcons,
      amountSelected,
      itemImage,
      showSource,
      iconMode,
    }
  },
})
</script>

<style scoped></style>
