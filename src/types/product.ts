export type Product = {
  id: string;
  image: string;
  name: string;
  rating: {
    count: number;
    stars: number;
  };
  priceCents: number;
  keywords: string[];
};
