export type ProductTypes = {
  id: string;
  name: string;
  category?: { id: string; name: string; products: string; quantity: string };
  salePrice: number | string;
  quantity: number | string;
  createdAt: string;
};
