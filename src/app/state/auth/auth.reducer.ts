import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: any | null;
}


export const initialState: AuthState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,


  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),


  on(AuthActions.loginSuccess, (state, { access, refresh }) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    return {
      ...state,
      access,
      refresh,
      loading: false,
      error: null,
    };
  }),


  on(AuthActions.loginFailure, (state, { error }) => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    return {
      ...state,
      loading: false,
      error,
    };
  }),


  on(AuthActions.refreshSuccess, (state, { access }) => {
    localStorage.setItem('access', access);

    return {
      ...state,
      access,
    };
  })
);
