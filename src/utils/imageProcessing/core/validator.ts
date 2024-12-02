import { IMAGE_DEFAULTS } from '../../config';

export function validateImage(file: File): boolean {
  const isValidType = IMAGE_DEFAULTS.VALID_TYPES.includes(file.type as any);
  const isValidSize = file.size <= IMAGE_DEFAULTS.MAX_SIZE;
  return isValidType && isValidSize;
}