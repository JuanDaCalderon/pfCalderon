import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { clases } from '../other/clases';
/* import { alumnosApi } from '../other/users'; */

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  constructor(private http: HttpClient) { }

  getClases() {
    return this.http.get<clases>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/clases')
      .pipe(
        map(data => {
          let clases: clases[] = [];
          for (const id in data) {
            let clase: clases;
            clase = {
              clase: data[id].clase,
              id: data[id].id,
              profesor: data[id].profesor,
              cursoId: data[id].cursoId,
              alumnos: data[id].alumnos
            };
            clases.push(clase);
          }
          return clases
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando traer las clases, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

  postClases(clase: clases) {
    return this.http.post <clases>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/clases', clase)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando agregar la clase, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

  editClase(clase: clases, id: string) {
    return this.http.put<clases>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/clases/' + id, clase)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando modificar la clase, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

  deleteClases(clase: clases) {
    return this.http.delete <clases>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/clases/'+ clase.id)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando eliminar la clase, intenta más tarde'
          return throwError(() => message);
        })
      )
  }
}
