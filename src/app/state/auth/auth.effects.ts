import { inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../services/shop-api';
import { mergeMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRefreshToken } from './auth.selectors';

export const loginEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ShopApiService);

    return actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        api.login(username, password).pipe(
          map(res => AuthActions.loginSuccess({ access: res.access, refresh: res.refresh })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const refreshEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(ShopApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(store.select(selectRefreshToken)),
      mergeMap(([_, refresh]) =>
        api.refreshToken(refresh!).pipe(
          map(res => AuthActions.refreshSuccess({ access: res.access })),
          catchError(() => of(AuthActions.loginFailure({ error: 'Refresh failed' })))
        )
      )
    );
  },
  { functional: true }
);
