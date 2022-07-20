import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';

import { ClasesService } from '../clases.service';
import { clases } from 'src/app/other/clases';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectFeatureAdmin } from 'src/app/state/selectors/login.selector';
import { CookieService } from 'ngx-cookie-service';
import { DeleteClaseModalComponent } from '../delete-clase-modal/delete-clase-modal.component';
import { EditClaseModalComponent } from '../edit-clase-modal/edit-clase-modal.component';
import { AddClaseModalComponent } from '../add-clase-modal/add-clase-modal.component';

@Component({
  selector: 'app-dashboard-clase',
  templateUrl: './dashboard-clase.component.html',
  styleUrls: ['./dashboard-clase.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponentClase implements OnInit {
  titulo: string = 'Clases';
  data: clases[] = [];
  columnsToDisplay: string[] = ['select', 'id', 'clase', 'profesor', 'curso', 'alumnos'];
  selection = new SelectionModel<clases>(true, []);
  @ViewChild('clasesTable') clasesTable: MatTable<Element>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<clases>(this.data);
  isLoadingResults: boolean = true;
  getClasesSub:Subscription;

  isAdmin$: Observable<boolean> = new Observable();
  isAdminCookie: boolean = false;

  getClasesData() {
    this.getClasesSub = this.clasesService.getClases().subscribe(response => {
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

  constructor(private clasesService: ClasesService, public dialog: MatDialog, private toastr: ToastrService, private store: Store<AppState>, private cookie:CookieService) {
    this.getClasesData();
  }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(selectFeatureAdmin);
    this.isAdminCookie = (this.cookie.get('admin') === "true") ? true : false;
   }

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

  checkboxLabel(row?: clases): string {
    if (!row) {
      return `${this.isAllSelected() ? 'selected' : 'noSelected'} all`;
    }
    return `${this.selection.isSelected(row) ? 'selected' : 'noSelected'} ${row.id}`;
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(AddClaseModalComponent, {
      width: '600px',
      data: this.dialog,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refrescarClases();
    });
  }

  openEditDialog() {
    let dialogRef = null;
    let claseEdit = null;
    if (this.selection.selected.length > 1 || this.selection.selected.length === 0) {
      let message: string;
      (this.selection.selected.length === 0) ? message = 'No has seleccionado ninguna clase': message = 'Solo puedes editar una única clase';
      this.toastr.error(message);
    }
    else {
      if (this.selection.selected[0] !== undefined && this.selection.selected[0] !== null) {
        claseEdit = {
          id: this.selection.selected[0].id,
          clase: this.selection.selected[0].clase,
          profesor: this.selection.selected[0].profesor,
          cursoId: this.selection.selected[0].cursoId,
          alumnos: this.selection.selected[0].alumnos,
        }
      }
      dialogRef = this.dialog.open(EditClaseModalComponent, {
        width: '600px',
        data: { dialog: this.dialog, clase: claseEdit },
      });
    }

    if (dialogRef) {
      dialogRef.afterClosed().subscribe(() => {
        this.refrescarClases();
      });
    }
  }

  openDeleteDialog() {
    let dialogRef = null;
    if (this.selection.selected.length === 0) {
      let message: string = 'No has seleccionado ninguna clase';
      this.toastr.error(message);
    }
    else {
      dialogRef = this.dialog.open(DeleteClaseModalComponent, {
        width: '400px',
        data: { dialog: this.dialog, clases: this.selection.selected },
      });
    }
    if (dialogRef) {
      dialogRef.afterClosed().subscribe(() => {
        this.refrescarClases();
      });
    }
  }

  refrescarClases() {
    this.selection.clear();
    this.isLoadingResults = true;
    this.data = [];
    this.getClasesData();
    this.clasesTable.renderRows();
    this.toastr.success('Clases actualizadas Correctamente');
  }

  ngOnDestroy(): void {
    if (this.getClasesSub) {
      this.getClasesSub.unsubscribe();
    }
  }

}
