import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { VendingMachineService } from './vending-machine.services';
import { CollectedProducts, Product } from '../model/product.data';

describe('MachineService', () => {
  let service: VendingMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendingMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add balance', () => {
    service.addCoin(1, 2);
    expect(service.getBalance(1)).toBe(2);
  });

  it('should buy product', fakeAsync(() => {
    let products!: Product[];
    let productsUser!: CollectedProducts[];

    service.getProductsDrink().subscribe((p) => {
      products = p;
    });
    tick();

    service.getProductsUser(1).subscribe((p) => {
      productsUser = p;
    });
    tick();

    expect(products[0].stock).toBe(3);
    service.addCoin(1, 1);

    service.selectProduct(1, products[0]);

    expect(productsUser[0].name).toBe('Coca-cola');
    expect(products[0].stock).toBe(2);
    expect(service.getBalance(1)).toBe(0.2);

    service.selectProduct(1, products[1]);
    expect(productsUser.length).toBe(2);
  }));

  it('should give me the change', fakeAsync(() => {
    let products!: Product[];

    service.getProductsDrink().subscribe((p) => {
      products = p;
    });
    tick();

    service.addCoin(1, 2);
    service.selectProduct(1, products[2]);
    service.returnChange(1);
    expect(service.getBalance(1)).toBe(0);
    expect(service.getChange(1)).toBe(1);
  }));
});
