import { AuctionItem } from '../../types';
import { ValidationErrors } from './types';
import { timeValidation } from './timeValidation';
import { relistValidation } from './relistValidation';
import { featuredValidation } from './featuredValidation';

export const validateItem = (item: AuctionItem): ValidationErrors => {
  const errors: ValidationErrors = {};

  const timeError = timeValidation.validate(item.endTime);
  if (timeError) errors.endTime = timeError;

  const relistError = relistValidation.validate(item.autoRelist);
  if (relistError) errors.autoRelist = relistError;

  if (item.featured) {
    const featuredError = featuredValidation.validate(item.featuredCategory);
    if (featuredError) errors.featuredCategory = featuredError;
  }

  return errors;
};

export type { ValidationErrors } from './types';