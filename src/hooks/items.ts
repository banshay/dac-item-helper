import { Item, items as itemsRaw } from '@/data/items'
import { ItemSelection } from '@/hooks/itemSelection.ts'
import { DeepReadonly, readonly } from 'vue'

export default function useItems() {
  const itemsByTier = (tier: number) =>
    itemsRaw.filter(item => item.tier === tier)

  const getItem = (name: string) => {
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

  const inPossession = (
    item: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    amount = 1
  ) => possession.find(i => i.name === item.name && i.amount >= amount)

  const containsItem = (
    item: DeepReadonly<ItemSelection>,
    search: DeepReadonly<Item>,
    amount = 1
  ): {
    hasItem: boolean
    destroy: boolean
  } => {
    if (item.name === search.name && item.amount >= amount) {
      return {
        hasItem: true,
        destroy: false,
      }
    }
    const itemWithSource = getItem(item.name)
    const hasItemRet = !!itemWithSource.sources?.find(
      i => containsItem(i, search, amount).hasItem
    )
    return {
      hasItem: hasItemRet,
      destroy: true,
    }
  }

  const getItemAndRemove = (
    item: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    amount = 1
  ): {
    item: DeepReadonly<ItemSelection> | undefined
    toDestroy: DeepReadonly<ItemSelection> | undefined
    remaining: DeepReadonly<ItemSelection[]>
  } => {
    const foundItem = possession
      .map(i => {
        const { hasItem, destroy } =
          i.name === item.name && i.amount >= amount
            ? { hasItem: true, destroy: false }
            : containsItem(i, item, amount)
        return {
          item: i,
          hasItem,
          destroy,
        }
      })
      .find(mapd => mapd.hasItem)

    if (foundItem) {
      const remaining = possession
        .map(i => {
          return {
            ...i,
            amount: i.amount - 1,
          }
        })
        .filter(i => i.amount === 0)
      return {
        item: foundItem?.item,
        toDestroy: foundItem?.destroy ? foundItem.item : undefined,
        remaining,
      }
    }
    return { item: undefined, toDestroy: undefined, remaining: possession }
  }

  const canMake = (
    itemToMake: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    amount = 1
  ): boolean => {
    if (!itemToMake) {
      return false
    }

    const { item, remaining } = getItemAndRemove(itemToMake, possession, amount)
    if (item) {
      return true
    }

    return (
      itemToMake.sources?.every(source =>
        canMake(getItem(source.name), remaining, source.amount * amount)
      ) || false
    )
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
    inPossession,
    getItemAndRemove,
  }
}
