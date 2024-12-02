import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

type SavedDescriptionsListProps = {
  descriptions: { [key: string]: string };
  onLoad: (description: string) => void;
  onDelete: (timestamp: string) => void;
};

export function SavedDescriptionsList({
  descriptions,
  onLoad,
  onDelete
}: SavedDescriptionsListProps) {
  if (Object.keys(descriptions).length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-medium text-gray-700 mb-3">保存済みテンプレート</h3>
      <div className="space-y-2">
        {Object.entries(descriptions).map(([timestamp, description]) => (
          <div key={timestamp} className="flex items-center justify-between bg-white p-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {new Date(timestamp).toLocaleString('ja-JP')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onLoad(description)}
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                読み込む
              </button>
              <button
                onClick={() => onDelete(timestamp)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}