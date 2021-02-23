<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <ItemList />
  </div>
</template>

<script>
import { ref } from 'vue'
import ItemList from '@/components/ItemList'

export default {
  name: 'Modal',
  components: {
    ItemList,
  },
  setup() {
    return {}
  },
}
</script>

<style scoped></style>
