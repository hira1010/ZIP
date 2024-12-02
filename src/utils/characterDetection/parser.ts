```typescript
import { CharacterInfo } from './types';
import { characterList } from './characterList';

// "1girl, character, series" のパターンにマッチ
const PATTERN_1GIRL = /1girl,\s*([^,]+),\s*([^,]+)/;

export function parseCharacterString(input: string): CharacterInfo | null {
  const match = input.match(PATTERN_1GIRL);
  if (!match) return null;

  const [_, characterName, seriesName] = match;
  if (!characterName || !seriesName) return null;

  // キャラクターリストから一致するものを探す
  const character = characterList.find(char => 
    char.tags.some(tag => 
      tag.toLowerCase().includes(characterName.trim().toLowerCase())
    )
  );

  return character || null;
}

export function generateFileName(character: CharacterInfo): string {
  const timestamp = new Date().toISOString()
    .replace(/[:.]/g, '-')
    .slice(0, -5);
  
  return `${character.series}_${character.name}_${timestamp}`;
}
```