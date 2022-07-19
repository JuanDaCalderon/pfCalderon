import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';


export const selectIsAuthFeature = (state: AppState) => state.isAuthenticated;
export const selectIsAdminFeature = (state: AppState) => state.isAdmin;
export const selectIsAdminRolFeature = (state: AppState) => state.rol;


export const selectFeatureLogin = createSelector(
  selectIsAuthFeature,
  (state: any) => state.isAuthenticated
);

export const selectFeatureAdmin = createSelector(
  selectIsAdminFeature,
  (state: any) => state.isAdmin
);

export const selectFeatureAdminRol = createSelector(
  selectIsAdminRolFeature,
  (state: any) => state.rol
);