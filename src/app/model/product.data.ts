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

export const COINS: number[] = [2, 1, 0.5, 0.2, 0.5];

export const PRODUCTS_MOCK: Product[] = [
  { name: 'Coca-cola', price: 0.8, stock: 3 },
  { name: 'Agua', price: 0.5, stock: 4 },
  { name: 'Chocolatina', price: 1.0, stock: 5 },
];
