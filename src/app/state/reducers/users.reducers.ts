import { createReducer, on } from '@ngrx/store';
import { trueAuth, falseLogOut, falseAdmin, rolAction } from '../actions/users.actions';

/* Estados iniciales - Inital State*/
export const initialState: { isAuthenticated: boolean, isAdmin: boolean, rol: string } =
{
    isAuthenticated: false,
    isAdmin: false,
    rol: 'estudiante'
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
    }),
    on(rolAction, (state) => {
        return { ...state, rol: 'administrador' }
    })
);