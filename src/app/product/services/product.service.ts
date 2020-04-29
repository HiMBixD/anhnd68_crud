import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {of, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'iphone5',
  //     price: 300,
  //     quantity: 10
  //   },
  //   {
  //     id: 2,
  //     name: 'iphoneX',
  //     price: 2000,
  //     quantity: 5
  //   }
  // ];
  //
  constructor(private http: HttpClient) { }

  getProductsList(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`/api/products`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getProductById(id: number): Observable<Product>{
    return this.http
      .get<Product>(`/api/products/${id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addNewProduct(productData: Product): Observable<Product>{
    return this.http
      .post<Product>(`/api/products`, productData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateProduct(productData: Product): Observable<Product> {
    return this.http
      .put<Product>(`/api/products/${productData.id}`, productData)
      .pipe(catchError((error: any) => throwError(error.json())));
    }



  searchProduct(keyword: any): Observable<Product[]>{
    // tslint:disable-next-line:triple-equals
    return of(null);
  }

}
