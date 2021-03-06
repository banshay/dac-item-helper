<template>
  <teleport to="body">
    <div
      class="absolute top-20 bottom-20 left-36 right-36 bg-nord2 flex flex-col mx-auto z-10"
    >
      <ItemList />
    </div>
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-70"
      @click="closeModal"
    ></div>
  </teleport>
</template>

<script>
import { defineComponent, provide, watch } from 'vue'
import ItemList from '@/components/ItemList'
import useSelection from '@/hooks/itemSelection'

export default defineComponent({
  name: 'Modal',
  props: {
    showSource: Boolean,
    iconMode: Boolean,
    showModal: Boolean,
    selectionAmount: Number,
  },
  components: {
    ItemList,
  },
  emits: ['modalClosed', 'selectionHit'],
  setup(props, { emit }) {
    provide('showSource', props.showSource)
    provide('iconMode', props.iconMode)

    const { getAllSelected } = useSelection()

    const closeModal = () => {
      emit('modalClosed')
    }

    if (props.selectionAmount) {
      watch(getAllSelected, newV => {
        if (newV.length === props.selectionAmount) {
          emit('selectionHit')
        }
      })
    }

    return {
      closeModal,
    }
  },
})
</script>

<style scoped></style>
