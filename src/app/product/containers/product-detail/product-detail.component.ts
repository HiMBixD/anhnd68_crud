import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {createProduct, loadProduct, ProductState, selectProduct, updateProduct} from '../../store';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'fis-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  title: string;
  private unsubcribe$ = new Subject<void>();
  checkExist: boolean;

  product$: Observable<Product>;

  productFrom = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * (100 - 1 + 1)) + 100),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.maxLength(5)
    ]),
    quantity: new FormControl('', [
      Validators.required
    ]),
  });
  get name(){return this.productFrom.get('name'); }
  get price(){return this.productFrom.get('price'); }
  get quantity(){return this.productFrom.get('quantity'); }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productStore: Store<ProductState>
    ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('productId');
    if (id) {
      this.checkExist = true;
      // @ts-ignore
      this.productStore.dispatch(loadProduct({id}));
      this.product$ = this.productStore.pipe(select(selectProduct));
      this.title = 'Chi tiết sản phẩm';
      this.product$.pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
        if (res) {
          this.productFrom.patchValue(res);
        }
      });
    } else {
      this.checkExist = false;
      this.title = 'Thêm sản phẩm';
    }
  }

  onCreate(form: FormGroup){
    const { value } = form;
    this.productStore.dispatch(createProduct({product: value}));


    // let result = this.productService.addNewProduct(value);
    // if(result) {
    //   console.log('them moi thanh cong');
    //   this.router.navigateByUrl('/products');
    // } else {
    //   console.log('That bai');
    // }
  }

  onUpdate(form: FormGroup) {
    const { value } = form;
    this.productStore.dispatch(updateProduct({product: value}));
    // const { value } = form;
    // const result = this.productService.updateProduct(value);
    // if (result) {
    //   console.log('update thanh cong');
    //   this.router.navigateByUrl('/products');
    // } else {
    //   console.log('That bai');
  }

  onSave(form: FormGroup) {
    if (this.checkExist) {
      this.onUpdate(form);
    } else {
      this.onCreate(form);

    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

}
