import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  COINS,
  CollectedProducts,
  Machine,
  MACHINES,
  Product,
  PRODUCTS_DRINKS,
  PRODUCTS_SNACKS,
} from '../model/product.data';

export abstract class AbstractMachine {
  abstract getById(id: number): Machine;

  abstract addCoin(id: number, coin: number): void;

  abstract returnChange(id: number): void;

  abstract selectProduct(id: number, product: Product): void;

  abstract collectProducts(id: number): void;
}

@Injectable({
  providedIn: 'root',
})
export class VendingMachineService implements AbstractMachine {
  private machines: Machine[] = MACHINES;
  private productsDrinks: Product[] = PRODUCTS_DRINKS;
  private productsSnacks: Product[] = PRODUCTS_SNACKS;
  private productsUser: CollectedProducts[] = [];
  private coins: number[] = COINS;

  getById(id: number): Machine {
    const machine = this.machines.find((m) => m.id === id);
    if (!machine) {
      throw new Error('La máquina con ID ' + id + ' no existe.');
    }
    return machine;
  }

  addCoin(id: number, coin: number) {
    const machine = this.getById(id);
    machine.balance += coin;
  }

  returnChange(id: number) {
    const machine = this.getById(id);
    machine.change = machine.balance;
    machine.balance = 0;
  }

  selectProduct(idMach: number, product: Product) {
    const machine = this.getById(idMach);

    if (!machine) {
      throw new Error('No existe esta maquina.');
    }

    if (machine.balance < product.price) {
      throw new Error('Saldo insuficiente.');
    }

    if (product.stock === 0) {
      throw new Error('Producto sin stock.');
    }

    product.stock--;
    machine.balance -= product.price;

    const findProduct = this.productsUser.find(
      (p) => p.name === product.name && p.idMachine === machine.id,
    );

    if (findProduct) {
      findProduct.amount++;
    } else {
      this.productsUser.push({ idMachine: machine.id, amount: 1, name: product.name });
    }
  }

  collectProducts(id: number) {
    const products = this.productsUser.filter((p) => p.idMachine !== id);
    this.productsUser = products;
    this.returnChange(id);
  }

  getBalance(id: number) {
    const machine = this.getById(id);
    return machine.balance;
  }

  getChange(id: number) {
    const machine = this.getById(id);
    return machine.change;
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

  getProductsUser(id: number): Observable<CollectedProducts[]> {
    const products = this.productsUser.filter((p) => p.idMachine === id);
    return of(products);
  }
}
