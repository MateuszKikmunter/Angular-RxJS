import { ProductCategoryService } from './../product-categories/product-category.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Subject, Observable, combineLatest, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  
  public pageTitle: string = 'Product List';
  
  private errorMessageSubject: Subject<string> = new Subject<string>();
  public errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

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
      this.errorMessageSubject.next(err);
      return EMPTY;
    }));

  public categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
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
