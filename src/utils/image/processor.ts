import { addWatermark, WatermarkOptions } from './watermark';
import { saveOriginalImage } from './storage';
import { createImageZip } from './export';
import { compressImage } from './compression';

export interface ProcessingOptions {
  watermark?: WatermarkOptions;
  saveOriginal?: boolean;
  compress?: boolean;
}

export class ImageProcessor {
  private processedImages: { file: File; name: string }[] = [];
  private originalImages: { file: File; name: string }[] = [];

  async processImage(
    file: File,
    newName: string,
    options: ProcessingOptions = {}
  ): Promise<File> {
    try {
      // Save original if requested
      if (options.saveOriginal) {
        await saveOriginalImage(file, newName);
        this.originalImages.push({ file, name: newName });
      }

      // Compress if requested
      let processedFile = options.compress ? 
        await compressImage(file) : 
        file;

      // Add watermark if requested
      if (options.watermark) {
        const watermarkedBlob = await addWatermark(processedFile, options.watermark);
        processedFile = new File([watermarkedBlob], newName, {
          type: 'image/jpeg'
        });
      }

      this.processedImages.push({ file: processedFile, name: newName });
      return processedFile;
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }

  async exportZip(filename: string = 'images.zip'): Promise<void> {
    try {
      const zipBlob = await createImageZip(
        this.processedImages,
        this.originalImages
      );
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error creating zip:', error);
      throw error;
    }
  }

  clear(): void {
    this.processedImages = [];
    this.originalImages = [];
  }
}