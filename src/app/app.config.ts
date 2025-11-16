import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer } from './state/auth/auth.reducer';
import { productsReducer } from './state/products/products.reducer';

import { loginEffect, refreshEffect } from './state/auth/auth.effects';
import { loadProductsEffect } from './state/products/products.effects';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorProvider } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore({ auth: authReducer, products: productsReducer }),
    provideEffects({ loginEffect, refreshEffect, loadProductsEffect }),
    authInterceptorProvider, // ✅ utiliser un objet pour FunctionalEffects
  ],
};
