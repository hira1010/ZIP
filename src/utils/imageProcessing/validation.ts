import { IMAGE_CONSTANTS } from './constants';

export const validateImageFile = (file: File): boolean => {
  return IMAGE_CONSTANTS.VALID_TYPES.includes(file.type) && 
         file.size <= IMAGE_CONSTANTS.MAX_FILE_SIZE;
};