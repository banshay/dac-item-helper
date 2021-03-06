import { Item, items as itemsRaw, Source } from '@/data/items'
import useSelection, { ItemSelection } from '@/hooks/itemSelection.ts'
import { readonly } from 'vue'

export default function useItems() {
  const itemsByTier = (tier: number) =>
    itemsRaw.filter(item => item.tier === tier)
  const getItem = (name: string) => itemsRaw.find(i => i.name === name)

  const itemSourceIcons = (item: Item) =>
    item.sources?.flatMap((source: Source) => {
      const sourceItem = itemsRaw.find(item => item.name === source.name)
      return sourceItem ? new Array(source.amount).fill(sourceItem.name) : []
    })

  const canMake = (
    name: string,
    possession: string[],
    partial = false
  ): boolean => {
    const item = getItem(name)
    if (!item) {
      return false
    }

    const haveItem = possession.includes(item.name)
    if (haveItem) {
      return true
    }

    if (!partial) {
      return (
        item.sources
          ?.map(source => canMake(source.name, possession, partial))
          .every(i => i) || false
      )
    }
    return (
      item.sources
        ?.map(source => canMake(source.name, possession, partial))
        .find(i => i) || false
    )
  }

  const items = readonly(itemsRaw)

  return {
    getItem,
    itemsByTier,
    itemSourceIcons,
    canMake,
    items,
  }
}
