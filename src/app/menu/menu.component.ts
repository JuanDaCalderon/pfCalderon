import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { selectFeatureLogin } from '../state/selectors/login.selector';
import { falseLogOut } from '../state/actions/users.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isAuthenticated$: Observable<boolean> = new Observable();
  isAutCookie: boolean = false;
  constructor(private cookie:CookieService, private store: Store<any>,private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectFeatureLogin);
    this.isAutCookie = (this.cookie.get('username')) ? true : false;
  }

  onLogOut():void {
    this.cookie.deleteAll();
    this.store.dispatch(falseLogOut());
    this.router.navigate(['/']);
    window.location.reload();
  }

}
