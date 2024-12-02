import { characterList } from './characterList';

export class ImageRenamer {
  processFileName(filename: string) {
    // 先頭の数字とハイフンを削除
    const cleanName = filename.replace(/^\d+[-\s]*/, '');
    
    // 1girl, character, series のパターンを検出
    const match = cleanName.match(/1girl,\s*([^,]+),\s*([^,]+)/);
    if (!match) return { originalName: filename, newName: filename };

    const [_, characterName, seriesName] = match;
    if (!characterName || !seriesName) return { originalName: filename, newName: filename };

    // キャラクターリストから一致を探す
    const character = characterList.find(char => 
      char.tags.some(tag => tag.toLowerCase().includes(characterName.trim().toLowerCase()))
    );

    if (!character) return { originalName: filename, newName: filename };

    // 新しいファイル名を生成
    const extension = filename.match(/\.[^.]+$/)?.[0] || '';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const newName = `${character.series}_${character.name}_${timestamp}${extension}`;

    return {
      originalName: filename,
      newName,
      character
    };
  }
}