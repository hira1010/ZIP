```typescript
import { useState, useCallback } from 'react';
import { ImageRenamer } from '../utils/characterDetection/renamer';
import type { RenameResult } from '../utils/characterDetection/types';

export function useImageRenaming() {
  const [renamer] = useState(() => new ImageRenamer());
  const [pendingRename, setPendingRename] = useState<{
    file: File;
    result: RenameResult;
  } | null>(null);

  const processImage = useCallback((file: File) => {
    const result = renamer.processFileName(file.name);
    
    if (result.character) {
      setPendingRename({ file, result });
      return null;
    }
    
    return file;
  }, [renamer]);

  const confirmRename = useCallback(() => {
    if (!pendingRename) return null;

    const renamedFile = new File(
      [pendingRename.file],
      pendingRename.result.newName,
      { type: pendingRename.file.type }
    );

    setPendingRename(null);
    return renamedFile;
  }, [pendingRename]);

  const cancelRename = useCallback(() => {
    if (!pendingRename) return null;
    
    const originalFile = pendingRename.file;
    setPendingRename(null);
    return originalFile;
  }, [pendingRename]);

  return {
    processImage,
    pendingRename,
    confirmRename,
    cancelRename
  };
}
```