export type CharacterType = 'HERO' | 'VILLAIN';
export const CharacterTypeList = ['HERO', 'VILLAIN'] as const;

export type CharacterClassification =
  | 'Human'
  | 'Orc'
  | 'Demon'
  | 'Angel'
  | 'Monster';
export const CharacterClassificationList = [
  'Human',
  'Orc',
  'Demon',
  'Angel',
  'Monster',
] as const;