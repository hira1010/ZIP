import { ValidationRule } from './types';

export const titleValidation: ValidationRule = {
  validate: (value: string) => {
    if (!value.trim()) {
      return 'タイトルを入力してください';
    }
    if (value.length > 65) {
      return 'タイトルは65文字以内で入力してください';
    }
    return null;
  }
};