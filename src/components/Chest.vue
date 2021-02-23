<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    Chest
  </span>
  <div
    v-if="chestContents.length === 0"
    class="align-middle border-dashed border-nord8 rounded-md border-4 m-2"
    @click="toggleChestModal"
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
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Chest',
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
