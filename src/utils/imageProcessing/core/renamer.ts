import { parseFilename } from '../parser';
import { findCharacter } from '../matcher';
import { generateFilename } from '../generator';

export async function renameImage(file: File): Promise<File> {
  try {
    // Parse the filename
    const parsed = parseFilename(file.name);
    if (!parsed) return file;

    // Find matching character
    const character = findCharacter(parsed.characterTag, parsed.seriesTag);
    if (!character) return file;

    // Generate new filename
    const newName = generateFilename(character, file.name.split('.').pop() || '');
    
    // Create new file with renamed filename
    return new File([file], newName, { type: file.type });
  } catch (error) {
    console.error('Error renaming image:', error);
    return file;
  }
}