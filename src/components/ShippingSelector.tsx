import React from 'react';

type ShippingSelectorProps = {
  shippingMethod: string;
  shippingPayer: string;
  onMethodChange: (value: string) => void;
  onPayerChange: (value: string) => void;
};

export function ShippingSelector({ 
  shippingPayer, 
  onPayerChange 
}: ShippingSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          発送方法
        </label>
        <input
          type="text"
          value="ゆうパケット"
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          送料負担 *
        </label>
        <select
          value={shippingPayer}
          onChange={(e) => onPayerChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="落札者">落札者</option>
          <option value="出品者">出品者</option>
        </select>
      </div>
    </div>
  );
}