import { AuctionItem } from '../types';

export const STORAGE_KEY = 'yahoo-auction-items';

export function saveItems(items: AuctionItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save items:', error);
  }
}

export function loadItems(): AuctionItem[] {
  try {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    if (savedItems) {
      return JSON.parse(savedItems);
    }
  } catch (error) {
    console.error('Failed to load items:', error);
  }
  return [];
}

export function clearItems(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear items:', error);
  }
}