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
    return this.http.get<clases>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/cursos/1/clase')
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

  /* postClases(alumno: { firstName: string, middleName: string, lastName: string, curso: number }) {
    return this.http.post <alumnosApi>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/alumnos', alumno)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando agregar el alumno, intenta más tarde'
          return throwError(() => message);
        })
      )
  } */

  /* editClases(alumno: { firstName: string, middleName: string, lastName: string, curso: number }, id: string) {
    return this.http.put <alumnosApi>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/alumnos/'+id, alumno)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando modificar el alumno, intenta más tarde'
          return throwError(() => message);
        })
      )
  } */

  /* deleteClases(alumnos: alumnosOutput) {
    return this.http.delete <alumnosApi>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/alumnos/'+ alumnos.id)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando eliminar el alumno, intenta más tarde'
          return throwError(() => message);
        })
      )
  } */
}
