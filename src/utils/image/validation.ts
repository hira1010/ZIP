import { IMAGE_CONSTANTS } from './constants';

export const validateImageFile = (file: File): boolean => {
  return IMAGE_CONSTANTS.VALID_TYPES.includes(file.type as any) && 
         file.size <= IMAGE_CONSTANTS.MAX_INPUT_SIZE;
};

export const validateTotalSize = (totalSize: number): boolean => {
  return totalSize <= IMAGE_CONSTANTS.MAX_TOTAL_SIZE;
};