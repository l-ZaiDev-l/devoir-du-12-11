import { inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../services/shop-api';
import { mergeMap, map, catchError, of, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRefreshToken } from './auth.selectors';
import { Router } from '@angular/router';

// -------------------------
// Login Effect
// -------------------------
export const loginEffect = createEffect(
  function login() {
    const actions$ = inject(Actions);
    const api = inject(ShopApiService);

    return actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        api.login(username, password).pipe(
          map(res =>
            AuthActions.loginSuccess({ access: res.access, refresh: res.refresh })
          ),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  },
  { functional: true } // ✅ important
);

// -------------------------
// Login Redirect Effect
// -------------------------
export const loginRedirectEffect = createEffect(
  function redirect() {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        router.navigate(['/app/home']);
      })
    );
  },
  { functional: true, dispatch: false } // ✅ pas d'action dispatchée
);

// -------------------------
// Refresh Token Effect
// -------------------------
export const refreshEffect = createEffect(
  function refresh() {
    const actions$ = inject(Actions);
    const api = inject(ShopApiService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(store.select(selectRefreshToken)),
      mergeMap(([_, refresh]) =>
        api.refreshToken(refresh!).pipe(
          map(res => AuthActions.refreshSuccess({ access: res.access })),
          catchError(() => of(AuthActions.logout()))
        )
      )
    );
  },
  { functional: true } // ✅
);
