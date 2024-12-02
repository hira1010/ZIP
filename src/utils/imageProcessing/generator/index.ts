import { CharacterData } from '../../characterData/types';

export function generateFilename(character: CharacterData, extension: string): string {
  const timestamp = new Date().toISOString()
    .replace(/[:.]/g, '-')
    .slice(0, -5);
  
  // Use Japanese character name and series
  const baseName = `${character.character}_${character.series}_${timestamp}`;
  
  // Clean filename but preserve Japanese characters
  const cleanName = baseName
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
    .replace(/\s+/g, '_');        // Replace spaces with underscores

  return `${cleanName}.${extension}`;
}