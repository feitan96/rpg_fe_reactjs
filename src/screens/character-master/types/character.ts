// This file defines the TypeScript interface for a character in the game.
export interface Character {
  id: number;
  name: string;
  description: string;
  type: string
  classification: string;
  spritePath: string;
  baseHealth: number;
  baseAttack: number;
  baseMagic: number;
  basePhysicalDefense: number;
  baseMagicalDefense: number;
  baseSpeed: number;
  createdAt: string;
  updatedAt: string;
}