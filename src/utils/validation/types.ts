export type ValidationRule = {
  validate: (value: any) => string | null;
};

export type ValidationErrors = {
  [key: string]: string | null;
};