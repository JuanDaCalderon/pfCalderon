import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponentAlumno } from './dashboard-alumno/dashboard-alumno.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: DashboardComponentAlumno
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
