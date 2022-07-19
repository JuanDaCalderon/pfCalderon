import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'rolOutput'
})

export class rolOutputPipe implements PipeTransform {

    constructor(private cookie: CookieService) { }

    transform(value: string, ...args: string[] | number[]): string {
        let rol = (this.cookie.get('admin') === "true") ? 'administrador' : 'estudiante';
        return rol;
    }

}
