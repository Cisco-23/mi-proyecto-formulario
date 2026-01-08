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
  private readonly machineService = inject(MachineService);

  products = signal<Product[]>([]);
  balance = signal<number>(0);
  change = signal<number>(0);
  productsUsuari = signal<CollectedProducts[]>([]);
  coins = signal<number[]>([]);

  private loadData() {
    this.machineService.getCoins().subscribe((c) => {
      this.coins.set(c);
    });

    this.machineService.getProducts().subscribe((product) => {
      this.products.set(product);
    });

    this.machineService.getProductsUser().subscribe((product) => {
      this.productsUsuari.set(product);
    });

    this.balance.set(this.machineService.balance);

    this.change.set(this.machineService.change);
  }

  ngOnInit() {
    this.loadData();
  }

  addCoin(value: number) {
    this.machineService.addCoin(value);
    this.loadData();
  }

  returnMoney() {
    this.machineService.returnChange();
    this.loadData();
  }

  selectProduct(product: Product) {
    this.machineService.selectProduct(product);
    this.loadData();
  }

  collectProduct() {
    this.machineService.collectProductes();
    this.loadData();
  }
}
