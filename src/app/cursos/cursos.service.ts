import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { clases } from '../other/clases';
import { cursos } from '../other/cursos';
import { alumnosApi } from '../other/users';

@Injectable({
  providedIn: 'root'
})

export class CursosService {
  constructor(private http: HttpClient) { }

  getCursos() {
    return this.http.get<cursos>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/cursos')
      .pipe(
        map(data => {
          let cursos: cursos[] = [];
          for (const id in data) {
            let curso: cursos;
            curso = {
              curso: data[id].curso,
              id: data[id].id,
              clases: data[id].clases
            };
            cursos.push(curso);
          }
          return cursos
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando traer los cursos, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

  postCurso(curso: cursos) {
    let cursoMaped:object;
    if (!curso.clases) {
      cursoMaped = {
        curso: curso.curso
      };
    }
    else{
      if (curso.clases.length <= 0) {
        cursoMaped = {
          curso: curso.curso
        };
      }
      else {
        cursoMaped = curso;
      }
    }
    return this.http.post <cursos>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/cursos', cursoMaped)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando agregar el curso, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

  editCurso(curso: { curso: string, clases: clases[] }, id: string) {
    let cursoMaped:object;
    if (curso.clases.length <= 0) {
      cursoMaped = {
        curso: curso.curso
      };
    }
    else {
      cursoMaped = curso;
    }
    return this.http.put <alumnosApi>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/cursos/'+id, cursoMaped)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando modificar el curso, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

  deleteCurso(curso: cursos) {
    return this.http.delete <cursos>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/cursos/'+ curso.id)
      .pipe(
        map(data => {
          return data
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando eliminar el curso, intenta más tarde'
          return throwError(() => message);
        })
      )
  }

}
