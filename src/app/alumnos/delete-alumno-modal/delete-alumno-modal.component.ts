import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlumnosService } from '../alumnos.service';
import { ToastrService } from 'ngx-toastr';
import { alumnosOutput } from 'src/app/other/users';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-delete-alumno-modal',
  templateUrl: './delete-alumno-modal.component.html',
  styleUrls: ['./delete-alumno-modal.component.scss']
})
export class DeleteAlumnoModalComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isSelected: boolean = false;
  bodyCopy: string = 'Selecciona el alumno que quieres eliminar';
  deleteAlumnoSub:Subscription;
  constructor(
    public dialogRef: MatDialogRef<DeleteAlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dialog:MatDialog, alumnos: alumnosOutput []},
    private alumnoService: AlumnosService,
    private toastr: ToastrService
  ) {
    if (this.data.alumnos.length > 0) {
      this.isSelected = true;
      this.bodyCopy = 'una vez eliminados no podras recuperarlos';
    }
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true;
    for (const index in this.data.alumnos) {
      this.deleteAlumnoSub = this.alumnoService.deleteAlumno(this.data.alumnos[index])
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Refresca la tabla de alumnos para ver la eliminación del alumno', 'Alumno Eliminado');
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
        });
    }
  }

  ngOnDestroy(): void {
    if (this.deleteAlumnoSub) {
      this.deleteAlumnoSub.unsubscribe();
    }
  }

}
