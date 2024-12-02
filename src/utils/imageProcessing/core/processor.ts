import imageCompression from 'browser-image-compression';
import { IMAGE_DEFAULTS } from '../../config';
import { renameImage } from './renamer';
import type { ProcessedImage } from '../types';

export async function processImage(file: File): Promise<ProcessedImage> {
  try {
    // First rename the file
    const renamedFile = await renameImage(file);
    
    // Then compress the image
    const compressedFile = await imageCompression(renamedFile, {
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
    const name = `${renamedFile.name.replace(/\.[^/.]+$/, '')} (${originalSize}MB→${compressedSize}MB)`;

    return { url, name };
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}