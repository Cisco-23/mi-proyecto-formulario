import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MOCK_PRODUCTS } from '../model/product.data';

@Injectable({
  providedIn: 'root'
})
export class VendingService {

  getProducts() {
    return of(MOCK_PRODUCTS); 
  }
}