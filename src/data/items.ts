export interface Item {
  name: string
  tier: number
  sources?: Source[]
}

export interface Source {
  name: string
  amount: number
}

export const items: Item[] = [
  {
    name: 'Blades_of_Attack',
    tier: 1,
  },
  {
    name: 'Mithril_Hammer',
    tier: 2,
    sources: [{ name: 'Blades_of_Attack', amount: 2 }],
  },
  {
    name: 'Sacred_Relic',
    tier: 3,
    sources: [{ name: 'Mithril_Hammer', amount: 3 }],
  },
  {
    name: 'Divine_Rapier',
    tier: 5,
    sources: [
      { name: 'Sacred_Relic', amount: 1 },
      { name: 'Demon_Edge', amount: 1 },
    ],
  },
  {
    name: 'Demon_Edge',
    tier: 3,
    sources: [{ name: 'Javelin', amount: 2 }],
  },
  {
    name: 'Javelin',
    tier: 2,
    sources: [{ name: 'Quarterstaff', amount: 2 }],
  },
  {
    name: 'Quarterstaff',
    tier: 1,
  },
]
