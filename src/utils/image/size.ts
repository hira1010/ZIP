export const calculateTotalSize = (imageUrls: string[]): number => {
  return imageUrls.reduce((sum, url) => {
    const base64Data = url.split('#')[0].split(',')[1];
    const sizeInBytes = (base64Data.length * 3) / 4;
    return sum + sizeInBytes;
  }, 0);
};