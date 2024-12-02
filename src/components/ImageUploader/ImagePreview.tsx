import React from 'react';
import { X } from 'lucide-react';
import { getImageName } from '../../utils/image';

type ImagePreviewProps = {
  image: string;
  index: number;
  onRemove: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
};

export function ImagePreview({
  image,
  index,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop
}: ImagePreviewProps) {
  return (
    <div
      className="relative group"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="w-24 space-y-1">
        <img
          src={image.split('#')[0]}
          alt={`商品画像 ${index + 1}`}
          className="w-24 h-24 object-cover rounded-lg border border-gray-200 cursor-move"
        />
        <p className="text-xs text-gray-600 break-all text-center">
          {getImageName(image)}
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