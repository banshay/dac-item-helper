import { DeepReadonly, reactive, readonly } from 'vue'
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

  const addToInventory = (selected: ItemSelection) => {
    const owned = getItem(selected.name)
    if (owned) {
      owned.amount += selected.amount
    } else {
      inventoryState.inventory = [
        ...inventoryState.inventory,
        {
          name: selected.name,
          amount: selected.amount,
        },
      ]
    }
  }

  const addAllToChest = (items: DeepReadonly<ItemSelection[]>) => {
    items.forEach(item => {
      inventoryState.chest = [
        ...inventoryState.chest,
        {
          name: item.name,
          amount: item.amount,
        },
      ]
    })
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
