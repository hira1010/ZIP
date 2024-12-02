import { CharacterData } from '../types';
import { matchCharacterByTag } from './tagMatcher';
import { matchCharacterBySeries } from './seriesMatcher';
import { characterList } from '../characterList';

export function findCharacter(
  characterTag?: string,
  seriesTag?: string
): CharacterData | null {
  if (!characterTag) return null;

  const character = matchCharacterByTag(characterTag, characterList);
  if (!character) return null;

  return matchCharacterBySeries(character, seriesTag) ? character : null;
}