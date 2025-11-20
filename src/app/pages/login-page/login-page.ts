import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../state/auth/auth.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from '../components/login-form/login-form'; 

import { FormsModule } from '@angular/forms';



@Component({
  standalone: true, 
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  styleUrls: ['./css/styles.css'],
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
})
export class LoginPageComponent {

  username: string = 'demo';  
  password: string = 'demo';  

  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  onLogin({ username, password }: { username: string; password: string }) {
    this.store.dispatch(AuthActions.login({ username, password }));
  }
}
