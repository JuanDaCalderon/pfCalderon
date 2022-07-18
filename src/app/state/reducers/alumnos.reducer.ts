import { createReducer, on } from '@ngrx/store';
import { alumnosOutput } from 'src/app/other/users';
import { loadAlumnos } from '../actions/users.actions';

/* Estados iniciales - Inital State*/
export const initialState: alumnosOutput[] = []

export const alumnoReducer = createReducer(
    initialState,
    on(loadAlumnos, (state, {alumnos}) => {
        return { ...state, alumnos}
    })
);