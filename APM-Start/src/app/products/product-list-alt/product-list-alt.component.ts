import { Component, ChangeDetectionStrategy } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  public pageTitle: string = 'Products';
  public errorMessage: string = '';

  public products$ = this.productService.productWithCategory$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return of([]);
    }));

  public selectedProduct$: Observable<Product> = this.productService.selectedProduct$;

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
