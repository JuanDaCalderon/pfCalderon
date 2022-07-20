import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ClasesService } from '../clases.service';
import { AlumnosService } from 'src/app/alumnos/alumnos.service';
import { alumnosApi, alumnosOutput } from 'src/app/other/users';
import { cursos } from 'src/app/other/cursos';
import { CursosService } from 'src/app/cursos/cursos.service';

@Component({
  selector: 'app-add-clase-modal',
  templateUrl: './add-clase-modal.component.html',
  styleUrls: ['./add-clase-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddClaseModalComponent implements OnInit, OnDestroy {
  alumnosList: alumnosOutput[] = [];
  alumnosToBeAdd: alumnosApi[] = [];
  cursoList: cursos[] = [];
  isLoading: boolean = false;
  addForm: FormGroup;
  postClaseSub: Subscription;
  getAlumnosSub: Subscription;
  getAlumnosToBeAddedSub: Subscription;
  getCursosSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddClaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private claseService: ClasesService,
    private toastr: ToastrService,
    private alumnosService: AlumnosService,
    private cursoService: CursosService
  ) {
    this.getAlumnosSub = this.alumnosService.getAlumnos().subscribe(response => {
      this.alumnosList = response;
    });
    this.getAlumnosToBeAddedSub = this.alumnosService.getAlumnosAPI().subscribe(response => {
      this.alumnosToBeAdd = response;
    });
    this.getCursosSub = this.cursoService.getCursos().subscribe(response => {
      this.cursoList = response;
    });
    this.addForm = new FormGroup({
      'clase': new FormControl(null, [Validators.required]),
      'profesor': new FormControl(null, [Validators.required]),
      'cursoId': new FormControl(null, [Validators.required]),
      'alumnos': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.isLoading = true;
    let clase = this.addForm?.value;
    let alumnosFilterToBeAdd: alumnosApi[] = [];
    clase.alumnos.forEach(elementid => {
      this.alumnosToBeAdd.forEach(elementAlumno => {
        if (+elementid === +elementAlumno.id) {
          alumnosFilterToBeAdd.push(elementAlumno);
        }
      });
    });
    clase.alumnos = [...alumnosFilterToBeAdd];

    this.postClaseSub = this.claseService.postClases(clase)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Refresca la tabla de clases para ver el nuevo registro', 'Clase registrada');
          this.isLoading = false;
          this.addForm.reset();
          this.dialogRef.close();
        },
        error: (error) => {
          this.toastr.error(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  ngOnDestroy(): void {
    if (this.postClaseSub) {
      this.postClaseSub.unsubscribe();
    }
    if (this.getAlumnosSub) {
      this.getAlumnosSub.unsubscribe();
    }
    if (this.getAlumnosToBeAddedSub) {
      this.getAlumnosToBeAddedSub.unsubscribe();
    }
    if (this.getCursosSub) {
      this.getCursosSub.unsubscribe();
    }
  }
}
