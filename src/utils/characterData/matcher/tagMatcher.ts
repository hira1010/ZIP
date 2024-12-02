import { CharacterData } from '../types';

export function matchCharacterByTag(
  tag: string,
  characters: CharacterData[]
): CharacterData | null {
  if (!tag) return null;
  
  const searchTag = tag.toLowerCase();

  // Try exact match first
  const exactMatch = characters.find(char =>
    char.tags.some(t => t.toLowerCase() === searchTag)
  );
  if (exactMatch) return exactMatch;

  // Try partial match
  return characters.find(char =>
    char.tags.some(t => t.toLowerCase().includes(searchTag))
  ) || null;
}