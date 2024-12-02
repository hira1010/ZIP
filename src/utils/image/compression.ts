import imageCompression from 'browser-image-compression';
import { IMAGE_CONSTANTS } from './constants';

const getCompressionOptions = (file: File, quality: number = 0.8) => {
  const sizeMB = file.size / (1024 * 1024);
  return {
    maxSizeMB: Math.min(sizeMB, IMAGE_CONSTANTS.OPTIMAL_FILE_SIZE),
    maxWidthOrHeight: IMAGE_CONSTANTS.MAX_WIDTH,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: quality,
    alwaysKeepResolution: true,
    preserveExif: false,
  };
};

export const compressImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<File> => {
  try {
    // ファイルサイズが既に十分小さい場合はそのまま返す
    if (file.size / (1024 * 1024) <= IMAGE_CONSTANTS.OPTIMAL_FILE_SIZE) {
      onProgress?.(100);
      return file;
    }

    let compressedFile = file;
    
    // 段階的な品質調整による圧縮
    for (const quality of IMAGE_CONSTANTS.QUALITY_STEPS) {
      const options = getCompressionOptions(compressedFile, quality);
      
      compressedFile = await imageCompression(compressedFile, {
        ...options,
        onProgress: (progress: number) => {
          onProgress?.(Math.round(progress * 100));
        },
      });

      if (compressedFile.size / (1024 * 1024) <= IMAGE_CONSTANTS.OPTIMAL_FILE_SIZE) {
        break;
      }
    }

    return compressedFile;
  } catch (error) {
    console.error('Image compression failed:', error);
    throw error;
  }
};