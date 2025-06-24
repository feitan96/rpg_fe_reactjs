export type CharacterType = 'HERO' | 'VILLAIN';
export const CharacterTypeList = ['HERO', 'VILLAIN'] as const;

export type CharacterClassification =
  | 'Human'
  | 'Orc'
  | 'Demon'
  | 'Angel'
  | 'Beast'
  | 'Undead'
  | 'Elf'
  | 'Dragon'
  | 'Goblin'
  | 'Goblin'
  | 'Dwarf'
export const CharacterClassificationList = [
  'Human',
  'Orc',
  'Demon',
  'Angel',
  'Beast',
    'Undead',
    'Elf',
    'Dragon',
    'Goblin',
    'Dwarf',
] as const;