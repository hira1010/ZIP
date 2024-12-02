import React from 'react';
import { Save, Download, Trash2 } from 'lucide-react';

type SaveLoadButtonsProps = {
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
};

export function SaveLoadButtons({ onSave, onLoad, onClear }: SaveLoadButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        title="現在の内容を保存"
      >
        <Save className="w-4 h-4" />
        保存
      </button>
      <button
        onClick={onLoad}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        title="保存した内容を読み込む"
      >
        <Download className="w-4 h-4" />
        読み込む
      </button>
      <button
        onClick={() => {
          if (window.confirm('保存した内容を削除してもよろしいですか？')) {
            onClear();
          }
        }}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        title="保存した内容を削除"
      >
        <Trash2 className="w-4 h-4" />
        削除
      </button>
    </div>
  );
}