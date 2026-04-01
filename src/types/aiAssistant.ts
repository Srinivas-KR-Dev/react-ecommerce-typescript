import type { Product } from './product';

export type AiAssistantResponse = {
  reply: string;
  products: Product[];
};
