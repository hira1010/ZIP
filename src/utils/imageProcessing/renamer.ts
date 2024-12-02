import { parseImageName } from './nameParser';
import { findCharacter } from './characterMatcher';
import { generateFileName } from './nameGenerator';
import type { RenameResult } from '../characterData/types';

export class ImageRenamer {
  processFileName(filename: string): RenameResult {
    const extension = filename.split('.').pop() || '';
    const parsed = parseImageName(filename);
    
    if (!parsed) {
      return {
        originalName: filename,
        newName: filename
      };
    }

    const character = findCharacter(parsed.characterName, parsed.seriesName);
    if (!character) {
      return {
        originalName: filename,
        newName: filename
      };
    }

    const newName = generateFileName(character, extension);
    
    return {
      originalName: filename,
      newName,
      character
    };
  }
}