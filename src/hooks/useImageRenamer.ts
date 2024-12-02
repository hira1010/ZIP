import { useState, useCallback } from 'react';
import { ImageRenamer } from '../utils/characterData/imageRenamer';

export function useImageRenamer() {
  const [renamer] = useState(() => new ImageRenamer());
  const [pendingRename, setPendingRename] = useState<{
    file: File;
    parsed: ReturnType<ImageRenamer['parseImageName']>;
    newName: string;
  } | null>(null);

  const processFileName = useCallback((file: File) => {
    const parsed = renamer.parseImageName(file.name);
    if (!parsed.character) return file;

    const newName = renamer.generateNewName(parsed);
    if (newName === file.name) return file;

    setPendingRename({ file, parsed, newName });
    return null;
  }, [renamer]);

  const confirmRename = useCallback(() => {
    if (!pendingRename) return null;
    
    const renamedFile = new File(
      [pendingRename.file], 
      pendingRename.newName, 
      { type: pendingRename.file.type }
    );
    
    setPendingRename(null);
    return renamedFile;
  }, [pendingRename]);

  const cancelRename = useCallback(() => {
    setPendingRename(null);
  }, []);

  return {
    processFileName,
    pendingRename,
    confirmRename,
    cancelRename
  };
}