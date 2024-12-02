import React from 'react';
import { RichTextEditor } from '../RichTextEditor';
import { SavedDescriptionsList } from './SavedDescriptionsList';

type DescriptionEditorProps = {
  value: string;
  savedDescriptions: { [key: string]: string };
  onChange: (value: string) => void;
  onSave: () => void;
  onLoad: (description: string) => void;
  onDelete: (timestamp: string) => void;
};

export function DescriptionEditor({
  value,
  savedDescriptions,
  onChange,
  onSave,
  onLoad,
  onDelete
}: DescriptionEditorProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">商品説明</h3>
        <RichTextEditor
          value={value}
          onChange={onChange}
          onSave={onSave}
        />
      </div>
      
      <SavedDescriptionsList
        descriptions={savedDescriptions}
        onLoad={onLoad}
        onDelete={onDelete}
      />
    </div>
  );
}