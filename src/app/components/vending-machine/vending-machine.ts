import { Component, inject, Injectable, Input, OnInit, signal } from '@angular/core';
import { VendingMachineService } from '../../services/vending-machine.services';
import { CollectedProducts, Product } from '../../model/product.data';
import { Button, ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-vending-machine',
  standalone: true,
  imports: [CommonModule, Button, TableModule, ButtonModule, CardModule],
  templateUrl: './vending-machine.html',
})
@Injectable({
  providedIn: 'root',
})
export class VendingMachine implements OnInit {
  protected readonly machineService = inject(VendingMachineService);

  @Input() id!: number;
  @Input() listProducts!: any[];
  @Input() title!: string;

  coins = signal<number[]>([]);
  productsUsers = signal<CollectedProducts[]>([]);

  ngOnInit(): void {
    this.loadCoins();
  }

  loadCoins() {
    this.machineService.getCoins().subscribe((c) => {
      this.coins.set(c);
    });
  }

  loadCollectProducts(id: number) {
    this.machineService.getProductsUser(id).subscribe((product) => {
      this.productsUsers.set(product);
    });
  }

  addCoin(idMachine: number, coin: number) {
    this.machineService.addCoin(idMachine, coin);
  }

  selectProduct(idMachine: number, product: Product) {
    this.machineService.selectProduct(idMachine, product);
    this.loadCollectProducts(this.id);
  }

  returnChange(idMachine: number) {
    this.machineService.returnChange(idMachine);
  }

  collectProduct(idMachine: number) {
    this.machineService.collectProducts(idMachine);
    this.loadCollectProducts(this.id);
  }
}
