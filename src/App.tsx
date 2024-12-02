import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { AuctionItem, defaultItem } from './types';
import { AuctionItemForm } from './components/AuctionItemForm';
import { downloadZip } from './utils/csvExport';
import { validateItem, ValidationErrors } from './utils/validation';
import { SaveLoadButtons } from './components/SaveLoadButtons';
import { saveItems, loadItems, clearItems } from './utils/storage';
import { Header } from './components/Header';

function App() {
  const [items, setItems] = useState<AuctionItem[]>([defaultItem]);
  const [errors, setErrors] = useState<{ [key: string]: ValidationErrors }>({});

  const updateItem = (id: string, field: keyof AuctionItem, value: any) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    
    const updatedItem = updatedItems.find(item => item.id === id);
    if (updatedItem) {
      const itemErrors = validateItem(updatedItem);
      setErrors(prev => ({
        ...prev,
        [id]: itemErrors
      }));
    }
  };

  const handleExport = async () => {
    const allErrors = items.reduce((acc, item) => {
      const itemErrors = validateItem(item);
      if (Object.keys(itemErrors).length > 0) {
        acc[item.id] = itemErrors;
      }
      return acc;
    }, {} as { [key: string]: ValidationErrors });

    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      alert('入力内容に誤りがあります。確認してください。');
      return;
    }

    try {
      await downloadZip(items);
    } catch (error) {
      console.error('Export failed:', error);
      alert('エクスポート中にエラーが発生しました。');
    }
  };

  const handleSave = () => {
    saveItems(items);
    alert('保存しました');
  };

  const handleLoad = () => {
    const savedItems = loadItems();
    if (savedItems.length > 0) {
      setItems(savedItems);
      alert('読み込みました');
    } else {
      alert('保存されているデータがありません');
    }
  };

  const handleClear = () => {
    clearItems();
    setItems([{ ...defaultItem, id: crypto.randomUUID() }]);
    alert('保存したデータを削除しました');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <Header
            onExport={handleExport}
            onSave={handleSave}
            onLoad={handleLoad}
            onClear={handleClear}
          />

          <div className="space-y-6">
            {items.map((item) => (
              <AuctionItemForm
                key={item.id}
                item={item}
                errors={errors[item.id] || {}}
                onUpdate={updateItem}
                canRemove={items.length > 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;