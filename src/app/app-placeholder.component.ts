import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../app/state/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [RouterLink, CommonModule,RouterOutlet],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h2 class="text-2xl font-semibold">App Shop — Placeholder</h2>
      <p class="text-gray-600">Ici viendra l’UI cohérente (login, liste produits, avis...).</p>

      <!-- Mini Dashboard -->
      <div class="p-4 border rounded bg-gray-50">
        <p>Status utilisateur : 
          <span *ngIf="isLoggedIn$ | async; else loggedOut">Connecté</span>
          <ng-template #loggedOut>Déconnecté</ng-template>
        </p>
      </div>

      <!-- Navigation vers les pages principales -->
      <nav class="flex flex-wrap gap-3">
        <button type="button" routerLink="/app/login" class="rounded border px-3 py-2 hover:bg-gray-50">Login</button>
        <button type="button" routerLink="/app/products" class="rounded border px-3 py-2 hover:bg-gray-50">Liste Produits</button>
        <button type="button" routerLink="/app/product-rating" class="rounded border px-3 py-2 hover:bg-gray-50">Avis Produit</button>
      </nav>

      <!-- Ici, les enfants vont s’afficher -->
      <router-outlet></router-outlet>
    </section>
  `,
})
export class AppPlaceholderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }
}
