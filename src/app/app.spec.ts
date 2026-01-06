import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { VendingService } from './services/vending.service';
import { of } from 'rxjs';


import { MOCK_PRODUCTS, Product } from './model/product.data';

class MockVendingService {
  getProducts() {
    const copiaSegura = MOCK_PRODUCTS.map(p => ({ ...p }));
    return of(copiaSegura);
  }
}

describe('AppComponent', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], 
      providers: [
        { provide: VendingService, useClass: MockVendingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should load real products on init', () => {
    expect(component.products().length).toBe(3);
    expect(component.products()[0].name).toBe('Coca-cola'); 
  });

  it('should buy a product correctly (Coca-cola)', () => {
    const product = component.products()[0]; 
    
    component.addCoin(2); 

    component.selectProduct(product);

    expect(component.balance()).toBe(1.20);
    expect(component.dispensedProduct()).toBe(product.name);
  });

  it('should not buy if out of stock', () => {
  
    const products = component.products();
    products[0].stock = 0;
    component.products.set(products);

    component.addCoin(5); 
    component.selectProduct(products[0]);

    expect(component.dispensedProduct()).toBe('');
    expect(component.balance()).toBe(5); 
});
});