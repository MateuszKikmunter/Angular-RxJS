import { Component, ChangeDetectionStrategy } from '@angular/core';

import { of, Observable, Subject, EMPTY } from 'rxjs';
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
  
  private errorMessageSubject: Subject<string> = new Subject<string>();
  public errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  public products$ = this.productService.productWithCategory$.pipe(
    catchError(error => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    }));

  public selectedProduct$: Observable<Product> = this.productService.selectedProduct$;

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
