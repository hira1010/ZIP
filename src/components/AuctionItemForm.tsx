import React from 'react';
import { ImageUploader } from './ImageUploader';
import { AuctionItem } from '../types';
import { CategorySelector } from './CategorySelector';
import { ShippingSelector } from './ShippingSelector';
import { AuctionSettings } from './AuctionSettings';
import { FormField } from './FormField';
import { ValidationErrors } from '../utils/validation';
import { DescriptionEditor } from './DescriptionEditor';

type AuctionItemFormProps = {
  item: AuctionItem;
  errors: ValidationErrors;
  onUpdate: (id: string, field: keyof AuctionItem, value: any) => void;
  canRemove: boolean;
};

export function AuctionItemForm({ item, errors, onUpdate }: AuctionItemFormProps) {
  const handleSaveDescription = () => {
    const timestamp = new Date().toISOString();
    const savedDescriptions = {
      ...(item.savedDescriptions || {}),
      [timestamp]: item.description
    };
    onUpdate(item.id, 'savedDescriptions', savedDescriptions);
    alert('商品説明を保存しました');
  };

  const handleLoadDescription = (description: string) => {
    onUpdate(item.id, 'description', description);
  };

  const handleDeleteDescription = (timestamp: string) => {
    if (!confirm('保存した商品説明を削除してもよろしいですか？')) return;
    
    const savedDescriptions = { ...(item.savedDescriptions || {}) };
    delete savedDescriptions[timestamp];
    onUpdate(item.id, 'savedDescriptions', savedDescriptions);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategorySelector
          category={item.category}
          subCategory={item.subCategory}
          onCategoryChange={(value) => onUpdate(item.id, 'category', value)}
          onSubCategoryChange={(value) => onUpdate(item.id, 'subCategory', value)}
        />

        <FormField label="開始価格" required>
          <input
            type="text"
            value={item.startPrice}
            onChange={(e) => onUpdate(item.id, 'startPrice', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="開始価格を入力"
          />
        </FormField>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">商品画像</h3>
        <ImageUploader
          images={item.images}
          onChange={(images) => onUpdate(item.id, 'images', images)}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">配送設定</h3>
        <ShippingSelector
          shippingMethod={item.shippingMethod}
          shippingPayer={item.shippingPayer}
          onMethodChange={(value) => onUpdate(item.id, 'shippingMethod', value)}
          onPayerChange={(value) => onUpdate(item.id, 'shippingPayer', value)}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">オークション設定</h3>
        <AuctionSettings
          item={item}
          errors={errors}
          onUpdate={(field, value) => onUpdate(item.id, field, value)}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <DescriptionEditor
          value={item.description}
          savedDescriptions={item.savedDescriptions || {}}
          onChange={(value) => onUpdate(item.id, 'description', value)}
          onSave={handleSaveDescription}
          onLoad={handleLoadDescription}
          onDelete={handleDeleteDescription}
        />
      </div>
    </div>
  );
}