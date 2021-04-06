import { Item, items as itemsRaw } from '@/data/items'
import { ItemSelection } from '@/hooks/itemSelection.ts'
import { DeepReadonly, readonly } from 'vue'

export default function useItems() {
  const itemsByTier = (tier: number) =>
    itemsRaw.filter(item => item.tier === tier)

  const getItem = (name: string): Item => {
    const item = itemsRaw.find(i => i.name === name)
    if (!item) {
      throw new Error(`item with name ${name} not found`)
    }
    return item
  }

  const items = readonly(itemsRaw)

  const itemSourceIcons = (item: Item) =>
    item.sources?.flatMap((source: ItemSelection) => {
      const sourceItem = itemsRaw.find(item => item.name === source.name)
      return sourceItem ? new Array(source.amount).fill(sourceItem.name) : []
    })

  const canMakePartial = (
    item: DeepReadonly<Item>,
    possession: string[]
  ): boolean => {
    if (!item) {
      return false
    }

    const haveItem = possession.includes(item.name)
    if (haveItem) {
      return true
    }

    return (
      item.sources
        ?.map(source => canMakePartial(getItem(source.name), possession))
        .find(i => i) || false
    )
  }

  const findInPossession = (
    item: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    amount = 1
  ): ItemSelection | undefined =>
    possession.find(i => i.name === item.name && i.amount >= amount)

  const containsItem = (
    item: DeepReadonly<ItemSelection>,
    search: DeepReadonly<Item>,
    amount = 1
  ): {
    contains: boolean
    amount: number
  } => {
    console.log('hasItem item', item, 'search', search)
    if (item.name === search.name) {
      return {
        contains: true,
        amount: item.amount,
      }
    }
    const itemWithSource = getItem(item.name)
    return (
      itemWithSource.sources
        ?.map(i => containsItem(i, search, amount))
        .filter(i => i.contains)
        .reduce(
          (acc, current) => {
            acc.contains = current.contains
            acc.amount += current.amount
            return acc
          },
          { contains: false, amount: 0 }
        ) || {
        contains: false,
        amount: 0,
      }
    )
  }

  const groupBy = (
    array: DeepReadonly<ItemSelection[]>,
    keyGetter: Function
  ) => {
    const map = new Map()
    array.forEach(item => {
      const key = keyGetter(item)
      const existing = map.get(key)
      if (!existing) {
        map.set(key, { ...item })
      } else {
        existing.amount += item.amount
      }
    })
    return map
  }

  const unravel = (source: ItemSelection): ItemSelection[] => {
    const item = readonly(getItem(source.name))
    if (item && item.sources) {
      const newArr = new Array(source.amount).fill(item)
      return newArr.flatMap(item => item.sources.flatMap(unravel))
    }
    return [source]
  }

  const canMake = (
    itemToMake: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    amount = 1
  ): boolean => {
    const itemToMakeIngredients = itemToMake.sources?.flatMap(unravel)
    const filteredPossession = possession.filter(
      i => i.name !== itemToMake.name
    )
    if (itemToMakeIngredients) {
      const inventoryMap = groupBy(
        filteredPossession.flatMap(i => {
          const item = getItem(i.name)
          if (item && item.sources) {
            return item.sources.flatMap(unravel)
          } else {
            return i
          }
        }),
        (item: ItemSelection) => item.name
      )
      const ingredientMap = groupBy(
        itemToMakeIngredients,
        (item: ItemSelection) => item.name
      )
      ingredientMap.forEach((value, key, map) => {
        const itemInInventory = inventoryMap.get(key)
        if (itemInInventory && itemInInventory.amount >= value.amount) {
          map.delete(key)
        }
      })
      return ![...ingredientMap.keys()].length
    }
    return !!findInPossession(itemToMake, filteredPossession, amount)
  }

  const itemNames = (selectionItems: DeepReadonly<ItemSelection[]>) =>
    selectionItems.filter(item => item).map(item => item.name)

  return {
    getItem,
    itemsByTier,
    itemSourceIcons,
    canMakePartial,
    items,
    itemNames,
    canMake,
    findInPossession,
    containsItem,
    groupBy,
  }
}
