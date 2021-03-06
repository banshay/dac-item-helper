<template>
  <span class="text-3xl font-black uppercase tracking-wider m-2">
    I can craft this
  </span>
  <div
    class="align-middle border-dashed border-nord8 rounded-md border-4 m-2 h-full"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useInventory from '@/hooks/inventory'

export default defineComponent({
  name: 'Craftlist',
  setup() {
    const { chest, inventory } = useInventory()

    return {}
  },
})
</script>

<style scoped></style>
