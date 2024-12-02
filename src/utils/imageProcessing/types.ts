export interface ProcessedImage {
  url: string;
  name: string;
}

export interface RenameRequest {
  file: File;
  originalName: string;
  newName: string;
}

export interface ImageProcessingOptions {
  maxWidth?: number;
  quality?: number;
  outputFormat?: string;
}