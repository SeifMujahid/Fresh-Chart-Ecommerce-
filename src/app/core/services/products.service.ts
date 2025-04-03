import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}

  getProducts(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}&limit=24`
    );
  }

  getCaegories(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }

  getSpacificCategory(categoryID: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryID}`
    );
  }

  getSpecificProduct(productID: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productID}`
    );
  }
}
