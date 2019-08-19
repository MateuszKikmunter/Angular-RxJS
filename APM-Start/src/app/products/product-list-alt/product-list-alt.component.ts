import { Component } from '@angular/core';

import { of } from 'rxjs';

import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent {
  public pageTitle: string = 'Products';
  public errorMessage: string = '';
  public selectedProductId: number;

  public products$ = this.productService.products$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return of([]);
    }));

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
