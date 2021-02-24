<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    Chest
  </span>
  <Modal :icon-mode="true" :show-source="false" :selection-amount="3" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import Modal from '@/components/Modal'

export default defineComponent({
  name: 'Chest',
  components: { Modal },
  emits: ['chestOpen'],
  setup(props, context) {
    const chestContents = ref([])

    const toggleChestModal = () => context.emit('chestOpen', true)

    return {
      chestContents,
      toggleChestModal,
    }
  },
})
</script>

<style scoped></style>
