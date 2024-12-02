import { CharacterData } from './types';

const PATTERN_1GIRL = /^1girl,\s*([^,]+),\s*([^,]+)/;

export const parseCharacterString = (input: string): CharacterData | null => {
  const match = input.match(PATTERN_1GIRL);
  if (!match) return null;

  const [_, characterName, seriesName] = match;
  if (!characterName || !seriesName) return null;

  return {
    character: characterName.trim(),
    series: seriesName.trim(),
    tags: [input.trim()]
  };
};

export const generateImageName = (
  character: CharacterData,
  timestamp: string
): string => {
  const baseName = character.character
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_');
    
  const seriesName = character.series
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_');
  
  return `${baseName}_${seriesName}_${timestamp}`;
};