import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const createImageZip = async (
  processedImages: { file: File; name: string }[],
  originalImages: { file: File; name: string }[]
): Promise<Blob> => {
  const zip = new JSZip();

  // Add processed images
  const processedFolder = zip.folder('processed');
  processedImages.forEach(({ file, name }) => {
    processedFolder?.file(name, file);
  });

  // Add original images
  const originalsFolder = zip.folder('originals');
  originalImages.forEach(({ file, name }) => {
    originalsFolder?.file(name, file);
  });

  return zip.generateAsync({ type: 'blob' });
};