import { createAction, props } from '@ngrx/store';

export const trueAuth = createAction(
  '[Success Auth] Success Auth (Auth from FALSE to TRUE)'
);

export const falseLogOut = createAction(
  '[Success LogOut] Success LogOut (Auth from TRUE to FALSE)'
);

export const loadedLogin = createAction(
    '[Loaded Login] Loaded Login',
    props<any>()
);