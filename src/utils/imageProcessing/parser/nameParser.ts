import { tokenizeFilename, extractTagsBeforeBreak } from './tokenizer';
import { findCharacterPattern } from './patternMatcher';

export interface ParsedName {
  characterTag?: string;
  seriesTag?: string;
  originalName: string;
}

export function parseImageName(filename: string): ParsedName {
  const tokens = tokenizeFilename(filename);
  const relevantTokens = extractTagsBeforeBreak(tokens);
  const { characterTag, seriesTag } = findCharacterPattern(relevantTokens);

  return {
    characterTag,
    seriesTag,
    originalName: filename
  };
}