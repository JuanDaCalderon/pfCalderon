import { createReducer, on } from '@ngrx/store';
import { trueAuth, falseLogOut, falseAdmin } from '../actions/users.actions';

/* Estados iniciales - Inital State*/
export const initialState: { isAuthenticated: boolean, isAdmin: boolean } =
{
    isAuthenticated: false,
    isAdmin: true
};

export const loginReducer = createReducer(
    initialState,
    on(trueAuth, (state) => {
        return { ...state, isAuthenticated: true }
    }),
    on(falseLogOut, (state) => {
        return { ...state, isAuthenticated: false }
    }),
    on(falseAdmin, (state, props) => {
        return { ...state, isAdmin: props.isAdmin }
    })
);