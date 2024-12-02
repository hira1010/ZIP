export function tokenizeFilename(filename: string) {
  // Remove extension and leading numbers/spaces
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  const cleanName = nameWithoutExt.replace(/^\d+[-\s]*/, '');
  
  // Split by commas and clean each token
  return cleanName
    .split(',')
    .map(token => token.trim())
    .filter(Boolean);
}

export function extractTagsBeforeBreak(tokens: string[]): string[] {
  const breakIndex = tokens.findIndex(token => 
    token.toLowerCase().includes('break')
  );
  
  return breakIndex > -1 ? tokens.slice(0, breakIndex) : tokens;
}