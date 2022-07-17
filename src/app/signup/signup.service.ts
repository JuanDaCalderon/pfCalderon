import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { postUser } from '../other/users';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) { }

  signup(user: postUser) {
    return this.http.post('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/usuarios', user)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando crear el usuario, intenta más tarde'
          return throwError(() => message);
        })
      )
  }
}
