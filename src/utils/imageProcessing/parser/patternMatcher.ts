export function findCharacterPattern(tokens: string[]): {
  characterTag?: string;
  seriesTag?: string;
} {
  // Look for "1girl" pattern first
  const girlIndex = tokens.findIndex(token => 
    token.toLowerCase().trim() === '1girl'
  );

  if (girlIndex === -1 || girlIndex + 2 >= tokens.length) {
    return {};
  }

  // Next two tokens after "1girl" are typically character and series
  const characterTag = tokens[girlIndex + 1].trim();
  const seriesTag = tokens[girlIndex + 2].trim();

  return { characterTag, seriesTag };
}