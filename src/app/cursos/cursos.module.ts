import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

import { CursosRoutingModule } from './cursos-routing.module';
import { HeaderModule } from '../shared/header.module';

import { CursosComponent } from './cursos.component';
import { AddCursoModalComponent } from './add-curso-modal/add-curso-modal.component';
import { EditCursoModalComponent } from './edit-curso-modal/edit-curso-modal.component';
import { DeleteCursoModalComponent } from './delete-curso-modal/delete-curso-modal.component';
import { DashboardComponentCurso } from './dashboard-curso/dashboard-curso.component';



@NgModule({
  declarations: [
    CursosComponent,
    AddCursoModalComponent,
    EditCursoModalComponent,
    DeleteCursoModalComponent,
    DashboardComponentCurso
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    CursosRoutingModule,
    HeaderModule
  ]
})
export class CursosModule { }