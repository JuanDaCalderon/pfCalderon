import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';


export const selectAlumnoFeature = (state: AppState) => state.alumnos;


export const selectFeatureAlumnos = createSelector(
    selectAlumnoFeature,
    (state: any) => state.alumnos
);