<template>
  <div
    class="align-middle border-dashed border-nord8 rounded-md border-4 m-2"
    @click="chestModal = true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-16 h-16 mx-auto"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </div>
  <teleport to="body">
    <div
      v-if="chestModal"
      class="absolute top-20 bottom-20 left-36 right-36 bg-nord2 flex flex-col mx-auto z-10"
    >
      <ItemList />
    </div>
    <div
      v-if="chestModal"
      class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70"
      @click="chestModal = false"
    ></div>
  </teleport>
</template>

<script>
import { computed, defineComponent, provide, ref, watch } from 'vue'
import ItemList from '@/components/ItemList'
import useSelection from '@/hooks/selection'

export default defineComponent({
  name: 'Modal',
  props: {
    showSource: Boolean,
    iconMode: Boolean,
    selectionAmount: Number,
  },
  components: {
    ItemList,
  },
  setup(props, context) {
    provide('showSource', props.showSource)
    provide('iconMode', props.iconMode)

    const { getAllSelected, clearAllSelection } = useSelection()
    const chestModal = ref(false)

    const selectionFilled = computed(
      () => getAllSelected.value.length === props.selectionAmount
    )

    watch(getAllSelected, newV => {
      if (newV.length === props.selectionAmount) {
        const selection = getAllSelected.value
        chestModal.value = false
        context.emit('selectionFilled', selection)
        clearAllSelection()
      }
    })

    return {
      selectionFilled,
      chestModal,
    }
  },
})
</script>

<style scoped></style>
