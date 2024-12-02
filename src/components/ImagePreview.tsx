import React from 'react';
import { X } from 'lucide-react';

type ImagePreviewProps = {
  image: string;
  name: string;
  index: number;
  onRemove: () => void;
};

export function ImagePreview({ image, name, index, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative group">
      <div className="w-32 space-y-1">
        <div className="w-32 h-32">
          <img
            src={image}
            alt={`商品画像 ${index + 1}`}
            className="w-full h-full object-cover rounded-lg border border-gray-200"
          />
        </div>
        <p className="text-xs text-gray-600 break-all text-center">
          {name}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
      <span className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
        {index + 1}
      </span>
    </div>
  );
}