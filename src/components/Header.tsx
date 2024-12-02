import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { SaveLoadButtons } from './SaveLoadButtons';

type HeaderProps = {
  onExport: () => void;
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
};

export function Header({ onExport, onSave, onLoad, onClear }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="w-8 h-8 text-orange-500" />
        <h1 className="text-2xl font-bold text-gray-800">ヤフオク！出品CSVジェネレーター</h1>
      </div>
      <div className="flex gap-4">
        <SaveLoadButtons
          onSave={onSave}
          onLoad={onLoad}
          onClear={onClear}
        />
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          ZIPでダウンロード
        </button>
      </div>
    </div>
  );
}