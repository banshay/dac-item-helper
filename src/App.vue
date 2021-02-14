<template>
  <div class="text-primary">
    <p>Potential Items</p>
    <PotentialItems />
  </div>
  <div>
    <ItemList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemList from './components/ItemList.vue'
import PotentialItems from '@/components/PotentialItems.vue'

export default defineComponent({
  name: 'App',
  components: {
    ItemList,
    PotentialItems,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
