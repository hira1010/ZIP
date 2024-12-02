import { useState, useCallback } from 'react';
import { ImageProcessor, ProcessingOptions } from '../utils/image/processor';
import { useImageRenamer } from './useImageRenamer';

export function useImageProcessor() {
  const [processor] = useState(() => new ImageProcessor());
  const {
    processFileName,
    pendingRename,
    confirmRename,
    cancelRename
  } = useImageRenamer();

  const processImage = useCallback(async (
    file: File,
    options: ProcessingOptions = {}
  ) => {
    try {
      // First process the filename
      const renamedFile = processFileName(file);
      if (!renamedFile) return null; // Pending rename

      // Then process the image with watermark and compression
      return await processor.processImage(renamedFile, renamedFile.name, {
        watermark: {
          text: '© All rights reserved',
          position: 'bottomRight',
          fontSize: 20,
          opacity: 0.5
        },
        saveOriginal: true,
        compress: true,
        ...options
      });
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }, [processor, processFileName]);

  const exportImages = useCallback(async () => {
    try {
      await processor.exportZip('processed_images.zip');
    } catch (error) {
      console.error('Error exporting images:', error);
      throw error;
    }
  }, [processor]);

  return {
    processImage,
    exportImages,
    pendingRename,
    confirmRename,
    cancelRename
  };
}