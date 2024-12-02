import watermark from 'watermarkjs';

export interface WatermarkOptions {
  text: string;
  fontSize?: number;
  color?: string;
  opacity?: number;
  position?: 'center' | 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
}

const defaultOptions: WatermarkOptions = {
  text: '© All rights reserved',
  fontSize: 20,
  color: 'rgba(255, 255, 255, 0.5)',
  opacity: 0.5,
  position: 'bottomRight'
};

const getPositionCoordinates = (
  position: WatermarkOptions['position'],
  imageWidth: number,
  imageHeight: number,
  textWidth: number,
  textHeight: number
) => {
  const padding = 10;
  switch (position) {
    case 'center':
      return [(imageWidth - textWidth) / 2, (imageHeight - textHeight) / 2];
    case 'bottomRight':
      return [imageWidth - textWidth - padding, imageHeight - textHeight - padding];
    case 'bottomLeft':
      return [padding, imageHeight - textHeight - padding];
    case 'topRight':
      return [imageWidth - textWidth - padding, padding];
    case 'topLeft':
      return [padding, padding];
    default:
      return [imageWidth - textWidth - padding, imageHeight - textHeight - padding];
  }
};

export const addWatermark = async (
  imageFile: File,
  options: Partial<WatermarkOptions> = {}
): Promise<Blob> => {
  const mergedOptions = { ...defaultOptions, ...options };
  
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Draw original image
      ctx.drawImage(image, 0, 0);

      // Configure watermark text
      ctx.font = `${mergedOptions.fontSize}px Arial`;
      ctx.fillStyle = mergedOptions.color || 'rgba(255, 255, 255, 0.5)';
      ctx.globalAlpha = mergedOptions.opacity || 0.5;

      // Calculate text dimensions
      const textMetrics = ctx.measureText(mergedOptions.text);
      const [x, y] = getPositionCoordinates(
        mergedOptions.position,
        image.width,
        image.height,
        textMetrics.width,
        mergedOptions.fontSize || 20
      );

      // Draw watermark
      ctx.fillText(mergedOptions.text, x, y);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create watermarked image'));
          }
        },
        'image/jpeg',
        0.95
      );
    };

    image.onerror = () => reject(new Error('Failed to load image'));
    image.src = URL.createObjectURL(imageFile);
  });
};