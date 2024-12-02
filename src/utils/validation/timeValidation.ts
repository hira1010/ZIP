import { ValidationRule } from './types';

export const timeValidation: ValidationRule = {
  validate: (value: number) => {
    if (isNaN(value) || value < 0 || value > 23) {
      return '終了時間は0から23までの数字を入力してください';
    }
    return null;
  }
};