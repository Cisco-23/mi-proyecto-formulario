import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MachineService } from './machine.service';
import { CollectedProducts, Product } from '../model/product.data';

describe('MachineService', () => {
  let service: MachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add balance', () => {
    service.addCoin(2);
    expect(service.getBalance()).toBe(2);
  });

  it('should buy product', fakeAsync(() => {
    let products!: Product[];
    let productsUser!: CollectedProducts[];

    service.getProducts().subscribe((p) => {
      products = p;
    });
    tick();

    service.getProductsUser().subscribe((p) => {
      productsUser = p;
    });
    tick();

    expect(products[0].stock).toBe(3);
    service.addCoin(1.6);

    service.selectProduct(products[0]);

    expect(productsUser[0].name).toBe('Coca-cola');
    expect(products[0].stock).toBe(2);
    expect(service.getBalance()).toBe(0.8);

    service.selectProduct(products[1]);
    expect(productsUser.length).toBe(2);
  }));

  it('should give me the change', fakeAsync(() => {
    let products!: Product[];

    service.getProducts().subscribe((p) => {
      products = p;
    });
    tick();

    service.addCoin(2);
    service.selectProduct(products[2]);
    service.returnChange();
    expect(service.getBalance()).toBe(0);
    expect(service.getChange()).toBe(1);
  }));
});
