import { compressImage } from './compression';

export const readImageAsDataURL = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const compressedFile = await compressImage(file, onProgress);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        const encodedName = encodeURIComponent(nameWithoutExt);
        
        // 圧縮前後のサイズ情報を追加
        const originalSize = (file.size / (1024 * 1024)).toFixed(2);
        const compressedSize = (compressedFile.size / (1024 * 1024)).toFixed(2);
        const sizeInfo = `${originalSize}MB→${compressedSize}MB`;
        
        resolve(`${base64}#${encodedName}#${sizeInfo}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

export const getImageName = (url: string): string => {
  const [_, encodedName, sizeInfo] = url.split('#');
  if (!encodedName) return '';
  
  const name = decodeURIComponent(encodedName);
  return sizeInfo ? `${name} (${sizeInfo})` : name;
};