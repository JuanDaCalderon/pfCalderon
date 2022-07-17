import { ActionReducerMap } from "@ngrx/store"
import { loginReducer } from "./reducers/users.reducers"

export interface AppState {
    isAuthenticated: {}
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    isAuthenticated: loginReducer
}