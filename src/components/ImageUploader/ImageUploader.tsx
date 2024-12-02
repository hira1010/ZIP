import React, { useState, useCallback } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ImagePreview } from './ImagePreview';
import { processImage } from '../../utils/imageProcessing/processor';
import { validateImageFile } from '../../utils/imageProcessing/validation';

type ImageUploaderProps = {
  images: { url: string; name: string }[];
  onChange: (images: { url: string; name: string }[]) => void;
};

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      const validFiles = files.filter(validateImageFile);
      
      if (validFiles.length === 0) {
        alert('アップロード可能な画像がありません。\n画像サイズは10MB以下、形式はJPEG、PNG、GIF、WebPのみ対応しています。');
        return;
      }

      for (const file of validFiles) {
        const processedImage = await processImage(file);
        onChange([...images, processedImage]);
      }
    } catch (error) {
      console.error('Error processing images:', error);
      alert('画像の処理中にエラーが発生しました');
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  }, [images, onChange]);

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <ImagePreview
            key={index}
            image={image.url}
            name={image.name}
            index={index}
            onRemove={() => removeImage(index)}
          />
        ))}
        
        <label className={`w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-colors ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}>
          <ImageIcon className="w-8 h-8 mb-1" />
          <span className="text-xs">{isProcessing ? '処理中...' : '画像を追加'}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={isProcessing}
            className="hidden"
          />
        </label>
      </div>
      
      <div className="text-sm text-gray-500">
        ※ 画像は自動的に圧縮されます
      </div>
    </div>
  );
}