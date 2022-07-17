import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponentClase } from './dashboard-clase/dashboard-clase.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: DashboardComponentClase
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasesRoutingModule { }
