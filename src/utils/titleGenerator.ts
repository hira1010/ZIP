const TITLE_SUFFIX = '美尻 巨乳 セクシー グラビア コスプレ 同人 アニメ イラスト ファンアート 高画質 A4 ポスター';
const MAX_TITLE_LENGTH = 65;

export function generateTitle(baseName: string, index: number): string {
  // Add sequential number to base name
  const numberedName = `${baseName}（${index + 1}）`;
  const fullTitle = `${numberedName} ${TITLE_SUFFIX}`;
  
  if (fullTitle.length <= MAX_TITLE_LENGTH) {
    return fullTitle;
  }

  // Calculate how many characters we need to remove from the suffix
  const excess = fullTitle.length - MAX_TITLE_LENGTH;
  const suffixWords = TITLE_SUFFIX.split(' ');
  
  // Remove words from the end until we're under the limit
  while (suffixWords.length > 0 && 
         (numberedName + ' ' + suffixWords.slice(0, -1).join(' ')).length > MAX_TITLE_LENGTH) {
    suffixWords.pop();
  }
  
  // Join remaining words and ensure total length is within limit
  const truncatedSuffix = suffixWords.join(' ');
  const truncatedTitle = `${numberedName} ${truncatedSuffix}`.slice(0, MAX_TITLE_LENGTH);
  
  return truncatedTitle;
}