import { TestBed } from '@angular/core/testing';

import { MachineService } from './machine.service';

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
    expect(service.balance).toBe(2);
  });

  it('should buy product', () => {
    expect(service.products[0].stock).toBe(3);
    service.addCoin(1.6);

    service.selectProduct(service.products[0]);
    expect(service.productsUser[0].name).toBe('Coca-cola');
    expect(service.products[0].stock).toBe(2);
    expect(service.balance).toBe(0.8);

    service.selectProduct(service.products[1]);
    expect(service.productsUser.length).toBe(2);
  });

  it('should give me the change', () => {
    service.addCoin(2);
    service.selectProduct(service.products[2]);
    service.returnChange();
    expect(service.balance).toBe(0);
    expect(service.change).toBe(1);
  });
});
