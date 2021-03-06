import { reactive, readonly } from 'vue'
import { ItemSelection } from '@/hooks/itemSelection.ts'

const inventoryState = reactive<{
  inventory: ItemSelection[]
  chest: ItemSelection[]
}>({
  inventory: [],
  chest: [],
})

export default function useInventory() {
  const chest = () => readonly(inventoryState.chest)
  const inventory = () => readonly(inventoryState.inventory)
  const clearChest = () => (inventoryState.chest = [])
  const clearInventory = () => (inventoryState.inventory = [])
  const getItem = (name: string) =>
    inventoryState.inventory.find(item => item.name === name)

  const addToInventory = (selected: string) => {
    const owned = getItem(selected)
    if (owned) {
      owned.amount++
    } else {
      inventoryState.inventory = [
        ...inventoryState.inventory,
        {
          name: selected,
          amount: 1,
        },
      ]
    }
  }

  const addAllToChest = (items: ItemSelection[]) => {
    inventoryState.chest = items
  }

  const removeFromInventory = (toRemove: string) => {
    const owned = getItem(toRemove)
    if (owned && owned.amount > 1) {
      owned.amount--
    } else {
      inventoryState.inventory = inventoryState.inventory.filter(
        item => item.name !== toRemove
      )
    }
  }

  return {
    chest,
    inventory,
    clearChest,
    clearInventory,
    addToInventory,
    addAllToChest,
    removeFromInventory,
  }
}
