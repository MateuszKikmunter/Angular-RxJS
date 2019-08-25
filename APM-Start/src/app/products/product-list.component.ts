import { ProductCategoryService } from './../product-categories/product-category.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { of, Subject, Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  
  public pageTitle: string = 'Product List';
  public errorMessage: string = '';

  private categorySelectedSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public categorySelectedAction$: Observable<number> = this.categorySelectedSubject.asObservable();

  public products$ = combineLatest([ 
    this.productService.productWithCategory$,
    this.categorySelectedAction$
   ])
   .pipe(
     map(([ products, selectedCategoryId ]) =>
      products.filter(product => 
      selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )),
    catchError(err => {
      this.errorMessage = err;
      return of([]);
    }));

  public categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return of([]);
    }));

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
    ) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
