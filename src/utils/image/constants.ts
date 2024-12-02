export const IMAGE_CONSTANTS = {
  OPTIMAL_FILE_SIZE: 0.28, // MB
  MAX_WIDTH: 1500,
  QUALITY_STEPS: [0.8, 0.6, 0.4, 0.2],
  MAX_IMAGES: 100,
  MAX_TOTAL_SIZE: 28 * 1024 * 1024, // 28MB
  MAX_INPUT_SIZE: 50 * 1024 * 1024, // 50MB
  VALID_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
} as const;