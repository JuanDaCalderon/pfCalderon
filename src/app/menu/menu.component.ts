import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { selectFeatureLogin, selectFeatureAdmin, selectFeatureAdminRol } from '../state/selectors/login.selector';
import { falseLogOut } from '../state/actions/users.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isAuthenticated$: Observable<boolean> = new Observable();
  isAdmin$: Observable<boolean> = new Observable();
  isAuthCookie: boolean = false;
  isAdminCookie: boolean = false;
  rol$: Observable<boolean> = new Observable();
  constructor(private cookie:CookieService, private store: Store<any>,private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectFeatureLogin);
    this.isAuthCookie = (this.cookie.get('username')) ? true : false;

    this.isAdmin$ = this.store.select(selectFeatureAdmin);
    this.isAdminCookie = (this.cookie.get('admin') === "true") ? true : false;

    this.rol$ = this.store.select(selectFeatureAdminRol);
  }

  onLogOut():void {
    this.cookie.deleteAll();
    this.store.dispatch(falseLogOut());
    this.router.navigate(['/']);
    window.location.reload();
  }

}
