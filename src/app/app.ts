import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachine } from './components/vending-machine/vending-machine';
import { VendingMachineService } from './services/vending-machine.services';
import { Product } from './model/product.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VendingMachine],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private machineService = inject(VendingMachineService);

  productsDrinks = signal<Product[]>([]);
  productsSnacks = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProductsDrink();
    this.loadProductsSnacks();
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
}
