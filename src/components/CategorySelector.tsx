import React from 'react';

type CategorySelectorProps = {
  category: string;
  subCategory: string;
  onCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
};

export function CategorySelector({ category, onCategoryChange }: CategorySelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        カテゴリ番号 *
      </label>
      <input
        type="text"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder="カテゴリ番号を入力 (例: 20068)"
      />
      <p className="mt-1 text-sm text-gray-500">
        Yahoo!オークションのカテゴリ番号を入力してください
      </p>
    </div>
  );
}