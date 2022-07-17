import { createReducer, on } from '@ngrx/store';
import { trueAuth, falseLogOut } from '../actions/users.actions';

/* Estados iniciales - Inital State*/
export const initialState: { isAuthenticated: boolean } = { isAuthenticated: false };

export const loginReducer = createReducer(
    initialState,
    on(trueAuth, (state) => {
        return { ...initialState, isAuthenticated: true }
    }),
    on(falseLogOut, (state) => {
        return { ...initialState, isAuthenticated: false }
    })
);