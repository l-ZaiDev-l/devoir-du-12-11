import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../../state/products/products.actions';
import {
  selectProductsList,
  selectProductsLoading,
  selectProductsError,
} from '../../state/products/products.selectors';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductListComponent } from '../components/products-list/products-list';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ProductListComponent, MatCardModule, MatProgressBarModule],
  templateUrl: './products-page.html',
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectProductsList);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
  }

  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts({ page: 1, pageSize: 10 }));
  }
}
