import { DeepReadonly } from 'vue'
import { Item } from '@/data/items'
import useInventory from '@/hooks/inventory'
import useItems from '@/hooks/items'
import { ItemSelection } from '@/hooks/itemSelection'

export default function useCrafting() {
  const { findInPossession, getItem } = useItems()
  const { inventory, addToInventory, removeFromInventory } = useInventory()

  const createTempPossession = (possession: ItemSelection[]) => {
    const add = (item: ItemSelection) => {
      possession.push(item)
    }

    const remove = (itemName: string, amount: number) => {
      possession = possession
        .map(item => {
          if (item.name === itemName) {
            item.amount -= amount
          }
          return item
        })
        .filter(it => it.amount > 0)
    }
    return {
      add,
      remove,
    }
  }

  const _craft = (
    toCraft: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    removeFn: (itemName: string, amount: number) => void,
    addFn: (item: ItemSelection) => void
  ) => {
    if (
      toCraft.sources?.every(
        source =>
          !!findInPossession(getItem(source.name), possession, source.amount)
      )
    ) {
      toCraft.sources?.forEach(source => removeFn(source.name, source.amount))
      addFn({ name: toCraft.name, amount: 1 })
    } else {
      throw new Error(`don't have necessary items to craft ${toCraft.name}`)
    }
  }

  const craft = (toCraft: DeepReadonly<Item>) => {
    const possession = inventory()
    return _craft(toCraft, possession, removeFromInventory, addToInventory)
  }

  const craftTemp = (
    toCraft: DeepReadonly<Item>,
    possession: ItemSelection[]
  ) => {
    const { add, remove } = createTempPossession(possession)
    return _craft(toCraft, possession, remove, add)
  }

  const _destroy = (
    toDestroy: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    removeFn: (itemName: string, amount: number) => void,
    addFn: (item: ItemSelection) => void
  ) => {
    console.log('todestroy', toDestroy, 'possession', possession)
    const item = findInPossession(toDestroy, possession)
    if (item) {
      removeFn(item.name, 1)
      getItem(item.name).sources?.map(addFn)
    } else {
      throw new Error(`don't have the item to destroy ${toDestroy.name}`)
    }
  }

  const destroy = (toDestroy: DeepReadonly<Item>) => {
    const possession = inventory()
    return _destroy(toDestroy, possession, removeFromInventory, addToInventory)
  }

  const destroyTemp = (
    toDestroy: DeepReadonly<Item>,
    possession: ItemSelection[]
  ) => {
    const { add, remove } = createTempPossession(possession)
    return _destroy(toDestroy, possession, remove, add)
  }

  return {
    craft,
    destroy,
    destroyTemp,
    craftTemp,
  }
}
