import { ProductCategoryService } from './../product-categories/product-category.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, combineLatest } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product';
import { SupplierService } from '../suppliers/supplier.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  public products$: Observable<Product[]> = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(data => console.log('Products: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  public productWithCategory$ = combineLatest([
    this.products$,
    this.productCategoryService.productCategories$
  ]).pipe(
    map(([products, categories]) =>
      products.map(product => ({
        ...product,
        price: product.price * 1.5,
        category: categories.find(category => product.categoryId === category.id).name,
        searchKey: [product.productName]
      }) as Product))
  );

  constructor(private http: HttpClient,
    private productCategoryService: ProductCategoryService,
    private supplierService: SupplierService) { }

  private fakeProduct() {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      category: 'Toolbox',
      quantityInStock: 30
    };
  }

  private handleError(err: any) {
    const errorMessage: string = err.error instanceof ErrorEvent
      ? `An error occurred: ${err.error.message}`
      : `Backend returned code ${err.status}: ${err.body.error}`;

    console.error(err);
    return throwError(errorMessage);
  }

}
