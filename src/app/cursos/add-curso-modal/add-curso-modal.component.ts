import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CursosService } from '../cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-curso-modal',
  templateUrl: './add-curso-modal.component.html',
  styleUrls: ['./add-curso-modal.component.scss']
})
export class AddCursoModalComponent implements OnInit {
  isLoading: boolean = false;
  clasesList: object[] = [{ id: 1, nombre: 'Markets' }, { id: 2, nombre: 'Marketing' }, { id: 2, nombre: 'Implementation' }];
  addForm: FormGroup;
  postCursosSub:Subscription;

  constructor (
    public dialogRef: MatDialogRef<AddCursoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private cursoService: CursosService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'curso': new FormControl(null, [Validators.required]),
      'clases': new FormControl(null)
    });
  }

  onSubmit() {
    this.isLoading = true;
    let curso = this.addForm?.value;
    this.postCursosSub = this.cursoService.postCurso(curso)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Refresca la tabla de cursos para ver el nuevo registro', 'Curso Agregado');
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
    if (this.postCursosSub) {
      this.postCursosSub.unsubscribe();
    }
  }

}
