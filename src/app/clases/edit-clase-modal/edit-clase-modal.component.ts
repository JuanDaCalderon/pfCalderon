import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ClasesService } from '../clases.service';
import { AlumnosService } from 'src/app/alumnos/alumnos.service';
import { alumnosApi, alumnosOutput } from 'src/app/other/users';
import { cursos } from 'src/app/other/cursos';
import { CursosService } from 'src/app/cursos/cursos.service';

@Component({
  selector: 'app-edit-clase-modal',
  templateUrl: './edit-clase-modal.component.html',
  styleUrls: ['./edit-clase-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditClaseModalComponent implements OnInit, OnDestroy {
  alumnosList: alumnosOutput[] = [];
  alumnosToBeAdd: alumnosApi[] = [];
  cursoList: cursos[] = [];
  isLoading: boolean = false;
  editForm: FormGroup;
  isSelected: boolean = false;

  editClaseSub: Subscription;
  getAlumnosSub: Subscription;
  getAlumnosToBeAddedSub: Subscription;
  getCursosSub: Subscription;

  selectedCurso: string | number;
  selectedAlumnos: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditClaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialog: MatDialog, clase: { id: string | number, clase: string, profesor: string, cursoId: string | number, alumnos: alumnosApi[] }},
    private claseService: ClasesService,
    private toastr: ToastrService,
    private alumnosService: AlumnosService,
    private cursoService: CursosService
  ) {
    if (this.data.clase !== undefined && this.data.clase !== null) {
      this.isSelected = true;
    }
    this.getAlumnosSub = this.alumnosService.getAlumnos().subscribe(response => {
      this.alumnosList = response;
    });
    this.getAlumnosToBeAddedSub = this.alumnosService.getAlumnosAPI().subscribe(response => {
      this.alumnosToBeAdd = response;
    });
    this.getCursosSub = this.cursoService.getCursos().subscribe(response => {
      this.cursoList = response;
    });
    this.data.clase?.alumnos.forEach(element => {
      let id: string = element?.id.toString();
      this.selectedAlumnos.push(id);
    });
    this.selectedCurso = this.data.clase?.cursoId;
    this.editForm = new FormGroup({
      'clase': new FormControl({value: this.data.clase?.clase || null || null, disabled: !this.isSelected}, [Validators.required]),
      'profesor': new FormControl({value: this.data.clase?.profesor || null || null, disabled: !this.isSelected}, [Validators.required]),
      'cursoId': new FormControl(this.selectedCurso, [Validators.required]),
      'alumnos': new FormControl(this.selectedAlumnos, [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.isLoading = true;
    let clase = this.editForm?.value;
    let alumnosFilterToBeAdd: alumnosApi[] = [];
    clase.alumnos.forEach(elementid => {
      this.alumnosToBeAdd.forEach(elementAlumno => {
        if (+elementid === +elementAlumno.id) {
          alumnosFilterToBeAdd.push(elementAlumno);
        }
      });
    });
    clase.alumnos = [...alumnosFilterToBeAdd];
    this.editClaseSub = this.claseService.editClase(clase, this.data.clase.id.toString())
    .subscribe({
      next: (response) => {
        this.toastr.success('Refresca la tabla de clases para ver la modificación', 'Clase Modificada');
        this.isLoading = false;
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
    if (this.editClaseSub) {
      this.editClaseSub.unsubscribe();
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
