import { FIXED_DESCRIPTION } from '../utils/constants';
import { DEFAULT_AUCTION_SETTINGS } from '../utils/config/auctionDefaults';

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  startPrice: string;
  buyNowPrice: string;
  category: string;
  subCategory: string;
  condition: string;
  shippingFrom: string;
  shippingMethod: string;
  shippingPayer: string;
  images: { url: string; name: string }[];
  quantity: number;
  auctionDuration: number;
  endTime: number;
  autoExtend: boolean;
  earlyTermination: boolean;
  autoRelist: number;
  shippingDuration: string;
  featured: boolean;
  featuredCategory: string;
  savedDescriptions?: { [key: string]: string };
}

export const defaultItem: AuctionItem = {
  id: crypto.randomUUID(),
  title: '',
  description: FIXED_DESCRIPTION,
  ...DEFAULT_AUCTION_SETTINGS,
  subCategory: '',
  images: [],
  savedDescriptions: {}
};