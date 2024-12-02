export const IMAGE_DEFAULTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  VALID_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
  COMPRESSION: {
    MAX_WIDTH: 1500,
    QUALITY: 0.8,
    OUTPUT_FORMAT: 'image/jpeg'
  }
} as const;