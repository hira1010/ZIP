export interface ImageUploaderProps {
  images: { url: string; name: string }[];
  onChange: (images: { url: string; name: string }[]) => void;
}

export interface ImagePreviewProps {
  image: string;
  name: string;
  index: number;
  onRemove: () => void;
}

export interface ImageRenameDialogProps {
  originalName: string;
  newName: string;
  onConfirm: () => void;
  onCancel: () => void;
}