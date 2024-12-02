import imageCompression from 'browser-image-compression';

// 最適な画像サイズの定数
const OPTIMAL_FILE_SIZE = 0.28; // MB
const MAX_WIDTH = 1500;
const QUALITY_STEPS = [0.7, 0.5, 0.3];

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  return validTypes.includes(file.type) && file.size <= maxSize;
};

const getProgressiveCompressionOptions = (attempt: number) => ({
  maxSizeMB: OPTIMAL_FILE_SIZE,
  maxWidthOrHeight: MAX_WIDTH,
  useWebWorker: true,
  fileType: 'image/jpeg',
  initialQuality: QUALITY_STEPS[attempt] || 0.3,
  alwaysKeepResolution: true,
  preserveExif: false,
});

export const compressImage = async (file: File): Promise<File> => {
  let compressedFile = file;
  let attempt = 0;

  while (attempt < QUALITY_STEPS.length) {
    try {
      const options = getProgressiveCompressionOptions(attempt);
      compressedFile = await imageCompression(
        compressedFile, 
        options
      );

      const sizeMB = compressedFile.size / (1024 * 1024);
      if (sizeMB <= OPTIMAL_FILE_SIZE) {
        break;
      }

      attempt++;
    } catch (error) {
      console.error('Compression attempt failed:', error);
      attempt++;
    }
  }

  return compressedFile;
};

export const readImageAsDataURL = async (file: File): Promise<string> => {
  try {
    const compressedFile = await compressImage(file);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        const encodedName = encodeURIComponent(nameWithoutExt);
        resolve(`${base64}#${encodedName}`);
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
  const [_, encodedName] = url.split('#');
  if (!encodedName) return '';
  return decodeURIComponent(encodedName);
};