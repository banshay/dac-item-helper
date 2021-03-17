export interface Strategy {
  name: string
  combinations?: Combination[]
  gamePeriod: GamePeriod
}

export interface Combination {
  synergyName: string
  pieces: number
}

enum GamePeriod {
  Early,
  Mid,
  Late,
  Always,
}

enum StrengthRating {
  Early,
  Mid,
  Late,
  Always,
}

export const items: Strategy[] = [
  {
    name: 'Bär',
    combinations: [
      { synergyName: 'Hunter', pieces: 6 },
      { synergyName: 'Orc', pieces: 2 },
    ],
    gamePeriod: GamePeriod.Always,
  },
]
