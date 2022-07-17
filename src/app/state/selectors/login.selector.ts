import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';


export const selectIsAuthFeature = (state: AppState) => state.isAuthenticated;

export const selectFeatureLogin = createSelector(
    selectIsAuthFeature,
    (state:any) => state.isAuthenticated
  );