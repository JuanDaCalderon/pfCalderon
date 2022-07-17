import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponentCurso } from './dashboard-curso/dashboard-curso.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: DashboardComponentCurso
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
