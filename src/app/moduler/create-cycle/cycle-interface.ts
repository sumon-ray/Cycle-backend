// ts type for cycle models
export type CreateCycle = {
  name: string;
  brand: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  inStock: boolean;
  image: string;
  queantity: number;
};
