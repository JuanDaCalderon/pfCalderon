import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { clases } from 'src/app/other/clases';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-edit-curso-modal',
  templateUrl: './edit-curso-modal.component.html',
  styleUrls: ['./edit-curso-modal.component.scss']
})
export class EditCursoModalComponent implements OnInit {
  isLoading: boolean = false;
  editForm: FormGroup;
  isSelected: boolean = false;
  bodyCopy: string = 'No se ha seleccionado ningún curso aún';
  clasesList: object[] = [{ id: 1, nombre: 'Markets' }, { id: 2, nombre: 'Marketing' }, { id: 2, nombre: 'Implementation' }];
  editCursoSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<EditCursoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialog: MatDialog, curso: {id:string, curso: string, clases: clases[]} },
    private cursoService: CursosService,
    private toastr: ToastrService
  ) {
    if (this.data.curso !== undefined && this.data.curso !== null) {
      this.isSelected = true;
      this.bodyCopy = '';
    }
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'curso': new FormControl({value: this.data.curso?.curso || null || null, disabled: !this.isSelected}, [Validators.required]),
      'clases': new FormControl({value: this.data.curso?.clases || null, disabled: !this.isSelected}),
    });
  }

  onSubmit() {
    this.isLoading = true;
    let curso = this.editForm?.value;
    this.editCursoSub = this.cursoService.editCurso(curso, this.data.curso.id)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Refresca la tabla de cursos para ver la modificación', 'Curso Modificado');
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
    if (this.editCursoSub) {
      this.editCursoSub.unsubscribe();
    }
  }
}
