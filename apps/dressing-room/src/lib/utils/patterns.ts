export const PATTERN_IDS = [
  "mintBlocks",
  "peachStripes",
  "skyDots",
  "lemonGrid",
  "lavenderDiagonal",
  "aquaChecker",
  "roseWaves",
  "limeTriangles",
  "sandZigzag",
  "slateCross",
] as const

export type PatternId = typeof PATTERN_IDS[number]

export const pickPatternId = (): PatternId =>
  PATTERN_IDS[Math.floor(Math.random() * PATTERN_IDS.length)]