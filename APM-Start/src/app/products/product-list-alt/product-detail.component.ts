import { Component, ChangeDetectionStrategy } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  public pageTitle: string = 'Product Detail';
  public errorMessage: string = '';
  public product$: Observable<Product> = this.productService.selectedProduct$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return of(null);
    })
  );

  constructor(private productService: ProductService) { }

}