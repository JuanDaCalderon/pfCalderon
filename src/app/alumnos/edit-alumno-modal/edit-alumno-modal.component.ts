import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AlumnosService } from '../alumnos.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
//import { alumnosOutput } from 'src/app/other/users';

@Component({
  selector: 'app-edit-alumno-modal',
  templateUrl: './edit-alumno-modal.component.html',
  styleUrls: ['./edit-alumno-modal.component.scss']
})

export class EditAlumnoModalComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  editForm: FormGroup;
  isSelected: boolean = false;
  bodyCopy: string = 'No se ha seleccionado ningún alumno aún';
  editAlumnoSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialog: MatDialog, alumnos: {id:string, firstName: string, middleName: string, lastName: string, curso: number } },
    private alumnoService: AlumnosService,
    private toastr: ToastrService
  ) {
    if (this.data.alumnos !== undefined && this.data.alumnos !== null) {
      this.isSelected = true;
      this.bodyCopy = '';
    }
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'firstName': new FormControl({value: this.data.alumnos?.firstName || null || null, disabled: !this.isSelected}, [Validators.required]),
      'middleName': new FormControl({value: this.data.alumnos?.middleName || null || null, disabled: !this.isSelected}, [Validators.required]),
      'lastName': new FormControl({value: this.data.alumnos?.lastName || null || null, disabled: !this.isSelected}, [Validators.required]),
      'curso': new FormControl({value: this.data.alumnos?.curso || null, disabled: !this.isSelected}, [Validators.required])
    });
  }

  onSubmit() {
    this.isLoading = true;
    let alumno = this.editForm?.value;
    this.editAlumnoSub = this.alumnoService.editAlumno(alumno, this.data.alumnos.id)
    .subscribe({
      next: (response) => {
        console.log(response);
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
