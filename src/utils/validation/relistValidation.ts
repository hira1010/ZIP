import { ValidationRule } from './types';

export const relistValidation: ValidationRule = {
  validate: (value: number) => {
    if (isNaN(value) || value < 0 || value > 3) {
      return '自動再出品は0から3までの数字を入力してください';
    }
    return null;
  }
};