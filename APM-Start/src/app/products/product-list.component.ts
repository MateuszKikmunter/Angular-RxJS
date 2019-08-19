import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  public pageTitle: string = 'Product List';
  public errorMessage: string = '';
  public categories;

  public products$: Observable<Product[]>

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts().pipe(
      catchError(error => {
        this.errorMessage = error;
        return of([]);
      }));
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
