export interface Synergy {
  name: string
  itemPriority?: ItemPriority[]
}

export interface ItemPriority {
  itemName: string
  priority: number
}

export const items: Synergy[] = [
  {
    name: 'Warrior',
    itemPriority: [
      { itemName: 'Divine_Rapier', priority: 1 },
      { itemName: 'Mekansm', priority: 2 },
    ],
  },
  {
    name: 'Goblin',
  },
  {
    name: 'Mech',
  },
  {
    name: 'Druid',
  },
  {
    name: 'Knight',
  },
  {
    name: 'Kobold',
  },
  {
    name: 'Orc',
  },
  {
    name: 'Assassin',
  },
  {
    name: 'Demon',
  },
  {
    name: 'Demon_Hunter',
  },
  {
    name: 'Hunter',
  },
  {
    name: 'Troll',
  },
  {
    name: 'Dragon',
  },
  {
    name: 'Warlock',
  },
  {
    name: 'Mage',
  },
  {
    name: 'Human',
  },
  {
    name: 'Shaman',
  },
  {
    name: 'Dwarf',
  },
  {
    name: 'Pandaren',
  },
  {
    name: 'Elf',
  },
  {
    name: 'Elemental',
  },
  {
    name: 'Monk',
  },
  {
    name: 'Priest',
  },
  {
    name: 'God',
  },
  {
    name: 'Wizard',
  },
  {
    name: 'Beast',
  },
  {
    name: 'Undead',
  },
  {
    name: 'Naga',
  },
]
