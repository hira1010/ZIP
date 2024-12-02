export function parseImageName(filename: string) {
  // Remove extension and leading numbers
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const cleanName = nameWithoutExt.replace(/^\d+[-\s]*/, '');
  
  // Look for the pattern "1girl, character_name, series_name" before "Break" or end
  const pattern = /1girl,\s*([^,]+),\s*([^,]+?)(?:\s*,\s*Break|$)/i;
  const match = cleanName.match(pattern);
  
  if (!match) return null;
  
  const [_, characterName, seriesName] = match;
  if (!characterName || !seriesName) return null;
  
  return {
    characterName: characterName.trim(),
    seriesName: seriesName.trim()
  };
}