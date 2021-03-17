import { Item, items as itemsRaw, Source } from '@/data/items'
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
    item.sources?.flatMap((source: Source) => {
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
    amount = 1,
    possession: DeepReadonly<ItemSelection[]>
  ) => possession.find(i => i.name === item.name && i.amount >= amount)

  const canMake = (
    item: DeepReadonly<Item>,
    possession: DeepReadonly<ItemSelection[]>,
    amount = 1
  ): boolean => {
    if (!item) {
      return false
    }

    const haveItem = inPossession(item, amount, possession)
    if (haveItem) {
      return false
    }

    return (
      item.sources
        ?.map(
          source =>
            inPossession(getItem(source.name), source.amount, possession) ||
            canMake(getItem(source.name), possession, source.amount)
        )
        .every(i => i) || false
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
  }
}
