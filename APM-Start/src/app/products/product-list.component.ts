import { Component, ChangeDetectionStrategy } from '@angular/core';

import { of } from 'rxjs';

import { ProductService } from './product.service';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  
  public pageTitle: string = 'Product List';
  public errorMessage: string = '';
  public categories;

  public products$ = this.productService.products$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return of([]);
    }));

  constructor(private productService: ProductService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
