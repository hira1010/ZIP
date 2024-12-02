import { CharacterData } from '../characterData/types';

export function generateFileName(
  character: CharacterData,
  originalExtension: string
): string {
  const timestamp = new Date().toISOString()
    .replace(/[:.]/g, '-')
    .slice(0, -5);

  // Create filename in format: CharacterName_SeriesName_Timestamp
  const baseName = `${character.character}_${character.series}_${timestamp}`;
  
  // Clean filename by replacing invalid characters
  const cleanName = baseName
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_');

  return `${cleanName}.${originalExtension}`;
}