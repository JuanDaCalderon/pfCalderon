import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AlumnosService } from '../alumnos.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { cursos } from 'src/app/other/cursos';
import { CursosService } from 'src/app/cursos/cursos.service';
//import { alumnosOutput } from 'src/app/other/users';

@Component({
  selector: 'app-edit-alumno-modal',
  templateUrl: './edit-alumno-modal.component.html',
  styleUrls: ['./edit-alumno-modal.component.scss']
})

export class EditAlumnoModalComponent implements OnInit, OnDestroy {
  cursoList: cursos[] = [];
  isLoading: boolean = false;
  editForm: FormGroup;
  isSelected: boolean = false;
  bodyCopy: string = 'No se ha seleccionado ningún alumno aún';
  editAlumnoSub: Subscription;

  getCursosSub: Subscription;

  selectedCurso: string | number;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialog: MatDialog, alumnos: {id:string, firstName: string, middleName: string, lastName: string, cursoId: number } },
    private alumnoService: AlumnosService,
    private cursoService: CursosService,
    private toastr: ToastrService
  ) {
    if (this.data.alumnos !== undefined && this.data.alumnos !== null) {
      this.isSelected = true;
      this.bodyCopy = '';
    }
    this.getCursosSub = this.cursoService.getCursos().subscribe(response => {
      this.cursoList = response;
    });
    this.selectedCurso = this.data.alumnos?.cursoId.toString();
    this.editForm = new FormGroup({
      'firstName': new FormControl({value: this.data.alumnos?.firstName || null || null, disabled: !this.isSelected}, [Validators.required]),
      'middleName': new FormControl({value: this.data.alumnos?.middleName || null || null, disabled: !this.isSelected}, [Validators.required]),
      'lastName': new FormControl({value: this.data.alumnos?.lastName || null || null, disabled: !this.isSelected}, [Validators.required]),
      'cursoId': new FormControl(this.selectedCurso, [Validators.required])
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.isLoading = true;
    let alumno = this.editForm?.value;
    this.editAlumnoSub = this.alumnoService.editAlumno(alumno, this.data.alumnos.id)
    .subscribe({
      next: (response) => {
        this.toastr.success('Refresca la tabla de alumnos para ver la modificación', 'Alumno Modificado');
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
    if (this.editAlumnoSub) {
      this.editAlumnoSub.unsubscribe();
    }
  }

}
