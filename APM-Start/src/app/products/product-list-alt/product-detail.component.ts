import { Component, ChangeDetectionStrategy } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { Observable, Subject, EMPTY } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  public pageTitle: string = 'Product Detail';

  public product$: Observable<Product> = this.productService.selectedProduct$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  private errorMessageSubject: Subject<string> = new Subject<string>();
  public errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService) { }

}