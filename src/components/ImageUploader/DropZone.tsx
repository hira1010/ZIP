```tsx
import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

type DropZoneProps = {
  onFileSelect: (files: FileList) => void;
  disabled?: boolean;
};

export function DropZone({ onFileSelect, disabled }: DropZoneProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center space-y-2 
        ${disabled ? 'border-gray-300 cursor-not-allowed' : 'border-orange-300 cursor-pointer hover:border-orange-500'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <ImageIcon className="w-12 h-12 text-gray-400" />
      <div className="text-center">
        <p className="text-sm text-gray-600">
          ドラッグ＆ドロップまたはクリックして画像を追加
        </p>
        <p className="text-xs text-gray-500 mt-1">
          JPEG, PNG, GIF, WebP (最大10MB)
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && onFileSelect(e.target.files)}
        disabled={disabled}
      />
    </div>
  );
}
```