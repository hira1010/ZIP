export const validators = {
  title: (value: string) => {
    if (!value.trim()) return 'タイトルを入力してください';
    return null;
  },

  endTime: (value: number) => {
    if (isNaN(value) || value < 0 || value > 23) {
      return '終了時間は0から23までの数字を入力してください';
    }
    return null;
  },

  autoRelist: (value: number) => {
    if (isNaN(value) || value < 0 || value > 3) {
      return '自動再出品は0から3までの数字を入力してください';
    }
    return null;
  },

  featuredCategory: (value: string) => {
    if (!/^\d*$/.test(value)) {
      return '注目のオークションは数字のみ入力可能です';
    }
    return null;
  }
};

export type ValidationErrors = {
  [key: string]: string | null;
};