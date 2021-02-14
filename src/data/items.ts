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
    name: 'blades-of-attack',
    tier: 1,
  },
  {
    name: 'mithril-hammer',
    tier: 2,
    sources: [{ name: 'blades-of-attack', amount: 2 }],
  },
  {
    name: 'sacred-relic',
    tier: 3,
    sources: [{ name: 'mithril-hammer', amount: 3 }],
  },
  {
    name: 'divine-rapier',
    tier: 5,
    sources: [
      { name: 'sacred-relic', amount: 1 },
      { name: 'demon-edge', amount: 1 },
    ],
  },
  {
    name: 'demon-edge',
    tier: 3,
    sources: [{ name: 'javelin', amount: 2 }],
  },
  {
    name: 'javelin',
    tier: 2,
    sources: [{ name: 'quarterstaff', amount: 2 }],
  },
  {
    name: 'quarterstaff',
    tier: 1,
  },
]
