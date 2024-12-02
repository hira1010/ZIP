import { characterList } from '../../characterData/characterList';
import { CharacterData } from '../../characterData/types';

export function findCharacter(characterTag: string, seriesTag: string): CharacterData | null {
  // Convert search terms to lowercase
  const searchChar = characterTag.toLowerCase();
  const searchSeries = seriesTag.toLowerCase();

  // Try exact match first
  let match = characterList.find(char => 
    char.tags.some(tag => tag.toLowerCase() === searchChar) &&
    char.series.toLowerCase() === searchSeries
  );

  // If no exact match, try partial match
  if (!match) {
    match = characterList.find(char => 
      char.tags.some(tag => tag.toLowerCase().includes(searchChar)) &&
      (char.series.toLowerCase().includes(searchSeries) || 
       searchSeries.includes(char.series.toLowerCase()))
    );
  }

  return match || null;
}