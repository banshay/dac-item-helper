import { computed, ref } from 'vue'

export interface Selection {
  name: string
  amount: number
}

const selected = ref<Selection[]>([])

export default function useSelection() {
  const getSelection = (name: string) =>
    selected.value.find(i => i.name === name)

  const select = (name: string) => {
    const selection = getSelection(name)
    if (selection) {
      selection.amount++
    } else {
      selected.value = [{ name, amount: 1 }, ...selected.value]
    }
  }

  const clearSelection = (name: string) => {
    selected.value = selected.value.filter(i => i.name !== name)
  }

  const isSelected = (name: string): boolean => !!getSelection(name)

  const getAmount = (name: string) => getSelection(name)?.amount || 0

  const getAllSelected = computed(() => selected.value)
  const getIfSelected = computed(name => getSelection(name))

  return {
    select,
    isSelected,
    clearSelection,
    getAmount,
    getAllSelected,
    getIfSelected,
  }
}