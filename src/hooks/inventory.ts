import { DeepReadonly, reactive, readonly } from 'vue'
import { ItemSelection } from '@/hooks/itemSelection.ts'
import { Item } from '@/data/items'
import useItems from '@/hooks/items'

const inventoryState = reactive<{
  inventory: ItemSelection[]
  chest: ItemSelection[]
}>({
  inventory: [],
  chest: [],
})

export default function useInventory() {
  const { getItem } = useItems()
  const chest = () => readonly(inventoryState.chest)
  const inventory = (): DeepReadonly<ItemSelection[]> =>
    readonly(
      inventoryState.inventory.sort(
        (a, b) => getItem(a.name).tier - getItem(b.name).tier
      )
    )
  const clearChest = () => (inventoryState.chest = [])
  const clearInventory = () => (inventoryState.inventory = [])
  const getOwnedItem = (name: string) =>
    inventoryState.inventory.find(item => item.name === name)

  const addToInventory = (selected: ItemSelection) => {
    const owned = getOwnedItem(selected.name)
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

  const removeFromInventory = (toRemove: string, amount = 1) => {
    const owned = getOwnedItem(toRemove)
    if (!owned) {
      throw new Error(`don't own an item called ${toRemove}`)
    }
    owned.amount -= amount
    inventoryState.inventory = inventoryState.inventory.filter(
      i => i.amount > 0
    )
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
