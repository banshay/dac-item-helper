import { ItemSelection } from '@/hooks/itemSelection'

export interface Item {
  name: string
  tier: number
  sources?: ItemSelection[]
}

export const items: Item[] = [
  {
    name: 'Blades_of_Attack',
    tier: 1,
  },
  {
    name: 'Blade_of_Alacrity',
    tier: 1,
  },
  {
    name: 'Chainmail',
    tier: 1,
  },
  {
    name: 'Stout_Shield',
    tier: 1,
  },
  {
    name: 'Ring_of_Regen',
    tier: 1,
  },
  {
    name: 'Ring_of_Health',
    tier: 1,
    sources: [{ name: 'Ring_of_Regen', amount: 2 }],
  },
  {
    name: 'Robe_of_the_Magi',
    tier: 1,
  },
  {
    name: 'Cloak',
    tier: 1,
  },
  {
    name: 'Morbid_Mask',
    tier: 1,
  },
  {
    name: 'Blight_Stone',
    tier: 1,
  },
  {
    name: 'Void_Stone',
    tier: 1,
  },
  {
    name: 'Vitality_Booster',
    tier: 1,
  },
  {
    name: 'Energy_Booster',
    tier: 1,
  },
  {
    name: 'Boots_of_Speed',
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
  {
    name: 'Crown',
    tier: 2,
  },
  {
    name: 'Talisman_of_Evasion',
    tier: 2,
  },
  {
    name: 'Broadsword',
    tier: 2,
  },
  {
    name: 'Ogre_Axe',
    tier: 2,
  },
  {
    name: 'Blink_Dagger',
    tier: 2,
  },
  {
    name: 'Poor_Mans_Shield',
    tier: 2,
    sources: [{ name: 'Stout_Shield', amount: 2 }],
  },
  {
    name: 'Perseverance',
    tier: 2,
    sources: [
      { name: 'Ring_of_Health', amount: 1 },
      { name: 'Void_Stone', amount: 1 },
    ],
  },
  {
    name: 'Crystalys',
    tier: 2,
    sources: [
      { name: 'Broadsword', amount: 1 },
      { name: 'Blades_of_Attack', amount: 1 },
    ],
  },
  {
    name: 'Staff_of_Wizardry',
    tier: 2,
    sources: [{ name: 'Robe_of_the_Magi', amount: 2 }],
  },
  {
    name: 'Force_Staff',
    tier: 2,
    sources: [
      { name: 'Staff_of_Wizardry', amount: 1 },
      { name: 'Ring_of_Regen', amount: 1 },
    ],
  },
  {
    name: 'Hand_of_Midas',
    tier: 2,
    sources: [
      { name: 'Blades_of_Attack', amount: 1 },
      { name: 'Ring_of_Health', amount: 1 },
    ],
  },
  {
    name: 'Mask_of_Madness',
    tier: 2,
    sources: [
      { name: 'Morbid_Mask', amount: 1 },
      { name: 'Quarterstaff', amount: 1 },
    ],
  },
  {
    name: 'Summoning_Stone',
    tier: 2,
    sources: [
      { name: 'Vitality_Booster', amount: 1 },
      { name: 'Blight_Stone', amount: 1 },
    ],
  },
  {
    name: 'Tranquil_Boots',
    tier: 2,
    sources: [
      { name: 'Boots_of_Speed', amount: 1 },
      { name: 'Ring_of_Regen', amount: 1 },
    ],
  },
  {
    name: 'Arcane_Boots',
    tier: 2,
    sources: [
      { name: 'Boots_of_Speed', amount: 1 },
      { name: 'Energy_Booster', amount: 1 },
    ],
  },
  {
    name: 'Platemail',
    tier: 3,
    sources: [{ name: 'Chainmail', amount: 2 }],
  },
  {
    name: 'Hyperstone',
    tier: 3,
    sources: [{ name: 'Broadsword', amount: 2 }],
  },
  {
    name: 'Eaglesong',
    tier: 3,
    sources: [{ name: 'Blade_of_Alacrity', amount: 2 }],
  },
  {
    name: 'Reaver',
    tier: 3,
    sources: [{ name: 'Ogre_Axe', amount: 3 }],
  },
  {
    name: 'Ultimate_Orb',
    tier: 3,
    sources: [
      { name: 'Vitality_Booster', amount: 1 },
      { name: 'Crown', amount: 1 },
    ],
  },
  {
    name: 'Mystic_Staff',
    tier: 3,
    sources: [
      { name: 'Staff_of_Wizardry', amount: 1 },
      { name: 'Void_Stone', amount: 1 },
    ],
  },
  {
    name: 'Blade_Mail',
    tier: 3,
    sources: [
      { name: 'Broadsword', amount: 1 },
      { name: 'Chainmail', amount: 1 },
    ],
  },
  {
    name: 'Vanguard',
    tier: 3,
    sources: [
      { name: 'Stout_Shield', amount: 1 },
      { name: 'Ring_of_Health', amount: 1 },
      { name: 'Vitality_Booster', amount: 1 },
    ],
  },
  {
    name: 'Hood_of_Defiance',
    tier: 3,
    sources: [
      { name: 'Cloak', amount: 1 },
      { name: 'Ring_of_Health', amount: 1 },
      { name: 'Ring_of_Regen', amount: 1 },
    ],
  },
  {
    name: 'Moon_Shard',
    tier: 3,
    sources: [{ name: 'Hyperstone', amount: 2 }],
  },
  {
    name: 'Black_King_Bar',
    tier: 3,
    sources: [
      { name: 'Ogre_Axe', amount: 1 },
      { name: 'Mithril_Hammer', amount: 1 },
    ],
  },
  {
    name: 'Kaya',
    tier: 3,
    sources: [
      { name: 'Staff_of_Wizardry', amount: 1 },
      { name: 'Robe_of_the_Magi', amount: 1 },
    ],
  },
  {
    name: 'Dagon_1',
    tier: 3,
    sources: [
      { name: 'Staff_of_Wizardry', amount: 1 },
      { name: 'Crown', amount: 1 },
    ],
  },
  {
    name: 'Diffusal_Blade_1',
    tier: 3,
    sources: [
      { name: 'Blade_of_Alacrity', amount: 1 },
      { name: 'Robe_of_the_Magi', amount: 1 },
    ],
  },
  {
    name: 'Maelstrom',
    tier: 3,
    sources: [
      { name: 'Mithril_Hammer', amount: 1 },
      { name: 'Javelin', amount: 1 },
    ],
  },
  {
    name: 'Telescope',
    tier: 3,
    sources: [
      { name: 'Energy_Booster', amount: 1 },
      { name: 'Quarterstaff', amount: 1 },
    ],
  },
  {
    name: 'Mekansm',
    tier: 3,
    sources: [
      { name: 'Chainmail', amount: 1 },
      { name: 'Cloak', amount: 1 },
      { name: 'Ring_of_Regen', amount: 1 },
    ],
  },
  {
    name: 'Desolator',
    tier: 4,
    sources: [
      { name: 'Mithril_Hammer', amount: 2 },
      { name: 'Blight_Stone', amount: 1 },
    ],
  },
  {
    name: 'Radiance',
    tier: 4,
    sources: [
      { name: 'Sacred_Relic', amount: 1 },
      { name: 'Talisman_of_Evasion', amount: 1 },
    ],
  },
  {
    name: 'Battle_Fury',
    tier: 4,
    sources: [
      { name: 'Perseverance', amount: 1 },
      { name: 'Broadsword', amount: 1 },
      { name: 'Mithril_Hammer', amount: 1 },
    ],
  },
  {
    name: 'Manta_Style',
    tier: 4,
    sources: [
      { name: 'Ultimate_Orb', amount: 1 },
      { name: 'Blade_of_Alacrity', amount: 1 },
      { name: 'Blades_of_Attack', amount: 1 },
    ],
  },
  {
    name: 'Eye_of_Skadi',
    tier: 4,
    sources: [{ name: 'Ultimate_Orb', amount: 2 }],
  },
  {
    name: 'Linkens_Sphere',
    tier: 4,
    sources: [
      { name: 'Ultimate_Orb', amount: 1 },
      { name: 'Perseverance', amount: 1 },
    ],
  },
  {
    name: 'Shivas_Guard',
    tier: 4,
    sources: [
      { name: 'Platemail', amount: 1 },
      { name: 'Mystic_Staff', amount: 1 },
    ],
  },
  {
    name: 'Pipe_of_Insight',
    tier: 4,
    sources: [
      { name: 'Hood_of_Defiance', amount: 1 },
      { name: 'Cloak', amount: 1 },
    ],
  },
  {
    name: 'Crimson_Guard',
    tier: 4,
    sources: [
      { name: 'Vanguard', amount: 1 },
      { name: 'Chainmail', amount: 1 },
    ],
  },
  {
    name: 'Hurricane_Pike',
    tier: 4,
    sources: [
      { name: 'Force_Staff', amount: 1 },
      { name: 'Telescope', amount: 1 },
    ],
  },
  {
    name: 'Guardian_Greaves',
    tier: 4,
    sources: [
      { name: 'Mekansm', amount: 1 },
      { name: 'Arcane_Boots', amount: 1 },
    ],
  },
  {
    name: 'Monkey_King_Bar',
    tier: 5,
    sources: [
      { name: 'Demon_Edge', amount: 1 },
      { name: 'Javelin', amount: 1 },
      { name: 'Quarterstaff', amount: 1 },
    ],
  },
  {
    name: 'Butterfly',
    tier: 5,
    sources: [
      { name: 'Eaglesong', amount: 1 },
      { name: 'Talisman_of_Evasion', amount: 1 },
      { name: 'Quarterstaff', amount: 1 },
    ],
  },
  {
    name: 'Daedalus',
    tier: 5,
    sources: [
      { name: 'Crystalys', amount: 1 },
      { name: 'Demon_Edge', amount: 1 },
    ],
  },
  {
    name: 'Mjollnir',
    tier: 5,
    sources: [
      { name: 'Maelstrom', amount: 1 },
      { name: 'Hyperstone', amount: 1 },
    ],
  },
  {
    name: 'Heart_of_Tarrasque',
    tier: 5,
    sources: [
      { name: 'Reaver', amount: 1 },
      { name: 'Vitality_Booster', amount: 2 },
    ],
  },
  {
    name: 'Satanic',
    tier: 5,
    sources: [
      { name: 'Reaver', amount: 1 },
      { name: 'Mask_of_Madness', amount: 1 },
    ],
  },
  {
    name: 'Assault_Cuirass',
    tier: 5,
    sources: [
      { name: 'Platemail', amount: 1 },
      { name: 'Chainmail', amount: 1 },
      { name: 'Hyperstone', amount: 1 },
    ],
  },
  {
    name: 'Scythe_of_Vyse',
    tier: 5,
    sources: [
      { name: 'Mystic_Staff', amount: 1 },
      { name: 'Ultimate_Orb', amount: 1 },
      { name: 'Void_Stone', amount: 1 },
    ],
  },
  {
    name: 'Refresher_Orb',
    tier: 5,
    sources: [{ name: 'Perseverance', amount: 2 }],
  },
  {
    name: 'Ogre_Hood',
    tier: 5,
    sources: [
      { name: 'Reaver', amount: 1 },
      { name: 'Ogre_Axe', amount: 1 },
      { name: 'Cloak', amount: 1 },
    ],
  },
  {
    name: 'Vesture_of_t',
    tier: 5,
    sources: [
      { name: 'Sacred_Relic', amount: 1 },
      { name: 'Crown', amount: 1 },
      { name: 'Robe_of_the_Magi', amount: 1 },
    ],
  },
]
