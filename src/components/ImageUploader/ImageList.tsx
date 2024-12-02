```tsx
import React from 'react';
import { X } from 'lucide-react';

type ImageListProps = {
  images: string[];
  onRemove: (index: number) => void;
  onReorder: (dragIndex: number, dropIndex: number) => void;
};

export function ImageList({ images, onRemove, onReorder }: ImageListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group"
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
            onReorder(dragIndex, index);
          }}
        >
          <img
            src={image}
            alt={`アップロード画像 ${index + 1}`}
            className="w-full aspect-square object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {index + 1}
          </span>
        </div>
      ))}
    </div>
  );
}
```