import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShopApiService } from '../../services/shop-api';
import * as ProductsActions from './products.actions';
import { mergeMap, map, catchError, of } from 'rxjs';

export const loadProductsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ShopApiService);

    return actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(({ page, pageSize, minRating, ordering }) =>
        api.getProducts({ page, pageSize, minRating, ordering }).pipe(
          map((data) => ProductsActions.loadProductsSuccess({ data })),
          catchError((error) => of(ProductsActions.loadProductsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
