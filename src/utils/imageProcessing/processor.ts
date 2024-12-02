import imageCompression from 'browser-image-compression';
import { ImageRenamer } from './renamer';
import { IMAGE_DEFAULTS } from '../config';

const renamer = new ImageRenamer();

export async function processImage(file: File): Promise<{ url: string; name: string }> {
  try {
    // First process the filename
    const renameResult = renamer.processFileName(file.name);
    
    // Create a new file with the renamed filename
    const processedFile = new File([file], renameResult.newName, { type: file.type });

    // Compress the image
    const compressedFile = await imageCompression(processedFile, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: IMAGE_DEFAULTS.COMPRESSION.MAX_WIDTH,
      useWebWorker: true,
      fileType: IMAGE_DEFAULTS.COMPRESSION.OUTPUT_FORMAT,
      initialQuality: IMAGE_DEFAULTS.COMPRESSION.QUALITY
    });

    // Create URL for preview
    const url = URL.createObjectURL(compressedFile);
    
    // Add size info to name
    const originalSize = (file.size / (1024 * 1024)).toFixed(2);
    const compressedSize = (compressedFile.size / (1024 * 1024)).toFixed(2);
    const name = `${renameResult.newName.replace(/\.[^/.]+$/, '')} (${originalSize}MB→${compressedSize}MB)`;

    return { url, name };
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}