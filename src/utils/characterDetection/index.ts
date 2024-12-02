import { CharacterInfo, RenameResult } from './types';
import { ImageRenamer } from './renamer';
import { characterList } from './characterList';

const renamer = new ImageRenamer();

export function processImageName(filename: string): RenameResult {
  // Remove leading numbers and hyphens
  const cleanName = filename.replace(/^\d+[-\s]*/, '');
  
  // Process the filename
  const result = renamer.processFileName(cleanName);
  
  // If character was detected, translate to Japanese
  if (result.character) {
    const japaneseChar = characterList.find(char => 
      char.tags.some(tag => tag.includes(result.character!.name.toLowerCase()))
    );
    
    if (japaneseChar) {
      result.newName = `${japaneseChar.name}_${japaneseChar.series}${filename.match(/\.[^.]+$/)?.[0] || ''}`;
    }
  }

  return result;
}

export function shouldPromptRename(result: RenameResult): boolean {
  return result.originalName !== result.newName && !!result.character;
}

export { CharacterInfo, RenameResult };