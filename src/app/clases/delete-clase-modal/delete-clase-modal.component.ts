import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ClasesService } from '../clases.service';
import { clases } from 'src/app/other/clases';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-clase-modal',
  templateUrl: './delete-clase-modal.component.html',
  styleUrls: ['./delete-clase-modal.component.scss']
})
export class DeleteClaseModalComponent implements OnInit {

  isLoading: boolean = false;
  isSelected: boolean = false;
  bodyCopy: string = 'Selecciona la clase que quieres eliminar';
  deleteClaseSub:Subscription;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DeleteClaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dialog: MatDialog, clases: clases[] },
    private claseService: ClasesService,
    private toastr: ToastrService
  ) {
    if (this.data.clases.length > 0) {
      this.isSelected = true;
      this.bodyCopy = 'una vez eliminadas no podras recuperarlos';
    }
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true;
    for (const index in this.data.clases) {
      this.deleteClaseSub = this.claseService.deleteClases(this.data.clases[index])
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Refresca la tabla de Clases para ver la eliminación de la clase', 'Clase Eliminada');
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
    if (this.deleteClaseSub) {
      this.deleteClaseSub.unsubscribe();
    }
  }

}
