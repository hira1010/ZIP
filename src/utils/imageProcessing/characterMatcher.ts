import { CharacterData } from '../characterData/types';
import { characterList } from '../characterData/characterList';

export function findCharacter(characterName: string, seriesName?: string): CharacterData | null {
  // Convert inputs to lowercase for case-insensitive matching
  const searchChar = characterName.toLowerCase();
  const searchSeries = seriesName?.toLowerCase();

  // Try exact match first with both character and series
  let character = characterList.find(char => 
    char.tags.some(tag => tag.toLowerCase() === searchChar) &&
    (!searchSeries || char.series.toLowerCase().includes(searchSeries))
  );

  // If no exact match, try partial match
  if (!character) {
    character = characterList.find(char => 
      char.tags.some(tag => tag.toLowerCase().includes(searchChar)) &&
      (!searchSeries || char.series.toLowerCase().includes(searchSeries))
    );
  }

  return character;
}