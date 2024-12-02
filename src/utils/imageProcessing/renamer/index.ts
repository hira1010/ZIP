import { parseImageTags } from '../parser';
import { findCharacter } from '../matcher';
import { CharacterData } from '../../characterData/types';

export interface RenameResult {
  originalName: string;
  newName: string;
  character?: CharacterData;
}

export class ImageRenamer {
  processFileName(filename: string): RenameResult {
    // Parse image tags
    const parsed = parseImageTags(filename);
    if (!parsed) {
      return { originalName: filename, newName: filename };
    }

    // Find matching character
    const character = findCharacter(parsed.characterTag, parsed.seriesTag);
    if (!character) {
      return { originalName: filename, newName: filename };
    }

    // Generate new filename
    const timestamp = new Date().toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, -5);
    
    const extension = filename.split('.').pop() || '';
    const newName = `${character.character}_${character.series}_${timestamp}.${extension}`
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_');

    return {
      originalName: filename,
      newName,
      character
    };
  }
}