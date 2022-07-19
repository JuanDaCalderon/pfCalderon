import { ActionReducerMap } from "@ngrx/store"
import { loginReducer } from "./reducers/users.reducers"
import { alumnoReducer } from "./reducers/alumnos.reducer"
import { alumnosOutput } from "../other/users"

export interface AppState {
    isAuthenticated: {},
    isAdmin: {},
    rol: {},
    alumnos: alumnosOutput[]
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    isAuthenticated: loginReducer,
    isAdmin: loginReducer,
    rol: loginReducer,
    alumnos: alumnoReducer
}