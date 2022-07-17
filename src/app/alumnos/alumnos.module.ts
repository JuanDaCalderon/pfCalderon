import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NameOutputPipe } from '../pipes/name-output.pipe';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { HeaderModule } from '../shared/header.module';

import { AlumnosComponent } from './alumnos.component';
import { AddAlumnoModalComponent } from './add-alumno-modal/add-alumno-modal.component';
import { DeleteAlumnoModalComponent } from './delete-alumno-modal/delete-alumno-modal.component';
import { EditAlumnoModalComponent } from './edit-alumno-modal/edit-alumno-modal.component';
import { DashboardComponentAlumno } from './dashboard-alumno/dashboard-alumno.component';



@NgModule({
  declarations: [
    NameOutputPipe,
    AlumnosComponent,
    AddAlumnoModalComponent,
    EditAlumnoModalComponent,
    DeleteAlumnoModalComponent,
    DashboardComponentAlumno
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AlumnosRoutingModule,
    HeaderModule
  ]
})
export class AlumnosModule { }