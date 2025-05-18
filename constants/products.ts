import { ProductCategory, Product } from '@/types/products';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    imageUrl: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg',
    itemCount: 142
  },
  {
    id: 'clothing',
    name: 'Clothing',
    imageUrl: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    itemCount: 251
  },
  {
    id: 'books',
    name: 'Books',
    imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    itemCount: 89
  },
  {
    id: 'home',
    name: 'Home & Garden',
    imageUrl: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg',
    itemCount: 174
  }
];

export const PRODUCTS = {
  macbook: {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3 (256 GB)',
    imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    price: 1299,
    oldPrice: 1449,
    stores: ['MediaMarkt', 'Amazon', 'Apple'],
    benefits: [
      'Gutscheincode verfügbar',
      'Cashback möglich (2% Vivid, 1% Trade Republic)',
      'Kombinierbar mit: Lidl Plus / Payback'
    ]
  }
} as const;