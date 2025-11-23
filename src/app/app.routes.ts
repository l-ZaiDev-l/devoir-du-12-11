import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';

import { LoginPageComponent } from './pages/login-page/login-page';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { ProductsPageComponent } from './pages/products-page/products-page';
import { ProductRatingPageComponent } from './pages/product-rating-page/product-rating-page';

export const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },

  // Pages dev
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },

  // Pages principales via AppPlaceholder
  { path: 'app', component: AppPlaceholderComponent, children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'product-rating', component: ProductRatingPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'cart', component: Cart },
      
    ]
  },

  { path: '**', redirectTo: '' },
];
