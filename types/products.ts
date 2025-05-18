export interface ProductCategory {
  id: string;
  name: string;
  imageUrl: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  oldPrice: number;
  stores: string[];
  benefits: string[];
}