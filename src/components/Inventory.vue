<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    What I have goes here
  </span>
  <div class="align-middle border-dashed border-nord8 rounded-md border-4 m-2">
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
import { defineComponent } from 'vue'
import useSelection from '@/hooks/selection'

export default defineComponent({
  name: 'Inventory',
  setup() {
    const { getAllSelected } = useSelection()
    return { getAllSelected }
  },
})
</script>

<style scoped></style>
