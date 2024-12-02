import { CharacterData, ParsedImageName } from './types';
import { parseCharacterString, generateImageName } from './parser';

export class ImageRenamer {
  parseImageName(filename: string): ParsedImageName {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    const parsedCharacter = parseCharacterString(nameWithoutExt);
    
    return {
      originalName: filename,
      character: parsedCharacter,
      timestamp
    };
  }

  generateNewName(parsedName: ParsedImageName): string {
    if (!parsedName.character) {
      return parsedName.originalName;
    }

    const extension = parsedName.originalName.split('.').pop() || '';
    const newBaseName = generateImageName(
      parsedName.character,
      parsedName.timestamp
    );

    return `${newBaseName}.${extension}`;
  }

  renameImage(filename: string): string {
    const parsed = this.parseImageName(filename);
    return this.generateNewName(parsed);
  }
}