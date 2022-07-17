import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { alumnosOutput } from 'src/app/other/users';

import { AddAlumnoModalComponent } from '../add-alumno-modal/add-alumno-modal.component';
import { EditAlumnoModalComponent } from '../edit-alumno-modal/edit-alumno-modal.component';
import { DeleteAlumnoModalComponent } from '../delete-alumno-modal/delete-alumno-modal.component';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlumnosService } from '../alumnos.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-alumno',
  templateUrl: './dashboard-alumno.component.html',
  styleUrls: ['./dashboard-alumno.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponentAlumno implements OnInit {
  titulo: string = 'Alumnos';
  data: alumnosOutput[] = [];
  columnsToDisplay: string[] = ['select', 'id', 'nombre', 'curso', 'clases', 'avatar'];
  selection = new SelectionModel<alumnosOutput>(true, []);
  @ViewChild('alumnosTable') alumnosTable: MatTable<Element>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<alumnosOutput>(this.data);
  isLoadingResults: boolean = true;
  getAlumnosSub:Subscription;
  getAlumnosData() {
    this.getAlumnosSub = this.alumnoService.getAlumnos().subscribe(response => {
      this.data = response;
      this.dataSource.data = response;
      this.isLoadingResults = false;
    })
  }

  appStatus = new Promise((resolve, rejects) => {
    setTimeout(function check(){
        resolve('Toda la información cargada');
    },1000);
  });

  constructor(private alumnoService: AlumnosService, public dialog: MatDialog, private toastr: ToastrService) {
    this.getAlumnosData();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.data);
  }

  checkboxLabel(row?: alumnosOutput): string {
    if (!row) {
      return `${this.isAllSelected() ? 'selected' : 'noSelected'} all`;
    }
    return `${this.selection.isSelected(row) ? 'selected' : 'noSelected'} ${row.id}`;
  }

  openAddDialog() {
    this.dialog.open(AddAlumnoModalComponent, {
      width: '600px',
      data: this.dialog,
    });
  }

  openEditDialog() {
    let alumnoEdit = null;
    if (this.selection.selected.length > 1 || this.selection.selected.length === 0) {
      let message: string;
      (this.selection.selected.length === 0) ? message = 'No has seleccionado ningún alumno': message = 'Solo puedes editar un unico alumno';
      this.toastr.error(message);
    }
    else {
      if (this.selection.selected[0] !== undefined && this.selection.selected[0] !== null) {
        let fullName = this.selection.selected[0].nombre.split(' ');
        alumnoEdit = {
          id: this.selection.selected[0].id,
          firstName: fullName[0],
          middleName: fullName[1],
          lastName: fullName[2],
          curso: this.selection.selected[0].curso,
        }
      }
      this.dialog.open(EditAlumnoModalComponent, {
        width: '600px',
        data: { dialog: this.dialog, alumnos: alumnoEdit },
      });
    }
  }

  openDeleteDialog() {
    if (this.selection.selected.length === 0) {
      let message: string = 'No has seleccionado ningún alumno';
      this.toastr.error(message);
    }
    else {
      this.dialog.open(DeleteAlumnoModalComponent, {
        width: '400px',
        data: {dialog: this.dialog, alumnos: this.selection.selected},
      });
    }
  }

  refrescarAlumnos() {
    this.selection.clear();
    this.isLoadingResults = true;
    this.data = [];
    this.getAlumnosData();
    this.alumnosTable.renderRows();
    this.toastr.success('Alumnos actualizados Correctamente');
  }

  ngOnDestroy(): void {
    if (this.getAlumnosSub) {
      this.getAlumnosSub.unsubscribe();
    }
  }

}
