import { Item, items, Source } from '@/data/items'
import useSelection from '@/hooks/selection'

export default function useItems() {
  const { isSelected } = useSelection()

  const itemsByTier = (tier: number) => items.filter(item => item.tier === tier)
  const getItem = (name: string) => items.find(i => i.name === name)

  const itemSourceIcons = (item: Item) =>
    item.sources?.flatMap((source: Source) => {
      const sourceItem = items.find(item => item.name === source.name)
      return sourceItem ? new Array(source.amount).fill(sourceItem.name) : []
    })

  const canMake = (name: string, partial = false): boolean => {
    const item = getItem(name)
    if (!item) {
      return false
    }

    const haveItem = isSelected(item.name)
    if (haveItem) {
      return true
    }

    if (!partial) {
      return (
        item.sources
          ?.map(source => canMake(source.name, partial))
          .every(i => i) || false
      )
    }
    return (
      item.sources?.map(source => canMake(source.name, partial)).find(i => i) ||
      false
    )
  }

  const getAllPotentialMakes = (partial: boolean) =>
    items.filter(item => item.sources && canMake(item.name, partial))

  return {
    getItem,
    itemsByTier,
    itemSourceIcons,
    canMake,
    getAllPotentialMakes,
  }
}
