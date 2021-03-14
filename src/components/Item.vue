<template>
  <div
    id="item-container"
    class="flex text-center items-center cursor-pointer select-none border-2 border-transparent text-primary h-16 m-1 bg-nord1"
    :class="{
      'border-yellow-500': selected,
      'border-2': selected,
    }"
  >
    <img
      id="item-image"
      :src="itemImage(item.name)"
      :alt="item.name"
      class="bg-cover w-20"
    />
    <!--    <div class="flex justify-between flex-shrink-0 item">-->
    <div
      id="item-name-amount"
      class="font-black text-dynamic whitespace-nowrap"
      v-if="multiSelect"
    >
      <span v-if="!iconMode">{{ displayName }}</span>
      <span v-if="amountSelected > 1" class="p-4">x{{ amountSelected }}</span>
    </div>
    <template v-if="showSource">
      <div
        :key="index"
        v-for="(sourceIcon, index) in sourceIcons"
        :class="{
          'ml-auto': index === 0,
          'pl-4': index === 0,
        }"
        class="flex-shrink-0"
      >
        <img :src="itemImage(sourceIcon)" :alt="sourceIcon" class="p-1 w-14" />
      </div>
    </template>
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue'
import { Item } from '@/data/items'
import useTitleCase from '@/hooks/titleCase'
import useItems from '@/hooks/items'

export default defineComponent({
  name: 'Item',
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
    selected: Boolean,
    amountSelected: Number,
  },
  setup(props) {
    const showSource = inject('showSource')
    const iconMode = inject('iconMode')
    const multiSelect = inject('multiSelect')
    const { itemSourceIcons } = useItems()
    const { titleCase } = useTitleCase()

    const displayName = titleCase(props.item.name.replaceAll('_', ' '))
    const sourceIcons = itemSourceIcons(props.item) || []

    const itemImage = (name: string) =>
      require(`../assets/icons/${name}_icon.png`)

    return {
      props,
      displayName,
      sourceIcons,
      itemImage,
      showSource,
      iconMode,
      multiSelect,
    }
  },
})
</script>

<style scoped></style>
