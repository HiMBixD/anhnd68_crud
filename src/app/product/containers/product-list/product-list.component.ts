import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import {loadProductsList, ProductState, selectProductsList, selectProductsListErrors} from '../../store';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'fis-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  title = 'Danh sách sản phẩm';
  productsList$: Observable<Product[]>;
  errorsList$: Observable<any>;
  constructor(
    private productStore: Store<ProductState>
  ) { }

  ngOnInit(): void {
    this.onGetProductsList();

    // Get product from store
    this.productsList$ = this.productStore.pipe(select(selectProductsList));
    this.errorsList$ = this.productStore.pipe(select(selectProductsListErrors));

  }

  onGetProductsList(){
    this.productStore.dispatch(loadProductsList());
    // this.productsList$ = this.productserivce.getProductsList();
  }

  onSearch(keyword: any){
    // if (keyword.length > 0){
    //   this.productsList$ = this.productserivce.searchProduct(keyword);
    // } else {
    //   this.onGetProductsList();
    // }

  }
}
