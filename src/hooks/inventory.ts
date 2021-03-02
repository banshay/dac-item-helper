import { readonly, ref } from 'vue'
import { Selection } from '@/hooks/selection'

const inventoryState = ref<Selection[]>([])

export default function useInventory() {
  const inventory = () => readonly(inventoryState.value)
  const clearInventory = () => (inventoryState.value = [])
  const getItem = (name: string) =>
    inventoryState.value.find(item => item.name === name)

  const addToInventory = (selected: string) => {
    const owned = getItem(selected)
    if (owned) {
      owned.amount++
    } else {
      inventoryState.value = [
        ...inventoryState.value,
        {
          name: selected,
          amount: 1,
        },
      ]
    }
  }

  const removeFromInventory = (toRemove: string) => {
    const owned = getItem(toRemove)
    if (owned && owned.amount > 1) {
      owned.amount--
    } else {
      inventoryState.value = inventoryState.value.filter(
        item => item.name !== toRemove
      )
    }
  }

  return {
    inventory,
    clearInventory,
    addToInventory,
    removeFromInventory,
  }
}
