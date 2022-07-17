import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

import { ClasesRoutingModule } from './clases-routing.module';
import { HeaderModule } from '../shared/header.module';

import { ClasesComponent } from './clases.component';
import { AddClaseModalComponent } from './add-clase-modal/add-clase-modal.component';
import { EditClaseModalComponent } from './edit-clase-modal/edit-clase-modal.component';
import { DeleteClaseModalComponent } from './delete-clase-modal/delete-clase-modal.component';
import { DashboardComponentClase } from './dashboard-clase/dashboard-clase.component';



@NgModule({
  declarations: [
    ClasesComponent,
    AddClaseModalComponent,
    EditClaseModalComponent,
    DeleteClaseModalComponent,
    DashboardComponentClase
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    ClasesRoutingModule,
    HeaderModule
  ]
})
export class ClasesModule { }