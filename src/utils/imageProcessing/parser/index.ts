export function parseImageTags(filename: string) {
  // Remove leading numbers and extension
  const cleanName = filename.replace(/^\d+[-\s]*/, '').replace(/\.[^/.]+$/, '');
  
  // Match pattern: "1girl, character, series" before "Break"
  const pattern = /1girl,\s*([^,]+),\s*([^,]+?)(?:\s*,\s*Break|$)/i;
  const match = cleanName.match(pattern);
  
  if (!match) return null;
  
  const [_, characterTag, seriesTag] = match;
  if (!characterTag || !seriesTag) return null;
  
  return {
    characterTag: characterTag.trim().toLowerCase(),
    seriesTag: seriesTag.trim().toLowerCase()
  };
}