import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../models/product.model';

export interface ProductsState {
  list: Product[];
  meta: { count: number };
  loading: boolean;
  error: any | null;
  lastQuery: any;
}

export const initialState: ProductsState = {
  list: [],
  meta: { count: 0 },
  loading: false,
  error: null,
  lastQuery: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state, query) => ({ ...state, loading: true, lastQuery: query })),
  on(ProductsActions.loadProductsSuccess, (state, { data }) => ({
    ...state,
    list: data.results,
    meta: { count: data.count },
    loading: false,
    error: null
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
