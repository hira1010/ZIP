import { CharacterData } from './types';

// Extract first three words after "1girl" pattern
const PATTERN_1GIRL = /^1girl,\s*([^,]+),\s*([^,]+),\s*([^,]+)/;

export const detectCharacter = (filename: string): CharacterData | null => {
  const match = filename.match(PATTERN_1GIRL);
  if (!match) return null;

  const [_, word1, word2, word3] = match;
  if (!word1 || !word2 || !word3) return null;

  return {
    name: word1.trim(),
    series: word2.trim(),
    tags: [`1girl, ${word1}, ${word2}, ${word3}`],
    additionalTags: [word3.trim()]
  };
};

export const generateNewFilename = (
  originalName: string,
  character: CharacterData
): string => {
  const timestamp = new Date().toISOString()
    .replace(/[:.]/g, '-')
    .slice(0, -5);
  
  const extension = originalName.split('.').pop() || '';
  const characterName = character.name
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_');
  const seriesName = character.series
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_');

  return `${characterName}_${seriesName}_${timestamp}.${extension}`;
};