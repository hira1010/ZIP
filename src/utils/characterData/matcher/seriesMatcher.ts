import { CharacterData } from '../types';

export function matchCharacterBySeries(
  character: CharacterData,
  seriesTag?: string
): boolean {
  if (!seriesTag) return true;
  
  const searchSeries = seriesTag.toLowerCase();
  const characterSeries = character.series.toLowerCase();

  // Check for exact match first
  if (characterSeries === searchSeries) return true;

  // Check for partial matches
  return characterSeries.includes(searchSeries) || 
         searchSeries.includes(characterSeries);
}