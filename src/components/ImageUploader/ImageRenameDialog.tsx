import React from 'react';
import type { CharacterData } from '../../utils/characterData/types';

type ImageRenameDialogProps = {
  originalName: string;
  newName: string;
  character?: CharacterData;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ImageRenameDialog({
  originalName,
  newName,
  character,
  onConfirm,
  onCancel
}: ImageRenameDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">画像名の変更確認</h3>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">元のファイル名:</span> {originalName}
          </p>
          {character && (
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-medium">検出されたキャラクター:</span> {character.character}
              </p>
              <p>
                <span className="font-medium">作品名:</span> {character.series}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">検出タグ:</span> {character.tags.join(', ')}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium">新しいファイル名:</span> {newName}
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            変更を確定
          </button>
        </div>
      </div>
    </div>
  );
}