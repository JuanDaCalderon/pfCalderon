import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { alumnosOutput } from 'src/app/other/users';

import { AddCursoModalComponent } from '../add-curso-modal/add-curso-modal.component';
import { EditCursoModalComponent } from '../edit-curso-modal/edit-curso-modal.component';
import { DeleteCursoModalComponent } from '../delete-curso-modal/delete-curso-modal.component';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { cursos } from 'src/app/other/cursos';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-dashboard-curso',
  templateUrl: './dashboard-curso.component.html',
  styleUrls: ['./dashboard-curso.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponentCurso implements OnInit {
  titulo: string = 'Cursos';
  data: cursos[] = [];
  columnsToDisplay: string[] = ['select', 'id', 'nombre del curso', 'clases'];
  selection = new SelectionModel<cursos>(true, []);
  @ViewChild('cursosTable') cursosTable: MatTable<Element>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<cursos>(this.data);
  isLoadingResults: boolean = true;
  getCursosSub:Subscription;
  getCursosData() {
    this.getCursosSub = this.cursosService.getCursos().subscribe(response => {
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

  constructor(private cursosService: CursosService, public dialog: MatDialog, private toastr: ToastrService) {
    this.getCursosData();
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

  checkboxLabel(row?: cursos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'selected' : 'noSelected'} all`;
    }
    return `${this.selection.isSelected(row) ? 'selected' : 'noSelected'} ${row.id}`;
  }

  openAddDialog() {
    this.dialog.open(AddCursoModalComponent, {
      width: '600px',
      data: this.dialog,
    });
  }

  openEditDialog() {
    let cursoEdit = null;
    if (this.selection.selected.length > 1 || this.selection.selected.length === 0) {
      let message: string;
      (this.selection.selected.length === 0) ? message = 'No has seleccionado ningún curso': message = 'Solo puedes editar un unico curso';
      this.toastr.error(message);
    }
    else {
      if (this.selection.selected[0] !== undefined && this.selection.selected[0] !== null) {
        cursoEdit = {
          id: this.selection.selected[0].id,
          curso: this.selection.selected[0].curso,
          clases: this.selection.selected[0].clases
        }
      }
      this.dialog.open(EditCursoModalComponent, {
        width: '600px',
        data: { dialog: this.dialog, curso: cursoEdit },
      });
    }
  }

  openDeleteDialog() {
    if (this.selection.selected.length === 0) {
      let message: string = 'No has seleccionado ningún curso';
      this.toastr.error(message);
    }
    else {
      this.dialog.open(DeleteCursoModalComponent, {
        width: '400px',
        data: { dialog: this.dialog, cursos: this.selection.selected },
      });
    }
  }

  refrescarCursos() {
    this.selection.clear();
    this.isLoadingResults = true;
    this.data = [];
    this.getCursosData();
    this.cursosTable.renderRows();
    this.toastr.success('Cursos actualizados Correctamente');
  }

  ngOnDestroy(): void {
    if (this.getCursosSub) {
      this.getCursosSub.unsubscribe();
    }
  }

}
