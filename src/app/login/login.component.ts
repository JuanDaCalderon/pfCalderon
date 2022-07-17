import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { trueAuth } from '../state/actions/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit, OnDestroy {
  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  loginForm: FormGroup;
  isLoading: boolean = false;
  loginSub: Subscription

  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService, private cookie:CookieService, private store: Store<any>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'remeber': new FormControl(true)
    });
  }

  onSubmit() {
    this.isLoading = true;
    let remeber = this.loginForm.value.remeber;
    let user = { email: this.loginForm?.value.email, password: this.loginForm?.value.password };
    this.loginSub = this.loginService.login(user)
      .subscribe({
        next: (response) => {
          if (typeof response === 'object') {
            if (remeber) {
              this.cookie.set('username', response.username, { expires: 7 });
              this.cookie.set('email', response.email, { expires: 7 });
              this.cookie.set('admin', response.admin, { expires: 7 });
              this.cookie.set('phone', response.phone, { expires: 7 });
              this.cookie.set('id', response.id, { expires: 7 });
            }
            else {
              this.cookie.set('username', response.username);
              this.cookie.set('email', response.email);
              this.cookie.set('admin', response.admin);
              this.cookie.set('phone', response.phone);
              this.cookie.set('id', response.id);
            }
            this.toastr.success('Has iniciado sesión correctamente');
            setTimeout(() => {
              this.router.navigate(['/alumnos']);
              this.store.dispatch(trueAuth());
            }, 1000);
          }
          else {
            this.toastr.error(response);
          }
          this.isLoading = false;
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

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
