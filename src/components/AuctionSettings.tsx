import React from 'react';
import { AuctionItem } from '../types';
import { FormField } from './FormField';
import { ValidationErrors } from '../utils/validation';
import { NumericInput } from './NumericInput';

type AuctionSettingsProps = {
  item: AuctionItem;
  errors: ValidationErrors;
  onUpdate: (field: keyof AuctionItem, value: any) => void;
};

export function AuctionSettings({ item, errors, onUpdate }: AuctionSettingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField 
        label="終了時間" 
        required 
        error={errors.endTime}
      >
        <NumericInput
          value={item.endTime}
          onChange={(value) => onUpdate('endTime', parseInt(value || '0', 10))}
          min={0}
          max={23}
          placeholder="0-23の数字を入力"
        />
      </FormField>

      <FormField label="個数">
        <select
          value={item.quantity}
          onChange={(e) => onUpdate('quantity', parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </FormField>

      <FormField label="開催期間">
        <select
          value={item.auctionDuration}
          onChange={(e) => onUpdate('auctionDuration', parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {[...Array(7)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}日</option>
          ))}
        </select>
      </FormField>

      <FormField label="発送までの日数">
        <select
          value={item.shippingDuration}
          onChange={(e) => onUpdate('shippingDuration', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="1日〜2日">1日〜2日</option>
          <option value="2日〜3日">2日〜3日</option>
          <option value="3日〜7日">3日〜7日</option>
        </select>
      </FormField>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.autoExtend}
            onChange={(e) => onUpdate('autoExtend', e.target.checked)}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">自動延長</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.earlyTermination}
            onChange={(e) => onUpdate('earlyTermination', e.target.checked)}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">早期終了</span>
        </label>
      </div>

      <FormField 
        label="自動再出品"
        error={errors.autoRelist}
      >
        <select
          value={item.autoRelist}
          onChange={(e) => onUpdate('autoRelist', parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value={0}>なし</option>
          {[...Array(3)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}回</option>
          ))}
        </select>
      </FormField>

      <FormField 
        label="注目のオークション"
        error={errors.featuredCategory}
      >
        <NumericInput
          value={item.featuredCategory}
          onChange={(value) => {
            onUpdate('featuredCategory', value);
            onUpdate('featured', value !== '');
          }}
          placeholder="注目のオークションカテゴリを入力"
        />
      </FormField>
    </div>
  );
}