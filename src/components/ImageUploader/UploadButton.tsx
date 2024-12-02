import React from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

type UploadButtonProps = {
  isProcessing: boolean;
  progress: number;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UploadButton({ isProcessing, progress, onFileSelect }: UploadButtonProps) {
  return (
    <label className={`w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-colors ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}>
      {isProcessing ? (
        <>
          <Loader2 className="w-8 h-8 mb-1 animate-spin" />
          <span className="text-xs">{progress}%</span>
        </>
      ) : (
        <>
          <ImageIcon className="w-8 h-8 mb-1" />
          <span className="text-xs">画像を追加</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onFileSelect}
        disabled={isProcessing}
        className="hidden"
      />
    </label>
  );
}