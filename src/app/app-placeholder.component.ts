import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../app/state/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `
      <router-outlet></router-outlet>
  `,
  
})
export class AppPlaceholderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }
}
