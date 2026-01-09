import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  COINS,
  CollectedProducts,
  Product,
  PRODUCTS_DRINKS,
  PRODUCTS_SNACKS,
} from '../model/product.data';
@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private balance = 0;
  private change = 0;
  private productsDrinks: Product[] = PRODUCTS_DRINKS;
  private productsSnacks: Product[] = PRODUCTS_SNACKS;
  private productsUser: CollectedProducts[] = [];
  private coins: number[] = COINS;

  addCoin(coin: number) {
    if (coin < 0) {
      throw new Error('El valor no puede ser negativo.');
    }
    this.balance += coin;
  }

  returnChange() {
    this.change = this.balance;
    this.balance = 0;
  }

  selectProduct(product: Product) {
    if (this.balance < product.price) {
      throw new Error('Saldo insuficiente.');
    }

    if (product.stock === 0) {
      throw new Error('Producto sin stock.');
    }

    product.stock--;
    this.balance -= product.price;
    const find = this.productsUser.find((p) => p.name === product.name);

    if (find) {
      find.amount++;
    } else {
      this.productsUser.push({ amount: 1, name: product.name });
    }
  }

  collectProductes() {
    this.productsUser.length = 0;
    this.change = this.balance;
    this.balance = 0;
  }

  getBalance() {
    return this.balance;
  }

  getChange() {
    return this.change;
  }

  getProductsDrink(): Observable<Product[]> {
    return of(this.productsDrinks);
  }

  getProductSnacks(): Observable<Product[]> {
    return of(this.productsSnacks);
  }

  getCoins(): Observable<number[]> {
    return of(this.coins);
  }

  getProductsUser(): Observable<CollectedProducts[]> {
    return of(this.productsUser);
  }
}
