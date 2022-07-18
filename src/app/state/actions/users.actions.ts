import { createAction, props } from '@ngrx/store';
import { alumnosOutput } from 'src/app/other/users';

export const trueAuth = createAction(
  '[Success Auth] Success Auth (Auth from FALSE to TRUE)'
);

export const falseLogOut = createAction(
  '[Success LogOut] Success LogOut (Auth from TRUE to FALSE)'
);

export const falseAdmin = createAction(
  '[Success Admin] Success Admin (Admin from FALSE to TRUE)',
  props<{ isAdmin: boolean }>()
);

export const loadAlumnos = createAction(
    '[Load Alumnos] Load Alumnos',
    props<{alumnos: alumnosOutput[]}>()
);