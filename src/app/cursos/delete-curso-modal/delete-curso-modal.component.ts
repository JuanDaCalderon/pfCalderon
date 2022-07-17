import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CursosService } from '../cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { cursos } from 'src/app/other/cursos';

@Component({
  selector: 'app-delete-curso-modal',
  templateUrl: './delete-curso-modal.component.html',
  styleUrls: ['./delete-curso-modal.component.scss']
})
export class DeleteCursoModalComponent implements OnInit {
  isLoading: boolean = false;
  isSelected: boolean = false;
  bodyCopy: string = 'Selecciona el curso que quieres eliminar';
  deleteCursoSub:Subscription;
  constructor(
    public dialogRef: MatDialogRef<DeleteCursoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialog: MatDialog, cursos: cursos[] },
    private cursosService: CursosService,
    private toastr: ToastrService
  ) {
    if (this.data.cursos.length > 0) {
      this.isSelected = true;
      this.bodyCopy = 'una vez eliminados no podras recuperarlos';
    }
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true;
    for (const index in this.data.cursos) {
      this.deleteCursoSub = this.cursosService.deleteCurso(this.data.cursos[index])
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Refresca la tabla de Cursos para ver la eliminación del curso', 'Curso Eliminado');
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
    if (this.deleteCursoSub) {
      this.deleteCursoSub.unsubscribe();
    }
  }
}
