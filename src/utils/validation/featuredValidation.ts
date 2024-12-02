import { ValidationRule } from './types';

export const featuredValidation: ValidationRule = {
  validate: (value: string) => {
    if (!value) return null;
    if (value.length > 100) {
      return '注目のオークションは100文字以内で入力してください';
    }
    return null;
  }
};