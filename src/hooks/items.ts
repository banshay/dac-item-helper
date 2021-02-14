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

  const canMake = (name: string): boolean => {
    const item = getItem(name)
    const haveItem = item && isSelected(item.name)
    return (
      haveItem ||
      (item &&
        item.sources &&
        item.sources.map(source => canMake(source.name)).every(i => i)) ||
      false
    )
  }

  const getAllPotentialMakes = () =>
    items.filter(item => item.sources && canMake(item.name))

  return {
    getItem,
    itemsByTier,
    itemSourceIcons,
    canMake,
    getAllPotentialMakes,
  }
}
