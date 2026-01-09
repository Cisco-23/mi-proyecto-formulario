import { Observable, of, throwError } from 'rxjs';

export interface Product {
  name: string;
  price: number;
  stock: number;
}

export interface CollectedProducts {
  name: string;
  amount: number;
}

export const COINS: number[] = [2, 1, 0.5, 0.2, 0.05];

export const PRODUCTS_DRINKS: Product[] = [
  { name: 'Coca-cola', price: 0.8, stock: 3 },
  { name: 'Agua', price: 0.5, stock: 4 },
  { name: 'Fanta', price: 1.0, stock: 5 },
];

export const PRODUCTS_SNACKS: Product[] = [
  { name: 'Doritos', price: 1.5, stock: 6 },
  { name: 'Patatas', price: 1, stock: 2 },
  { name: 'Sandwich', price: 2, stock: 9 },
];
