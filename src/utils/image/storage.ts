export const saveOriginalImage = async (
  file: File,
  filename: string
): Promise<void> => {
  try {
    // IndexedDBを使用して画像を保存
    const request = indexedDB.open('ImageStorage', 1);

    request.onerror = () => {
      throw new Error('Failed to open database');
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('originals')) {
        db.createObjectStore('originals', { keyPath: 'filename' });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['originals'], 'readwrite');
      const store = transaction.objectStore('originals');

      const storeRequest = store.put({
        filename,
        data: file,
        timestamp: new Date().toISOString()
      });

      storeRequest.onerror = () => {
        throw new Error('Failed to store image');
      };
    };
  } catch (error) {
    console.error('Error saving original image:', error);
    throw error;
  }
};