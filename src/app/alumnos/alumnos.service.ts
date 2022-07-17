import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { alumnosOutput, alumnosApi } from '../other/users';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  constructor(private http: HttpClient) { }
  getAlumnos() {
    return this.http.get <alumnosApi>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/alumnos')
      .pipe(
        map(data => {
          let alumnos: alumnosOutput[] = [];
          for (const id in data) {
            let alumno: alumnosOutput;
            alumno = {
              id: data[id].id,
              nombre: data[id].firstName + " " + data[id].middleName + " " + data[id].lastName,
              curso: data[id].curso,
              clases: data[id].clases,
              avatar: data[id].avatar
            };
            alumnos.push(alumno);
          }
          return alumnos
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando traer los alumnos, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

  postAlumno(alumno: { firstName: string, middleName: string, lastName: string, curso: number }) {
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
  }

  editAlumno(alumno: { firstName: string, middleName: string, lastName: string, curso: number }, id: string) {
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
  }

  deleteAlumno(alumnos: alumnosOutput) {
    console.log(alumnos);
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
  }
}
