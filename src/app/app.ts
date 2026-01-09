import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineService } from './services/machine.service';
import { CollectedProducts, Product } from './model/product.data';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Button, TableModule, ButtonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly machineService = inject(MachineService);

  productsDrinks = signal<Product[]>([]);
  productsSnacks = signal<Product[]>([]);
  productsUsuari = signal<CollectedProducts[]>([]);
  coins = signal<number[]>([]);

  ngOnInit() {
    this.loadCoins();
    this.loadProductsDrink();
    this.loadProductsSnacks();
    this.loadProductsUsers();
  }

  loadProductsUsers() {
    this.machineService.getProductsUser().subscribe((product) => {
      this.productsUsuari.set(product);
    });
  }

  loadCoins() {
    this.machineService.getCoins().subscribe((c) => {
      this.coins.set(c);
    });
  }

  loadProductsDrink() {
    this.machineService.getProductsDrink().subscribe((product) => {
      this.productsDrinks.set(product);
    });
  }

  loadProductsSnacks() {
    this.machineService.getProductSnacks().subscribe((product) => {
      this.productsSnacks.set(product);
    });
  }

  addCoin(value: number) {
    this.machineService.addCoin(value);
  }

  returnMoney() {
    this.machineService.returnChange();
  }

  selectProduct(product: Product) {
    this.machineService.selectProduct(product);
  }

  collectProduct() {
    this.machineService.collectProductes();
  }
}
