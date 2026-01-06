export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Coca-cola', price: 0.80, stock: 3 },
  { id: 2, name: 'Agua', price: 0.50, stock: 4 },
  { id: 3, name: 'Chocolatina', price: 1.00, stock: 5 },
];