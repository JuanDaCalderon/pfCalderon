import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CursosService } from '../cursos.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ClasesService } from 'src/app/clases/clases.service';
import { clases } from 'src/app/other/clases';

@Component({
  selector: 'app-add-curso-modal',
  templateUrl: './add-curso-modal.component.html',
  styleUrls: ['./add-curso-modal.component.scss']
})
export class AddCursoModalComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  clasesList: clases[] = [];
  addForm: FormGroup;
  postCursosSub:Subscription;
  getClasesSub:Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddCursoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private cursoService: CursosService,
    private claseService: ClasesService,
    private toastr: ToastrService
  ) {
    this.getClasesSub = this.claseService.getClases().subscribe(response => {
      this.clasesList = response;
    });
    this.addForm = new FormGroup({
      'curso': new FormControl(null, [Validators.required]),
      'clases': new FormControl(null)
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.isLoading = true;
    let curso = this.addForm?.value;
    let clasesFilterToBeAdd: clases[] = [];
    curso.clases.forEach(elementid => {
      this.clasesList.forEach(elementClase => {
        if (+elementid === +elementClase.id) {
          clasesFilterToBeAdd.push(elementClase);
        }
      });
    });
    curso.clases = [...clasesFilterToBeAdd];
    this.postCursosSub = this.cursoService.postCurso(curso)
      .subscribe({
        next: (response) => {
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
