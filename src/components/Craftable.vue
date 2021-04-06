<template>
  <div class="flex">
    <ItemComponent :item="item" @click="craftItem" />
    <span v-if="destroy.length > 0">destroy: </span>
    <ItemComponent
      v-for="destroyItem in destroy"
      :key="`destroy_${destroyItem.name}`"
      :item="destroyItem"
    />
    <span v-if="craft.length > 0">craft: </span>
    <ItemComponent
      v-for="craftItem in craft"
      :key="`craft_${craftItem.name}`"
      :item="craftItem"
    />
    <span v-if="chest">chest: </span>
    <ItemComponent v-if="chest" :key="`craft_${chest.name}`" :item="chest" />
  </div>
</template>

<script lang="ts">
import {
  DeepReadonly,
  defineComponent,
  PropType,
  provide,
  reactive,
  toRefs,
  toRaw,
  unref,
  readonly,
} from 'vue'
import ItemComponent from '@/components/Item.vue'
import { Item } from '@/data/items'
import useInventory from '@/hooks/inventory'
import useItems from '@/hooks/items'
import { ItemSelection } from '@/hooks/itemSelection'
import useCrafting from '@/hooks/crafting'

interface State {
  destroy: Item[]
  craft: Item[]
  chest: Item | undefined
}

export default defineComponent({
  name: 'Craftable',
  components: { ItemComponent },
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props) {
    provide('showSource', false)

    const { inventory, chest, clearChest, addToInventory } = useInventory()
    const { getItem, findInPossession, containsItem, groupBy } = useItems()
    const { craft, destroy, craftTemp, destroyTemp } = useCrafting()

    const state = reactive<State>({
      destroy: [],
      craft: [],
      chest: undefined,
    })
    console.groupCollapsed(props.item.name)
    const sources = props.item.sources || []
    const inv = inventory()
    let temporaryInventory: ItemSelection[] = inventory().map(it => ({
      name: it.name,
      amount: it.amount,
    }))

    console.log('temp inventory', temporaryInventory, 'inv', inventory())

    sources.forEach(source => {
      const item = getItem(source.name)
      const inPossession = findInPossession(item, inventory())

      console.log('source', source, 'inPossession', inPossession)
      if (inPossession && inPossession.amount >= source.amount) {
        temporaryInventory = temporaryInventory.filter(
          it => it.name !== inPossession.name
        )
        return
      }

      const missingAmount = source.amount - (inPossession?.amount || 0)
      for (let i = 0; i < missingAmount; i++) {
        try {
          craftTemp(item, temporaryInventory)
          state.craft.push(item)
        } catch (e) {
          console.log('maybe need to destroy')
          temporaryInventory.some(tmpItem => {
            const hasItem = containsItem(
              tmpItem,
              getItem(source.name),
              source.amount
            )
            console.log('hasItem', hasItem)
            if (hasItem.contains) {
              const toDestroy = getItem(tmpItem.name)
              destroyTemp(toDestroy, temporaryInventory)
              state.destroy.push(toDestroy)
              i += hasItem.amount
            }
            return (
              (groupBy(
                temporaryInventory,
                (item: ItemSelection) => item.name
              ).get(source.name)?.amount || 0) >= source.amount
            )
          })

          if (i < missingAmount && chest().length > 0 && !state.chest) {
            chest().some(chestItem => {
              if (chestItem.name === source.name) {
                state.chest = getItem(chestItem.name)
                return true
              }
            })
          }
        }
      }

      console.log('temporary', temporaryInventory)
    })

    const craftItem = () => {
      if (state.chest) {
        addToInventory({ name: state.chest.name, amount: 1 })
        clearChest()
        state.chest = undefined
      }
      state.destroy.forEach(destroy)
      state.destroy = []
      state.craft.forEach(craft)
      state.craft = []
      craft(props.item)
    }

    console.groupEnd()
    return {
      ...toRefs(state),
      craftItem,
    }
  },
})
</script>

<style scoped></style>
