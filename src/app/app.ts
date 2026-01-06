
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingService } from './services/vending.service';
import { Product } from './model/product.data';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Button, TableModule, ButtonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {

  private vendingService = inject(VendingService);

  products = signal<Product[]>([]);
  balance = signal<number>(0);
  change = signal<number>(0);
  dispensedProduct = signal<string>('');


  coins = [2, 1, 0.50, 0.20, 0.05];

  ngOnInit() {
    this.vendingService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }

  addCoin(value: number) {
    this.balance.update(current => current + value);
  }

  returnMoney() {
    let currentMoney = this.balance();
    if (currentMoney > 0) {
      this.change.set(currentMoney);
      this.balance.set(0);
    }
  }

  selectProduct(product: Product) {
    let currentBalance = this.balance();

    if (product.stock <= 0) {
      alert('no queda stock');
      return;
    }
    if (currentBalance < product.price) {
      alert('saldo insuficiente');
      return;
    }

    let lista = [...this.products()];

    for (let item of lista) {
      if (item.id === product.id) {
        item.stock = item.stock - 1;
        break;
      }

    }

    this.products.set(lista);

    let newBalance = currentBalance - product.price;
    this.balance.set(newBalance);

    this.dispensedProduct.set(product.name);
  }

  collectChange() {
    this.change.set(0);
    this.balance.set(0);
    alert('has recogido tu cambio');
  }

  collectProduct() {
    this.dispensedProduct.set('');
    alert('producto recogido');
  }
}