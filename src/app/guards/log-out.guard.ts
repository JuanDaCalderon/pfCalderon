import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogOutGuard implements CanActivate {
  constructor(private cookie: CookieService, private router: Router) { }

  redirect(flag: boolean): any {
    if (flag) {
      this.router.navigate(['/', 'alumnos']);
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const guardFlag = this.cookie.check('username');
    this.redirect(guardFlag);
    return true;
  }
}
